const express = require('express');
const { authenticate, allowRoles } = require('../middleware/authMiddleware');
const {
  createNotice,
  deleteNotice,
  getNotices,
} = require('../controllers/noticeController');
const { upload, uploadFile } = require('../controllers/uploadFile');
const { getNoticesByFaculty } = require('../controllers/noticeController');
const {getAllNotices} = require('../controllers/noticeController')


const router = express.Router();

// Faculty can view their own notices

// 📌 Log every request to this route
router.use((req, res, next) => {
  console.log(`📡 [${req.method}] Request to: ${req.originalUrl}`);
  console.log('🔹 Headers:', req.headers);
  console.log('🔹 Body:', req.body);
  next();
});

// 📌 Upload Notice File
router.post(
  '/upload',
  (req, res, next) => {
    console.log('📤 Upload Route Hit!');
    next();
  },
  upload.single('file'),
  uploadFile
);

// 📌 View Notices (Anyone) - Supports filtering by year & section
router.get(
  '/',
  (req, res, next) => {
    console.log('📜 Fetching Notices...');
    next();
  },
  authenticate,
  getNotices
);
router.get(
  '/my-notices',
  authenticate,
  allowRoles('faculty'),
  getNoticesByFaculty
);
// 📌 Add Notice (Admin & Faculty Only) - Supports file upload & sections
router.post(
  '/',
  (req, res, next) => {
    console.log('➕ Creating a new notice...');
    next();
  },
  authenticate,
  createNotice
);

// 📌 Delete Notice (Admin & Faculty Only)
router.delete(
  '/:id',
  (req, res, next) => {
    console.log(`❌ Deleting notice with ID: ${req.params.id}`);
    next();
  },
  authenticate,
  allowRoles('admin', 'faculty'),
  deleteNotice
);

// 📌 Fetch All Notices (For ViewNotices Screen)
router.get(
  '/all',
  (req, res, next) => {
    console.log('📜 Fetching All Notices...');
    next();
  },
  authenticate,
  getAllNotices
);

module.exports = router;