const Dispute = require('../models/Dispute');
const Booking = require('../models/Booking');

// @desc    File a dispute for a booking
// @route   POST /api/disputes
exports.createDispute = async (req, res) => {
  try {
    const { bookingId, reason, description, evidence } = req.body;

    if (!bookingId || !reason || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide bookingId, reason, and description',
      });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check if caller is the customer
    if (booking.customerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the customer of this booking can file a dispute',
      });
    }

    // Check if dispute already exists for this booking
    const existing = await Dispute.findOne({ bookingId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A dispute has already been filed for this booking',
      });
    }

    const dispute = await Dispute.create({
      bookingId,
      customerId: req.user._id,
      professionalId: booking.professionalId,
      reason,
      description,
      evidence: evidence || [],
      status: 'OPEN',
    });

    booking.hasDispute = true;
    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Dispute submitted. Admin team will review your case.',
      data: dispute,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get my disputes
// @route   GET /api/disputes/my
exports.getMyDisputes = async (req, res) => {
  try {
    const query = req.user.role === 'customer'
      ? { customerId: req.user._id }
      : { professionalId: req.user.professionalId };

    const disputes = await Dispute.find(query)
      .populate('bookingId')
      .populate('professionalId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: disputes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
