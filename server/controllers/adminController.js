const User = require('../models/User');
const Professional = require('../models/Professional');
const Booking = require('../models/Booking');
const Dispute = require('../models/Dispute');
const Review = require('../models/Review');
const Service = require('../models/Service');
const AdminAuditLog = require('../models/AdminAuditLog');
const { calculateTrustScore } = require('../utils/trustScore');

// Helper to log admin actions
const logAdminAction = async (adminId, adminEmail, action, targetType, targetId, metadata) => {
  try {
    await AdminAuditLog.create({
      adminId,
      adminEmail,
      action,
      targetType,
      targetId,
      metadata,
    });
  } catch (e) {
    console.error('Failed to write admin audit log:', e.message);
  }
};

// @desc    Get system dashboard metrics
// @route   GET /api/admin/dashboard
exports.getDashboardMetrics = async (req, res) => {
  try {
    const [
      totalCustomers,
      totalPros,
      verifiedPros,
      pendingVerifications,
      totalBookings,
      completedBookings,
      openDisputes,
      recentAuditLogs,
    ] = await Promise.all([
      User.countDocuments({ role: 'customer' }),
      Professional.countDocuments(),
      Professional.countDocuments({ verificationStatus: 'VERIFIED' }),
      Professional.countDocuments({ verificationStatus: 'PENDING' }),
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'COMPLETED' }),
      Dispute.countDocuments({ status: { $in: ['OPEN', 'UNDER_REVIEW'] } }),
      AdminAuditLog.find().sort({ createdAt: -1 }).limit(8),
    ]);

    // Calculate approximate platform volume / GMV
    const completedBookingDocs = await Booking.find({ status: 'COMPLETED' }).select('price');
    const totalGMV = completedBookingDocs.reduce((acc, b) => acc + (b.price || 0), 0);

    res.status(200).json({
      success: true,
      data: {
        totalCustomers,
        totalPros,
        verifiedPros,
        pendingVerifications,
        totalBookings,
        completedBookings,
        openDisputes,
        totalGMV,
        recentAuditLogs,
      },
    });
  } catch (error) {
    console.error('getDashboardMetrics error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users (customers and professionals)
// @route   GET /api/admin/users
exports.getUsers = async (req, res) => {
  try {
    const { role, search, status } = req.query;
    const query = {};

    if (role && role !== 'ALL') query.role = role;
    if (status && status !== 'ALL') query.status = status;
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { phone: new RegExp(search, 'i') },
      ];
    }

    const users = await User.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle user status (Active / Suspended)
// @route   PATCH /api/admin/users/:id/status
exports.updateUserStatus = async (req, res) => {
  try {
    const { status, reason } = req.body;
    if (!['active', 'suspended'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.status = status;
    await user.save();

    await logAdminAction(
      req.user._id,
      req.user.email,
      status === 'suspended' ? 'SUSPEND_USER' : 'REACTIVATE_USER',
      'User',
      user._id.toString(),
      { reason, previousStatus: user.status }
    );

    res.status(200).json({
      success: true,
      message: `User status changed to ${status}`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all professionals for admin management & verification queue
// @route   GET /api/admin/professionals
exports.getProfessionals = async (req, res) => {
  try {
    const { verificationStatus, search } = req.query;
    const query = {};

    if (verificationStatus && verificationStatus !== 'ALL') {
      query.verificationStatus = verificationStatus;
    }

    if (search) {
      query.$or = [
        { businessName: new RegExp(search, 'i') },
        { skills: new RegExp(search, 'i') },
      ];
    }

    const pros = await Professional.find(query)
      .populate('userId', 'name email phone avatar status')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pros.length,
      data: pros,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify or suspend professional
// @route   PATCH /api/admin/professionals/:id/verify
exports.verifyProfessional = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const allowed = ['VERIFIED', 'REJECTED', 'SUSPENDED', 'PENDING'];

    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid verification status' });
    }

    const pro = await Professional.findById(req.params.id).populate('userId', 'email name');
    if (!pro) {
      return res.status(404).json({ success: false, message: 'Professional not found' });
    }

    const prevStatus = pro.verificationStatus;
    pro.verificationStatus = status;
    pro.verificationRemarks = remarks || '';

    // Recompute Trust Score
    const trust = calculateTrustScore({
      verificationStatus: status,
      rating: pro.rating,
      completedJobs: pro.completedJobs,
      responseRate: pro.responseRate,
      cancellationRate: pro.cancellationRate,
    });
    pro.trustScore = trust.score;
    pro.trustTier = trust.tier;

    await pro.save();

    let actionName = 'APPROVE_PROFESSIONAL';
    if (status === 'REJECTED') actionName = 'REJECT_PROFESSIONAL';
    if (status === 'SUSPENDED') actionName = 'SUSPEND_PROFESSIONAL';

    await logAdminAction(
      req.user._id,
      req.user.email,
      actionName,
      'Professional',
      pro._id.toString(),
      { remarks, previousStatus: prevStatus, newStatus: status, businessName: pro.businessName }
    );

    res.status(200).json({
      success: true,
      message: `Professional verification status updated to ${status}`,
      data: pro,
    });
  } catch (error) {
    console.error('verifyProfessional error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all bookings for admin
// @route   GET /api/admin/bookings
exports.getBookings = async (req, res) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status && status !== 'ALL') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { bookingNumber: new RegExp(search, 'i') },
        { serviceName: new RegExp(search, 'i') },
      ];
    }

    const bookings = await Booking.find(query)
      .populate('customerId', 'name email phone')
      .populate({
        path: 'professionalId',
        populate: { path: 'userId', select: 'name email phone' },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all disputes
// @route   GET /api/admin/disputes
exports.getDisputes = async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status && status !== 'ALL') query.status = status;

    const disputes = await Dispute.find(query)
      .populate('customerId', 'name email phone avatar')
      .populate({
        path: 'professionalId',
        populate: { path: 'userId', select: 'name email phone' },
      })
      .populate('bookingId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: disputes.length,
      data: disputes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update dispute status & resolution
// @route   PATCH /api/admin/disputes/:id
exports.updateDispute = async (req, res) => {
  try {
    const { status, actionTaken, notes } = req.body;
    const allowed = ['OPEN', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED'];

    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid dispute status' });
    }

    const dispute = await Dispute.findById(req.params.id);
    if (!dispute) {
      return res.status(404).json({ success: false, message: 'Dispute not found' });
    }

    dispute.status = status;
    if (status === 'RESOLVED' || status === 'REJECTED') {
      dispute.resolution = {
        adminId: req.user._id,
        actionTaken: actionTaken || 'Resolution finalized by admin',
        notes: notes || '',
        resolvedAt: new Date(),
      };
    }

    await dispute.save();

    await logAdminAction(
      req.user._id,
      req.user.email,
      status === 'RESOLVED' ? 'RESOLVE_DISPUTE' : 'REJECT_DISPUTE',
      'Dispute',
      dispute._id.toString(),
      { disputeNumber: dispute.disputeNumber, actionTaken, notes, status }
    );

    res.status(200).json({
      success: true,
      message: `Dispute updated to ${status}`,
      data: dispute,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get admin audit logs
// @route   GET /api/admin/audit-logs
exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await AdminAuditLog.find()
      .populate('adminId', 'name email')
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Moderate review (remove policy-violating review)
// @route   DELETE /api/admin/reviews/:id
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    const proId = review.professionalId;
    await Review.findByIdAndDelete(req.params.id);

    // Recompute Pro rating
    const pro = await Professional.findById(proId);
    if (pro) {
      const allReviews = await Review.find({ professionalId: pro._id });
      const totalReviews = allReviews.length;
      const sumRatings = allReviews.reduce((acc, r) => acc + r.rating, 0);
      pro.rating = totalReviews > 0 ? Math.round((sumRatings / totalReviews) * 10) / 10 : 5.0;
      pro.totalReviews = totalReviews;

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

    await logAdminAction(
      req.user._id,
      req.user.email,
      'DELETE_REVIEW',
      'Review',
      req.params.id,
      { comment: review.comment, rating: review.rating }
    );

    res.status(200).json({
      success: true,
      message: 'Review removed by administrator',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
