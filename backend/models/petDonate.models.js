const mongoose = require('mongoose');

const petDonateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String, required: true },
  species: { type: String, required: true },
  image: { type: String },  
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('PetDonate', petDonateSchema);
