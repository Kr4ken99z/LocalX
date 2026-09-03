const express = require('express');
const router = express.Router();
const {
  getProfessionals,
  getNearbyProfessionals,
  getProfessionalById,
  updateMyProfile,
  uploadVerification,
} = require('../controllers/professionalController');
const { getProfessionalReviews } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getProfessionals);
router.get('/nearby', getNearbyProfessionals);
router.patch('/me', protect, authorize('professional'), updateMyProfile);
router.get('/:id', getProfessionalById);
router.get('/:id/reviews', getProfessionalReviews);
router.post(
  '/:id/verification',
  protect,
  authorize('professional'),
  upload.single('document'),
  uploadVerification
);

module.exports = router;
