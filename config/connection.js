const mongoose = require('mongoose');
require('dotenv').config();

// Wrap Mongoose around local connection to MongoDB
mongoose.connect(process.env.MONGODB_URL);

// Export connection 
module.exports = mongoose.connection;