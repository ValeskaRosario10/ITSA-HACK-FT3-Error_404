const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;  // Use a strong secret key in production

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Please provide username, email, and password' });
    }

    try {
        // Create a new user and save to DB
        const user = new User({ username, email, password });
        await user.save();

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        if (error.code === 11000) {  // Check for duplicate email
            return res.status(400).json({ message: 'Email already exists' });
        }
        res.status(500).json({ message: 'Error creating user' });
    }
});

// Login route using email and password
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        // Find the user by email in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the password
        const isMatch = await user.comparePassword(password);  // Assuming comparePassword is defined in userModel
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid Token' });
    }
};

// Protected route example
router.get('/protected', authenticateJWT, (req, res) => {
    res.status(200).json({ message: `Welcome ${req.user.username}, you are authenticated!` });
});

module.exports = router;
