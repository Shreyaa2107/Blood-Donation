const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  requesterName: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  hospital: String,
  contact: String,
  urgency: { type: String, enum: ['low','medium','high'], default: 'medium' },
  notes: String,
  fulfilled: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema);
