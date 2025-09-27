// Test MongoDB Connection
require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MONGO_URI:', process.env.MONGO_URI.replace(/:[^@]+@/, ':***@')); // Hide password
    
    const mongoOptions = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    
    await mongoose.connect(process.env.MONGO_URI, mongoOptions);
    console.log('✅ MongoDB connection successful!');
    
    // Test basic database operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 8000) {
      console.log('\n🔧 TROUBLESHOOTING TIPS:');
      console.log('1. Check if your MongoDB Atlas username and password are correct');
      console.log('2. Ensure your IP address is whitelisted in MongoDB Atlas');
      console.log('3. Verify the cluster URL is correct');
      console.log('4. Make sure the database user has proper permissions');
    }
    
    process.exit(1);
  }
}

testConnection();