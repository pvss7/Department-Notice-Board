const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
  resolutionMessage: { type: String, default: '' }, // Added field
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
