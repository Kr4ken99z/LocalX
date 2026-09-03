const Booking = require('../models/Booking');
const Professional = require('../models/Professional');
const { calculateTrustScore } = require('../utils/trustScore');

// @desc    Create a new service booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const {
      professionalId,
      serviceId,
      serviceName,
      scheduledDate,
      scheduledTime,
      address,
      price,
      notes,
    } = req.body;

    if (!professionalId || !scheduledDate || !scheduledTime || !address || !price) {
      return res.status(400).json({
        success: false,
        message: 'Please provide professionalId, scheduledDate, scheduledTime, address, and price',
      });
    }

    const pro = await Professional.findById(professionalId);
    if (!pro) {
      return res.status(404).json({ success: false, message: 'Professional not found' });
    }

    const booking = await Booking.create({
      customerId: req.user._id,
      professionalId,
      serviceId: serviceId || pro.services[0]?.serviceId || pro._id,
      serviceName: serviceName || pro.services[0]?.name || 'Home Maintenance Service',
      scheduledDate,
      scheduledTime,
      address: {
        addressLine: address.addressLine || address,
        city: address.city || pro.location.city || 'Bengaluru',
        landmark: address.landmark || '',
        pincode: address.pincode || '',
      },
      price,
      notes: notes || '',
      status: 'PENDING',
      statusHistory: [
        {
          status: 'PENDING',
          updatedBy: req.user._id,
          comment: 'Booking request created by customer',
          timestamp: new Date(),
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'Booking request placed successfully!',
      data: booking,
    });
  } catch (error) {
    console.error('createBooking error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings
exports.getBookings = async (req, res) => {
  try {
    const { status, role } = req.query;
    let query = {};

    if (req.user.role === 'customer') {
      query.customerId = req.user._id;
    } else if (req.user.role === 'professional') {
      const pro = await Professional.findOne({ userId: req.user._id });
      if (!pro) {
        return res.status(200).json({ success: true, count: 0, data: [] });
      }
      query.professionalId = pro._id;
    } else if (req.user.role === 'admin') {
      // Admin can see all or filter by query
      if (req.query.customerId) query.customerId = req.query.customerId;
      if (req.query.professionalId) query.professionalId = req.query.professionalId;
    }

    if (status && status !== 'ALL') {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('customerId', 'name email phone avatar')
      .populate({
        path: 'professionalId',
        populate: { path: 'userId', select: 'name email phone avatar' },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('getBookings error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customerId', 'name email phone avatar')
      .populate({
        path: 'professionalId',
        populate: { path: 'userId', select: 'name email phone avatar' },
      });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Security check: only customer, pro, or admin can view
    const isCustomer = booking.customerId._id.toString() === req.user._id.toString();
    const isPro = booking.professionalId?.userId?._id?.toString() === req.user._id.toString() ||
                  booking.professionalId?._id?.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isCustomer && !isPro && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this booking' });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update booking status lifecycle
// @route   PATCH /api/bookings/:id/status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status, comment } = req.body;
    const validStatuses = [
      'PENDING',
      'ACCEPTED',
      'REJECTED',
      'ON_THE_WAY',
      'IN_PROGRESS',
      'COMPLETED',
      'CANCELLED',
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid booking status' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    const pro = await Professional.findById(booking.professionalId);
    const isCustomer = booking.customerId.toString() === req.user._id.toString();
    const isPro = pro && pro.userId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isCustomer && !isPro && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this booking' });
    }

    // Workflow permissions:
    // Customer can only cancel
    if (isCustomer && !isPro && !isAdmin && status !== 'CANCELLED') {
      return res.status(403).json({
        success: false,
        message: 'Customers can only cancel a booking',
      });
    }

    booking.status = status;
    booking.statusHistory.push({
      status,
      updatedBy: req.user._id,
      comment: comment || `Status updated to ${status}`,
      timestamp: new Date(),
    });

    await booking.save();

    // If marked COMPLETED, increment pro completedJobs and recalculate Trust Score
    if (status === 'COMPLETED' && pro) {
      pro.completedJobs = (pro.completedJobs || 0) + 1;
      const trust = calculateTrustScore({
        verificationStatus: pro.verificationStatus,
        rating: pro.rating,
        completedJobs: pro.completedJobs,
        responseRate: pro.responseRate,
        cancellationRate: pro.cancellationRate,
      });
      pro.trustScore = trust.score;
      pro.trustTier = trust.tier;
      await pro.save();
    }

    // If cancelled by pro, update pro cancellation rate slightly
    if (status === 'REJECTED' && pro) {
      pro.cancellationRate = Math.min(100, (pro.cancellationRate || 0) + 1);
      const trust = calculateTrustScore({
        verificationStatus: pro.verificationStatus,
        rating: pro.rating,
        completedJobs: pro.completedJobs,
        responseRate: pro.responseRate,
        cancellationRate: pro.cancellationRate,
      });
      pro.trustScore = trust.score;
      pro.trustTier = trust.tier;
      await pro.save();
    }

    res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      data: booking,
    });
  } catch (error) {
    console.error('updateBookingStatus error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
