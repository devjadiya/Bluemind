const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const customerResponsesRoutes = require('./routes/customerResponses'); // Import the customer responses route
const resetPassword = require('./routes/passwordRoutes'); // Import the reset password route
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.mongoconnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api', authRoutes);
app.use('/api', customerResponsesRoutes); // Add the customer responses route
app.use('/api', resetPassword); // Add the reset password route

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
