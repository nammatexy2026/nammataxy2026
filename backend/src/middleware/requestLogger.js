/**
 * src/middleware/requestLogger.js
 *
 * HTTP request logger middleware using Morgan.
 * Outputs request details to winston so everything ends up in the same log stream.
 */

import morgan from 'morgan';
import logger from '../utils/logger.js';
import config from '../config/env.js';

// Pipe morgan output to winston
const stream = {
  write: (message) => logger.http(message.trim()),
};

// Skip health check endpoint to reduce noise in logs
const skip = (req) => {
  return req.url === '/api/health';
};

export const requestLogger = morgan(
  config.isProduction ? 'combined' : 'dev',
  { stream, skip },
);
