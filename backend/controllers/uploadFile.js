const cloudinary = require('../config/cloudinaryConfig');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Set up Multer storage to directly upload to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'notices', // Folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'pdf', 'docx'],
  },
});

const upload = multer({ storage: storage });

const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    return res.json({ fileUrl: req.file.path }); // Cloudinary file URL
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { upload, uploadFile };
