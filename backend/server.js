// Only load local .env when not running in production on the host (e.g. Render)
// This prevents a committed `.env` with a localhost MONGO_URI from being used in cloud deploys.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
} else {
  // In production, environment variables should be set in the hosting platform.
  console.log('Production mode: skipping loading .env from repository. Ensure required environment variables (MONGO_URI, JWT_SECRET, etc.) are set in Render/Vercel.');
}
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');
const ngoRoutes = require('./routes/ngoRoutes');

async function startServer() {
  try {
    await connectDB();

    const app = express();
    const PORT = process.env.PORT || 5000;

    app.use(express.json());
    app.use(cors());

    app.use('/api/auth', authRoutes);
    app.use('/api/items', itemRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/ngo', ngoRoutes);

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({
        status: 'OK',
        message: 'ReCircle Backend API is healthy!',
        timestamp: new Date().toISOString(),
        mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
      });
    });

    app.get('/', (req, res) => {
      res.send('ReCircle Backend API is running!');
    });

    app.listen(PORT, () => {
      console.log(`Server running successfully on port ${PORT}`);
    });

  } catch (error) {
    console.error("SERVER FAILED TO START:", error);
    process.exit(1);
  }
}

startServer();