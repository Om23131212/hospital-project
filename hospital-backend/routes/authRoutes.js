const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// 🔥 LOGIN ROUTE
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // demo login (simple)
  if (email === "admin@gmail.com" && password === "1234") {
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;