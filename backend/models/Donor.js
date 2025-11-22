const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  bloodGroup: { type: String, required: true },
  location: String,
  phone: String,
  message: String
}, { timestamps: true });

module.exports = mongoose.model('Donor', DonorSchema);
