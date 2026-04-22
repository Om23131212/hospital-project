const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 ADD THIS
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// your existing routes
const patientRoutes = require("./routes/patientRoutes");
app.use("/api/patients", patientRoutes);

// optional root
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));