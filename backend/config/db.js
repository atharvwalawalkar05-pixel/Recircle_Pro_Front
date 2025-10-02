
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      console.error("FATAL ERROR: MONGO_URI environment variable is not set. On Render set the MONGO_URI env var to your MongoDB Atlas connection string.");
      process.exit(1);
    }

    // If MONGO_URI looks like a localhost address, block it when running on hosted/CI environments
    const localhostPatterns = [/localhost/i, /127\.0\.0\.1/, /::1/];
    const looksLikeLocal = localhostPatterns.some((p) => p.test(MONGO_URI));

    const runningOnHosted = (
      process.env.NODE_ENV === 'production' ||
      process.env.CI === 'true' ||
      !!process.env.RENDER ||
      !!process.env.RENDER_SERVICE_ID ||
      !!process.env.GITHUB_ACTIONS ||
      !!process.env.VERCEL
    );

    if (looksLikeLocal && runningOnHosted) {
      console.error('\nFATAL ERROR: MONGO_URI appears to point to localhost (e.g. mongodb://localhost:27017).');
      console.error('Cloud hosts like Render cannot reach a database running on your developer machine.');
      console.error('Fix: Set a remote MongoDB (for example MongoDB Atlas) and add its connection string to the Render service environment variable MONGO_URI.');
      console.error('Alternatively, if you intentionally want to allow a local DB in this environment (not recommended), set FORCE_ALLOW_LOCAL_MONGO=true (temporary).\n');
      process.exit(1);
    }

    console.log("Attempting to connect to MongoDB...");
    console.log("MONGO_URI format check:", MONGO_URI.substring(0, 20) + "...");
    
    // Validate MONGO_URI format
    if (!MONGO_URI.startsWith('mongodb://') && !MONGO_URI.startsWith('mongodb+srv://')) {
      console.error('FATAL ERROR: MONGO_URI must start with "mongodb://" or "mongodb+srv://"');
      console.error('Current MONGO_URI starts with:', MONGO_URI.substring(0, 15));
      process.exit(1);
    }
    
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
