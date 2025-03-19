const express = require('express');
const { getUserByUID, getFacultyUsers, grantNoticePermission, revokeNoticePermission, checkNoticePermission, getStudentUsers } = require('../controllers/userController');
const { authenticate, allowRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/user/:uid', getUserByUID);
router.get('/faculty', getFacultyUsers);

// Permission control endpoints
router.post('/grant-notice-permission/:studentId', authenticate, allowRoles('admin'), grantNoticePermission);
router.post('/revoke-notice-permission/:studentId', authenticate, allowRoles('admin'), revokeNoticePermission);
router.get('/check-notice-permission/:studentId', authenticate, checkNoticePermission);
router.get('/students', authenticate, getStudentUsers);

module.exports = router;
