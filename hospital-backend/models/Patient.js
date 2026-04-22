const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  age: Number,
  gender: String,
  disease: String,
  doctorAssigned: String,
  cured: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Patient", patientSchema);