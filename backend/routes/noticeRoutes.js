const express = require('express');
const { authenticate, allowRoles } = require('../middleware/authMiddleware');
const {
  createNotice,
  deleteNotice,
  getNotices,
} = require('../controllers/noticeController');

const router = express.Router();

// View Notices (Anyone)
router.get('/', authenticate, getNotices);

// Add Notice (Admin & Faculty Only)
router.post('/', authenticate, allowRoles('admin', 'faculty'), createNotice);

// Delete Notice (Admin & Faculty Only)
router.delete(
  '/:id',
  authenticate,
  allowRoles('admin', 'faculty'),
  deleteNotice
);

module.exports = router;
