const Review = require('../models/Review');
const Booking = require('../models/Booking');
const Professional = require('../models/Professional');
const { calculateTrustScore } = require('../utils/trustScore');

// @desc    Get reviews for a professional
// @route   GET /api/professionals/:id/reviews
exports.getProfessionalReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ professionalId: req.params.id })
      .populate('customerId', 'name avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a review for a completed booking
// @route   POST /api/reviews
exports.createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    if (!bookingId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide bookingId, rating, and comment',
      });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Verify booking is COMPLETED
    if (booking.status !== 'COMPLETED') {
      return res.status(400).json({
        success: false,
        message: 'Reviews can only be submitted for completed bookings',
      });
    }

    // Verify caller is the customer of the booking
    if (booking.customerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the customer who booked this service can submit a review',
      });
    }

    // Verify 1 review per booking
    const existingReview = await Review.findOne({ bookingId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'A review has already been submitted for this booking',
      });
    }

    const review = await Review.create({
      customerId: req.user._id,
      professionalId: booking.professionalId,
      bookingId: booking._id,
      rating: Number(rating),
      comment,
      serviceName: booking.serviceName,
    });

    // Mark booking as reviewed
    booking.hasReview = true;
    await booking.save();

    // Recalculate Professional's average rating, totalReviews, and Trust Score
    const pro = await Professional.findById(booking.professionalId);
    if (pro) {
      const allReviews = await Review.find({ professionalId: pro._id });
      const totalReviews = allReviews.length;
      const sumRatings = allReviews.reduce((acc, r) => acc + r.rating, 0);
      const avgRating = Math.round((sumRatings / totalReviews) * 10) / 10;

      pro.rating = avgRating;
      pro.totalReviews = totalReviews;

      const trust = calculateTrustScore({
        verificationStatus: pro.verificationStatus,
        rating: avgRating,
        completedJobs: pro.completedJobs,
        responseRate: pro.responseRate,
        cancellationRate: pro.cancellationRate,
      });

      pro.trustScore = trust.score;
      pro.trustTier = trust.tier;
      await pro.save();
    }

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully! Thank you for rating.',
      data: review,
    });
  } catch (error) {
    console.error('createReview error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
