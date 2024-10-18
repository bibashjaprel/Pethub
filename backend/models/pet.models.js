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
  imageurl: {
    type: String
  },
  ownerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner'
  }

},{timestamps: true})

// export const Pet = mongoose.model("Pet", petSchem);
module.exports = mongoose.model("Pet", petSchema)

