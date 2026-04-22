const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔥 Middlewares
app.use(cors());
app.use(express.json());

// 🔥 Routes import
const patientRoutes = require("./routes/patientRoutes");
const authRoutes = require("./routes/authRoutes"); // 👈 ADD THIS

// 🔥 Routes use
app.use("/api/patients", patientRoutes);
app.use("/api/auth", authRoutes); // 👈 ADD THIS

// 🔥 MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 🔥 Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// 🔥 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));