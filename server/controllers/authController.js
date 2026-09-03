const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Professional = require('../models/Professional');
const { calculateTrustScore } = require('../utils/trustScore');

// Helper to sign JWT
const sendTokenResponse = (user, proProfile, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'localx_super_secret_jwt_key_2026_hyperlocal',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      status: user.status,
      location: user.location,
      savedAddresses: user.savedAddresses,
    },
    professionalProfile: proProfile || null,
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role, businessName, serviceCategory, city, address } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    const assignedRole = ['customer', 'professional', 'admin'].includes(role) ? role : 'customer';

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone: phone || '',
      role: assignedRole,
      location: {
        city: city || 'Bengaluru',
        area: address || 'Indiranagar',
        coordinates: [77.6412, 12.9784],
      },
    });

    let proProfile = null;
    if (assignedRole === 'professional') {
      const trust = calculateTrustScore({ verificationStatus: 'PENDING', rating: 5, completedJobs: 0 });
      proProfile = await Professional.create({
        userId: user._id,
        businessName: businessName || name + ' Services',
        tagline: 'Verified local service specialist',
        description: 'Providing reliable, high-quality home and commercial repair services.',
        experienceYears: 2,
        skills: serviceCategory ? [serviceCategory] : ['General Maintenance'],
        location: {
          type: 'Point',
          coordinates: [77.6412, 12.9784],
          city: city || 'Bengaluru',
          address: address || 'Indiranagar, Bengaluru',
        },
        serviceRadius: 15,
        verificationStatus: 'PENDING',
        rating: 5.0,
        totalReviews: 0,
        completedJobs: 0,
        trustScore: trust.score,
        trustTier: trust.tier,
      });
    }

    sendTokenResponse(user, proProfile, 201, res);
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ success: false, message: 'Your account has been suspended by administration.' });
    }

    let proProfile = null;
    if (user.role === 'professional') {
      proProfile = await Professional.findOne({ userId: user._id });
    }

    sendTokenResponse(user, proProfile, 200, res);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let proProfile = null;
    if (user.role === 'professional') {
      proProfile = await Professional.findOne({ userId: user._id });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        status: user.status,
        location: user.location,
        savedAddresses: user.savedAddresses,
      },
      professionalProfile: proProfile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update current user profile
// @route   PATCH /api/auth/profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, avatar, location, savedAddresses } = req.body;
    const updateFields = {};
    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;
    if (avatar) updateFields.avatar = avatar;
    if (location) updateFields.location = location;
    if (savedAddresses) updateFields.savedAddresses = savedAddresses;

    const user = await User.findByIdAndUpdate(req.user.id, updateFields, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
exports.logout = async (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};
