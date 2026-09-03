const express = require('express');
const router = express.Router();
const {
  getDashboardMetrics,
  getUsers,
  updateUserStatus,
  getProfessionals,
  verifyProfessional,
  getBookings,
  getDisputes,
  updateDispute,
  getAuditLogs,
  deleteReview,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getDashboardMetrics);
router.get('/users', getUsers);
router.patch('/users/:id/status', updateUserStatus);
router.get('/professionals', getProfessionals);
router.patch('/professionals/:id/verify', verifyProfessional);
router.get('/bookings', getBookings);
router.get('/disputes', getDisputes);
router.patch('/disputes/:id', updateDispute);
router.get('/audit-logs', getAuditLogs);
router.delete('/reviews/:id', deleteReview);

module.exports = router;
