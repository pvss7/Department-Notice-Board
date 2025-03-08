const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  year: {
    type: String,
    required: function () {
      return this.get('role') === 'student'; // Fix for Mongoose field reference issue
    },
  },
  section: {
    type: String,
    required: function () {
      return this.get('role') === 'student';
    },
  },
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
    default: 'student',
  },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
