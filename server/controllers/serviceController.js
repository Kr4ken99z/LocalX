const Service = require('../models/Service');
const AdminAuditLog = require('../models/AdminAuditLog');

// @desc    Get all active service categories
// @route   GET /api/services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ popular: -1, name: 1 });
    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all services including inactive (admin)
// @route   GET /api/services/admin
exports.getAllServicesAdmin = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new service category (admin)
// @route   POST /api/services
exports.createService = async (req, res) => {
  try {
    const { name, slug, description, icon, basePrice, popular } = req.body;

    const service = await Service.create({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description,
      icon: icon || '⚡',
      basePrice: basePrice || 299,
      popular: !!popular,
      isActive: true,
    });

    if (req.user) {
      await AdminAuditLog.create({
        adminId: req.user._id,
        adminEmail: req.user.email,
        action: 'CREATE_CATEGORY',
        targetType: 'Service',
        targetId: service._id.toString(),
        metadata: { name: service.name, slug: service.slug },
      });
    }

    res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update service category (admin)
// @route   PATCH /api/services/:id
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    if (req.user) {
      await AdminAuditLog.create({
        adminId: req.user._id,
        adminEmail: req.user.email,
        action: 'UPDATE_CATEGORY',
        targetType: 'Service',
        targetId: service._id.toString(),
        metadata: req.body,
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
