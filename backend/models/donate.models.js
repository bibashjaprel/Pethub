const mongoose = require('mongoose');

const donateSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // Index to improve query performance
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  message: {
    type: String
    // required: true,
  },
}, { timestamps: true });

donateSchema.index({ donor: 1, pet: 1 }, { unique: true });

module.exports = mongoose.model('DonateRequest', donateSchema);
