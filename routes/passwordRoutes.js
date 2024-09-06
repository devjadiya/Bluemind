const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ResetPassword = require('../model/resetPassword'); // Import the model

// POST: Request Password Reset
router.post('/request-reset-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Save email in ResetPassword model
        await ResetPassword.create({ email });

        // Send email to the user
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        const mailOptions = {
            from: 'devjadiya0@gmail.com',
            to: email,
            subject: 'Password Reset Request Received',
            text: 'Admin has got your response for resetting your password. Bluemind technician will connect soon!'
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Password reset request received and email sent' });
    } catch (error) {
        console.error('Error requesting password reset:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
