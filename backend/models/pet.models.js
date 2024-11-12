const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  doner:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  status: { 
    type: String, 
    enum: ['Pending', 'approved', 'adopted'], 
    default: 'Pending' 
  },

},{timestamps: true})

module.exports = mongoose.model("Pet", petSchema)

