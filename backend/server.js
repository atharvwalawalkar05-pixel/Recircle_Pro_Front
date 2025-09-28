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
    // Configure CORS with a whitelist taken from ALLOWED_ORIGINS env (comma-separated).
    // This prevents the backend from responding to arbitrary origins and allows easy updates in Render.
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    // sensible defaults if ALLOWED_ORIGINS is not provided (adjust as needed)
    if (allowedOrigins.length === 0) {
      allowedOrigins.push(
        'http://localhost:3000',
        'http://localhost:5173',
        'https://recircle-pro-front-git-main-atharve-s-projects.vercel.app',
        'https://recircle-pro-front.onrender.com'
      );
    }

    app.use(cors({
      origin: function (origin, callback) {
        // allow requests with no origin (like curl, mobile apps, or server-to-server)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
          return callback(null, true);
        }
        const msg = 'CORS policy: The origin ' + origin + ' is not allowed.';
        return callback(new Error(msg), false);
      },
      credentials: true,
    }));

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