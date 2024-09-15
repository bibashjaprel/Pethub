const mongoose = require('mongoose')

const adoptionSchema = new mongoose.Schema({
  requestid: {
    type: String,
    unique: true
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  petid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet'
  },
  requestdate: date,
  status: String
},{timestamps: true})

// export const Adoption = mongoose.model("Adoption", adoptionSchema);
module.exports = mongoose.model("User", userSchema)

