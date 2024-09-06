const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const User = require('./model/user'); // Replace with your User model
const ResetPassword = require('../model/resetPassword'); // Reset password model

// POST: Request Password Reset
router.post('/request-reset-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No user with that email' });
        }

        // Create reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const tokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

        // Save token in ResetPassword model
        await ResetPassword.create({
            email,
            resetToken,
            expiresAt: tokenExpiration
        });

        // Send email with reset link
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        const resetLink = `https://your-frontend-url.com/reset-password?token=${resetToken}&email=${email}`;
        const mailOptions = {
            from: 'devjadiya0@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please click the following link to reset your password: ${resetLink}`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error('Error requesting password reset:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// POST: Handle Reset Token and Update Password
router.post('/reset-password', async (req, res) => {
    const { token, email, newPassword } = req.body;

    if (!token || !email || !newPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Find the reset token in the database
        const resetRecord = await ResetPassword.findOne({ email, resetToken: token });

        if (!resetRecord) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Check if token is expired
        if (resetRecord.expiresAt < Date.now()) {
            return res.status(400).json({ message: 'Reset token has expired' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        await User.findOneAndUpdate({ email }, { password: hashedPassword });

        // Delete the reset token from the database
        await ResetPassword.deleteOne({ email });

        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
