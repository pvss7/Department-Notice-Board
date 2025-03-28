const express = require('express');
const { authenticate, allowRoles } = require('../middleware/authMiddleware');
const {
  createComplaint,
  getComplaints,
  resolveComplaint,
  getFacultyComplaints,
  getComplaintById, // Import new function
} = require('../controllers/complaintController');

const router = express.Router();

// Students can add complaints
router.post('/', authenticate, allowRoles('student'), createComplaint);

// Admin & Faculty can resolve complaints
router.put(
  '/:id/resolve',
  authenticate,
  allowRoles('admin', 'faculty'),
  resolveComplaint
);

// Admin can view all complaints, Faculty sees only assigned complaints, Students see their own complaints
router.get('/', authenticate, getComplaints);

// Faculty can view complaints assigned to them
router.get(
  '/faculty',
  authenticate,
  allowRoles('faculty'),
  getFacultyComplaints
);

// 📌 Route to get a specific complaint by ID
router.get('/:id', authenticate, getComplaintById);

module.exports = router;
