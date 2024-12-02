const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ResetPassword', resetPasswordSchema);
