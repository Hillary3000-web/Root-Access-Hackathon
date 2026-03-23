const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Mock user store
const users = [];

// Register
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now(), fullName, email, password: hashedPassword };
    users.push(user);

    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "Registration successful",
      token,
      user: { id: user.id, fullName, email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user.id, fullName: user.fullName, email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
