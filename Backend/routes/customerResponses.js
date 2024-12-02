const express = require('express');
const router = express.Router();
const CustomerResponse = require('../model/customerResponse');

router.post('/customer-responses', async (req, res) => {
    const { name, email, contact, message } = req.body;

    if (!name || !email || !contact || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newResponse = new CustomerResponse({
            name,
            email,
            contact,
            message
        });

        await newResponse.save();
        return res.status(200).json({ message: 'Response saved successfully' });
    } catch (error) {
        console.error('Error saving response:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
