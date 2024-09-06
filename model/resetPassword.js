const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    resetToken: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // Token expires after 1 hour
    }
});

module.exports = mongoose.model('ResetPassword', resetPasswordSchema);
