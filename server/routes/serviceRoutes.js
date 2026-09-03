const express = require('express');
const router = express.Router();
const {
  getServices,
  getAllServicesAdmin,
  createService,
  updateService,
} = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getServices);
router.get('/admin', protect, authorize('admin'), getAllServicesAdmin);
router.post('/', protect, authorize('admin'), createService);
router.patch('/:id', protect, authorize('admin'), updateService);

module.exports = router;
