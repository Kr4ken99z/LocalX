const Professional = require('../models/Professional');
const User = require('../models/User');
const Review = require('../models/Review');
const { calculateTrustScore } = require('../utils/trustScore');

// @desc    Get all professionals with filters & sorting
// @route   GET /api/professionals
exports.getProfessionals = async (req, res) => {
  try {
    const {
      service,
      city,
      rating,
      verifiedOnly,
      search,
      sort,
      maxPrice,
    } = req.query;

    const query = {};

    if (verifiedOnly === 'true') {
      query.verificationStatus = 'VERIFIED';
    }

    if (city && city !== 'all') {
      query['location.city'] = new RegExp(city, 'i');
    }

    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    if (service && service !== 'all') {
      query.$or = [
        { skills: new RegExp(service, 'i') },
        { 'services.slug': new RegExp(service, 'i') },
        { 'services.name': new RegExp(service, 'i') },
      ];
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { businessName: searchRegex },
        { description: searchRegex },
        { skills: searchRegex },
        { 'services.name': searchRegex },
      ];
    }

    let sortOption = { trustScore: -1, rating: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };
    if (sort === 'experience') sortOption = { experienceYears: -1 };
    if (sort === 'reviews') sortOption = { totalReviews: -1 };

    let pros = await Professional.find(query)
      .populate('userId', 'name email avatar phone')
      .sort(sortOption);

    // If maxPrice is specified, filter pros who have at least one service <= maxPrice
    if (maxPrice) {
      pros = pros.filter((p) =>
        p.services.length === 0 ||
        p.services.some((s) => s.price <= Number(maxPrice))
      );
    }

    res.status(200).json({
      success: true,
      count: pros.length,
      data: pros,
    });
  } catch (error) {
    console.error('getProfessionals error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Geospatial discovery: Find nearby professionals
// @route   GET /api/professionals/nearby
exports.getNearbyProfessionals = async (req, res) => {
  try {
    const { lat, lng, radius = 15, service, verifiedOnly } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude coordinates are required for nearby discovery',
      });
    }

    const longitude = parseFloat(lng);
    const latitude = parseFloat(lat);
    const radiusInKm = parseFloat(radius);
    const radiusInMeters = radiusInKm * 1000;

    const query = {
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: radiusInMeters,
        },
      },
    };

    if (verifiedOnly === 'true') {
      query.verificationStatus = 'VERIFIED';
    }

    if (service && service !== 'all') {
      query.$or = [
        { skills: new RegExp(service, 'i') },
        { 'services.slug': new RegExp(service, 'i') },
        { 'services.name': new RegExp(service, 'i') },
      ];
    }

    let pros = [];
    try {
      pros = await Professional.find(query).populate('userId', 'name email avatar phone');
    } catch (geoError) {
      // Fallback in case 2dsphere index is still indexing: calculate haversine manually
      const allPros = await Professional.find().populate('userId', 'name email avatar phone');
      pros = allPros.filter((p) => {
        if (!p.location || !p.location.coordinates) return false;
        const [pLng, pLat] = p.location.coordinates;
        // Haversine
        const R = 6371; // km
        const dLat = ((pLat - latitude) * Math.PI) / 180;
        const dLon = ((pLng - longitude) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((latitude * Math.PI) / 180) *
            Math.cos((pLat * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        p._doc.distance = Math.round(d * 10) / 10;
        return d <= radiusInKm;
      });
    }

    res.status(200).json({
      success: true,
      count: pros.length,
      data: pros,
    });
  } catch (error) {
    console.error('getNearbyProfessionals error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single professional by ID
// @route   GET /api/professionals/:id
exports.getProfessionalById = async (req, res) => {
  try {
    const pro = await Professional.findById(req.params.id)
      .populate('userId', 'name email avatar phone')
      .populate('services.serviceId');

    if (!pro) {
      return res.status(404).json({ success: false, message: 'Professional not found' });
    }

    const reviews = await Review.find({ professionalId: pro._id })
      .populate('customerId', 'name avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        ...pro.toObject(),
        reviews,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create or update current logged in professional profile
// @route   PATCH /api/professionals/me
exports.updateMyProfile = async (req, res) => {
  try {
    let pro = await Professional.findOne({ userId: req.user._id });

    if (!pro) {
      pro = new Professional({ userId: req.user._id });
    }

    const fields = [
      'businessName',
      'tagline',
      'description',
      'experienceYears',
      'skills',
      'services',
      'serviceRadius',
      'availability',
      'portfolio',
    ];

    fields.forEach((f) => {
      if (req.body[f] !== undefined) pro[f] = req.body[f];
    });

    if (req.body.location) {
      pro.location = {
        type: 'Point',
        coordinates: req.body.location.coordinates || pro.location.coordinates,
        city: req.body.location.city || pro.location.city,
        address: req.body.location.address || pro.location.address,
      };
    }

    // Recalculate Trust Score
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

    res.status(200).json({
      success: true,
      data: pro,
    });
  } catch (error) {
    console.error('updateMyProfile error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Upload verification document
// @route   POST /api/professionals/:id/verification
exports.uploadVerification = async (req, res) => {
  try {
    const pro = await Professional.findOne({ userId: req.user._id });
    if (!pro) {
      return res.status(404).json({ success: false, message: 'Professional profile not found' });
    }

    const { docType, title, fileUrl } = req.body;
    let url = fileUrl;

    if (req.file) {
      url = `/uploads/${req.file.filename}`;
    }

    pro.documents.push({
      docType: docType || 'gov_id',
      title: title || 'Identity Document',
      fileUrl: url || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80',
      uploadedAt: new Date(),
    });

    pro.verificationStatus = 'PENDING';
    await pro.save();

    res.status(200).json({
      success: true,
      message: 'Document submitted for verification successfully. Admin will review shortly.',
      data: pro,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
