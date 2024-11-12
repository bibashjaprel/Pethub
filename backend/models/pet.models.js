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
  status: { 
    type: String, 
    enum: ['Pending', 'available'], 
    default: 'Pending' 
  },

},{timestamps: true})

// export const Pet = mongoose.model("Pet", petSchem);
module.exports = mongoose.model("Pet", petSchema)

