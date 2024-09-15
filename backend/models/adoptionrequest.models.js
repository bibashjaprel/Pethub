import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
  requestid: {
    type: String,
    unique: true
  },
  userid: {
    type: String,
  },
  petid: {
    type: String,
  },
  requestdate: date,
  status: String
},{timestamps: true})

export const Adoption = mongoose.model("Adoption", adoptionSchema);
