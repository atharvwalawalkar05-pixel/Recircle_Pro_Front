/**
 * Custom error handling middleware
 * Provides consistent error responses across the API
 */

// Not Found Error Handler - for routes that don't exist
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// General Error Handler - for all other errors
const errorHandler = (err, req, res, next) => {
  // Set status code (use 500 if somehow status is 200)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Send error response
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    timestamp: new Date().toISOString()
  });
};

module.exports = { notFound, errorHandler };