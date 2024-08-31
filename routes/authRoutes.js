const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const saltRounds = 10;

// Function to generate a random 10-digit alphanumeric code
function generateReferralCode() {
    return crypto.randomBytes(5).toString('hex').toUpperCase(); // 5 bytes = 10 hex characters
}

// Configure Nodemailer with Google's SMTP server
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'devjadiya0@gmail.com',
        pass: 'dgbc qduy jhvf fuii' // Use an App Password if you have 2FA enabled
    }
});

// Signup route
router.post('/signup', async (req, res) => {
    const { email, password, confirmPassword, phoneNumber, referralCode } = req.body;

    if (!email || !password || !confirmPassword || !phoneNumber) {
        return res.status(400).json({ message: 'All fields except referral code are required.' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    try {
        // Check if the user with the entered email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Determine the referral code to use
        let finalReferralCode = referralCode;

        if (!referralCode) {
            finalReferralCode = generateReferralCode();
            // Send the referral code to the user's email
            const mailOptions = {
                from: 'devjadiya0@gmail.com',
                to: email,
                subject: 'Your Referral Code',
                text: `Thank you for signing up! Your referral code is: ${finalReferralCode}`
            };
            await transporter.sendMail(mailOptions);
        }

        // Mark as new user if referral code is generated, or existing user if a referral code is provided
        const userType = referralCode ? 'existing' : 'new';

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            phoneNumber,
            referralCode: finalReferralCode,
            userType
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'Signup successful!', userType });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Signup failed: ' + error.message });
    }
});

module.exports = router;
