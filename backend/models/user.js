const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  section: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
    default: 'student',
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
