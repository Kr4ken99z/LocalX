const express = require('express');
const router = express.Router();
const { createDispute, getMyDisputes } = require('../controllers/disputeController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/', createDispute);
router.get('/my', getMyDisputes);

module.exports = router;
