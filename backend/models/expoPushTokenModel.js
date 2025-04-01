const mongoose = require('mongoose');

const expoPushTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expoPushToken: {
    type: String,
    required: true,
  },
  year: { type: String, required: false },
  section: { type: String, required: false },
});

// Make the userId unique - one token per user
expoPushTokenSchema.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model('ExpoPushToken', expoPushTokenSchema);
