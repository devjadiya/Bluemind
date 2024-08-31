const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    referralCode: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
