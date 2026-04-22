const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// IMPORTANT
app.use(cors());
app.use(express.json());

// Routes
const patientRoutes = require("./routes/patientRoutes");
app.use("/api/patients", patientRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});