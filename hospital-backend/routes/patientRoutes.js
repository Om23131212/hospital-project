import express from "express";
import Patient from "../models/Patient.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// 🔥 GET
router.get("/", auth, async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

// 🔥 ADD
router.post("/", auth, async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.json(patient);
});

// 🔥 DELETE
router.delete("/:id", auth, async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// 🔥 UPDATE
router.put("/:id", auth, async (req, res) => {
  await Patient.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
});

export default router;