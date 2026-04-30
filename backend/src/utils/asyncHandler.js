/**
 * src/utils/asyncHandler.js
 *
 * Wraps async Express route handlers so uncaught promise rejections
 * are forwarded to next(err) instead of crashing the process.
 *
 * Usage:
 *   router.get('/route', asyncHandler(async (req, res) => { ... }));
 */

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
