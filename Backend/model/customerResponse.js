const mongoose = require('mongoose');

const customerResponseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    contact: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15
    },
    message: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('CustomerResponse', customerResponseSchema);

