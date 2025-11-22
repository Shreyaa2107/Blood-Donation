const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }, // bcrypt hash
  role: { type: String, default: 'admin' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
