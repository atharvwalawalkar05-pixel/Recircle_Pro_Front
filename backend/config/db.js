
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      console.error("FATAL ERROR: MONGO_URI environment variable is not set.");
      process.exit(1);
    }

    console.log("Attempting to connect to MongoDB...");
    
    // MongoDB connection options (removed deprecated options)
    const mongoOptions = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };
    
    await mongoose.connect(MONGO_URI, mongoOptions);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("DATABASE CONNECTION FAILED:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
