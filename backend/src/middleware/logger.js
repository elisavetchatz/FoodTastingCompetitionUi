/**
 * Request logging middleware
 */

/**
 * Simple request logger
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  console.log(`➡️  ${req.method} ${req.url}`, {
    timestamp: new Date().toISOString()
  });

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`⬅️  ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });

  next();
};

export default requestLogger;
