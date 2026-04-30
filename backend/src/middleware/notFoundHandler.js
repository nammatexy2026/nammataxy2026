/**
 * src/middleware/notFoundHandler.js
 *
 * Catch-all handler for undefined routes.
 * Must be registered AFTER all routes but BEFORE errorHandler.
 */

import { AppError } from '../utils/AppError.js';

export function notFoundHandler(req, res, next) {
  next(AppError.notFound(`Route ${req.method} ${req.originalUrl}`));
}
