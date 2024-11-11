const mongoose = require('mongoose');

const AdoptionRequestApplication = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  petId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet', 
    required: true 
  },
  name: { 
    type: String,
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('AdoptionRequestApplication', AdoptionRequestApplication);
