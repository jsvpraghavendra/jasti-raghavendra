const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 1. REGISTRATION ENDPOINT
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "An account with this email already exists." });
        }

        const newUser = new User({ name, email, password, phone });
        await newUser.save();
        
        res.status(201).json({ message: "Registration successful!", userId: newUser._id });
    } catch (err) {
        res.status(500).json({ message: "Server validation failed: " + err.message });
    }
});

// 2. LOGIN ENDPOINT
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        res.json({ message: "Login successful!", userId: user._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;