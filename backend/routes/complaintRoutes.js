const express = require('express');
const { authenticate, allowRoles } = require('../middleware/authMiddleware');
const {
  createComplaint,
  getComplaints,
  resolveComplaint,
} = require('../controllers/complaintController');

const router = express.Router();

// Students can add complaints
router.post(
  '/',
  authenticate,
  allowRoles('student', 'faculty', 'admin'),
  createComplaint
);

// Admin & Faculty can resolve complaints
router.put(
  '/:id/resolve',
  authenticate,
  allowRoles('admin', 'faculty'),
  resolveComplaint
);

// Everyone can view complaints
router.get('/', authenticate, getComplaints);

module.exports = router;
