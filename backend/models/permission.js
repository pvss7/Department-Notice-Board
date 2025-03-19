const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  canAddNotices: { type: Boolean, default: false }, // Default: No student has permission initially
});

module.exports = mongoose.model('Permission', PermissionSchema);
