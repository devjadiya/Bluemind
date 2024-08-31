const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Signup route
router.post('/signup', async (req, res) => {
    const { email, password, phoneNumber, referralCode } = req.body;

    if (!email || !password || !phoneNumber) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            phoneNumber,
            referralCode
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'Signup successful!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Signup failed: ' + error.message });
    }
});

module.exports = router;
