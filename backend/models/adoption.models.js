const mongoose = require('mongoose');

const adoptionRequestSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  pet: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Pet', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'], 
    default: 'Pending' 
  },
  message: { 
    type: String 
  }
}, { timestamps: true });

module.exports = mongoose.model('AdoptionRequest', adoptionRequestSchema);
