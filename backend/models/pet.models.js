import mongoose, { mongo } from "mongoose";

const petSchem = new mongoose.Schema({
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
  ownerid: {
    type: String,
    unique: true
  }

},{timestamps: true})

export const Pet = mongoose.model("Pet", petSchem); 
