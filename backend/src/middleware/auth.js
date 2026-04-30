/**
 * src/middleware/auth.js
 *
 * ── PHASE 1 SCAFFOLDING — NOT PRODUCTION AUTH ──
 *
 * This file defines the structural shape of the authentication middleware.
 * In Phase 2, these stubs will be replaced with real JWT verification,
 * role checks against the DB, and token refresh logic.
 *
 * Current behaviour:
 *   - protect()    → validates a Bearer JWT (real JWT parsing, dev-safe)
 *   - authorize()  → checks req.user.role against allowed roles (real check)
 *   - optionalAuth → extracts user if token present, does NOT fail if absent
 *
 * Assumptions for Phase 2:
 *   - JWT payload shape: { userId, role, iat, exp }
 *   - roles: 'customer' | 'driver' | 'staff' | 'admin'
 *   - Token issued by: POST /api/v1/auth/login
 */

import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';
import config from '../config/env.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Extract the Bearer token from the Authorization header.
 * Returns null if not present or malformed.
 */
function extractToken(req) {
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    return header.slice(7);
  }
  return null;
}

/**
 * protect — require a valid JWT.
 * Sets req.user = { userId, role } on success.
 */
export const protect = asyncHandler(async (req, _res, next) => {
  const token = extractToken(req);
  if (!token) throw AppError.unauthorized('No authentication token provided', 'AUTH_NO_TOKEN');

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = { 
      userId: decoded.userId, 
      id: decoded.userId, 
      role: decoded.role 
    };
    next();
  } catch (err) {
    // Let errorHandler map JsonWebTokenError / TokenExpiredError
    throw err;
  }
});

/**
 * authorize — restrict access to specific roles.
 * Must be used AFTER protect().
 *
 * @param {...string} roles - Allowed roles (e.g. 'admin', 'staff')
 *
 * Example:
 *   router.delete('/user/:id', protect, authorize('admin'), deleteUser)
 */
export const authorize = (...roles) =>
  asyncHandler(async (req, _res, next) => {
    if (!req.user) throw AppError.unauthorized();
    if (!roles.includes(req.user.role)) {
      throw AppError.forbidden(
        `Role '${req.user.role}' is not allowed to perform this action`,
        'AUTH_INSUFFICIENT_ROLE',
      );
    }
    next();
  });

/**
 * optionalAuth — extract user from token if present, but don't fail.
 * Useful for public endpoints that have different behaviour for authenticated users.
 */
export const optionalAuth = (req, _res, next) => {
  const token = extractToken(req);
  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      req.user = { 
        userId: decoded.userId, 
        id: decoded.userId, 
        role: decoded.role 
      };
    } catch {
      // Silently ignore invalid tokens for optional auth
    }
  }
  next();
};
