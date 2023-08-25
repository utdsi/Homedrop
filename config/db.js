const mongoose = require("mongoose")

require('dotenv').config()

mongoose.connect(process.env.mongoUrl)

const db = mongoose.connection;

db.on('error', err => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

module.exports = {db}