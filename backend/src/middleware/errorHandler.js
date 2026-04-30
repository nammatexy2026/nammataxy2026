/**
 * src/middleware/errorHandler.js
 *
 * Global Express error handling middleware.
 * Must be the LAST middleware registered in app.js.
 *
 * Handles:
 *   - AppError (operational errors — safe to expose)
 *   - express-validator ValidationError
 *   - MongoDB / Mongoose errors (duplicate key, validation, cast)
 *   - JWT errors
 *   - Generic / programmer errors (masked in production)
 */

import { AppError } from '../utils/AppError.js';
import { sendError } from '../utils/apiResponse.js';
import logger from '../utils/logger.js';
import config from '../config/env.js';

// ── Main error handler ────────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // ── Already-sent response guard ──
  if (res.headersSent) return next(err);

  // ── Operational / known AppError ──
  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      logger.error('[AppError]', { message: err.message, code: err.code, stack: err.stack });
    } else {
      logger.warn('[AppError]', { message: err.message, code: err.code, url: req.url });
    }

    return sendError(res, {
      message: err.message,
      code: err.code,
      errors: err.details,
      status: err.statusCode,
    });
  }

  // ── express-validator errors (array shape) ──
  if (Array.isArray(err) && err[0]?.path) {
    return sendError(res, {
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      errors: err.map((e) => ({ field: e.path, message: e.msg })),
      status: 422,
    });
  }

  // ── Mongoose error handling ───────────────────────────────────────────────────

  // Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return sendError(res, {
      message: `A record with this ${field} already exists.`,
      code: 'DUPLICATE_ENTRY',
      status: 409,
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((el) => ({
      field: el.path,
      message: el.message,
    }));
    return sendError(res, {
      message: 'Database validation failed',
      code: 'VALIDATION_ERROR',
      errors,
      status: 422,
    });
  }

  // Mongoose cast error (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    return sendError(res, {
      message: `Invalid ${err.path}: ${err.value}.`,
      code: 'INVALID_ID',
      status: 400,
    });
  }

  // ── JWT errors ──
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, { message: 'Invalid token', code: 'AUTH_INVALID_TOKEN', status: 401 });
  }
  if (err.name === 'TokenExpiredError') {
    return sendError(res, { message: 'Token expired', code: 'AUTH_TOKEN_EXPIRED', status: 401 });
  }

  // ── Unknown / programmer errors ──
  logger.error('[UnhandledError]', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
  });

  return sendError(res, {
    message: config.isProduction ? 'An unexpected error occurred' : err.message,
    code: 'INTERNAL_ERROR',
    status: 500,
  });
}
