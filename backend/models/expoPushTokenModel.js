const mongoose = require('mongoose');

const expoPushTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  expoPushToken: { type: String, required: true },
  year: { type: String, required: false }, // Add year field
  section: { type: String, required: false } // Add section field
});

module.exports = mongoose.model('ExpoPushToken', expoPushTokenSchema);
