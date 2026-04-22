const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");


// ✅ GET all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch patients" });
  }
});


// ✅ POST add new patient
router.post("/", async (req, res) => {
  try {
    const newPatient = new Patient({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      age: Number(req.body.age),
      gender: req.body.gender,
      disease: req.body.disease,
      doctorAssigned: req.body.doctorAssigned,
      cured: false   // default
    });

    await newPatient.save();
    res.json(newPatient);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add patient" });
  }
});


// ✅ DELETE patient
router.delete("/:id", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete patient" });
  }
});


// ✅ UPDATE (toggle cured status)
router.put("/:id", async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { cured: req.body.cured },
      { new: true }
    );

    res.json(updatedPatient);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update status" });
  }
});


module.exports = router;