const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  year: { type: String, required: true }, // Added year field
  section: { type: String, required: true }, // Made section required
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
    default: 'student',
  },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
