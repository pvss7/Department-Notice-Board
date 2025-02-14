const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: {
    type: String,
    enum: ['Section-Specific', 'General', 'Event'],
    required: true,
  },
  year: { type: String }, // For class-specific notices
  sections: [{ type: String }], // Array for multiple sections
  fileUrl: { type: String }, // URL for uploaded files
  author: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notice', NoticeSchema);
