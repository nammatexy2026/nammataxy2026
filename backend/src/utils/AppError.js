/**
 * src/utils/AppError.js
 *
 * Custom application error class.
 * Differentiates operational errors (predictable, user-facing) from
 * programmer errors (bugs) so error handlers can respond accordingly.
 */

export class AppError extends Error {
  /**
   * @param {string} message       - Human-readable error message
   * @param {number} statusCode    - HTTP status code
   * @param {string} [code]        - Machine-readable error code (e.g. "AUTH_INVALID_TOKEN")
   * @param {object} [details]     - Optional structured details (validation errors, etc.)
   */
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR', details = null) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true; // Marks as safe-to-expose error

    // Maintain proper stack trace in V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  // ── Factory helpers ──────────────────────────────────────────────────────────

  static badRequest(message, code = 'BAD_REQUEST', details = null) {
    return new AppError(message, 400, code, details);
  }

  static unauthorized(message = 'Unauthorized', code = 'UNAUTHORIZED') {
    return new AppError(message, 401, code);
  }

  static forbidden(message = 'Forbidden', code = 'FORBIDDEN') {
    return new AppError(message, 403, code);
  }

  static notFound(resource = 'Resource') {
    return new AppError(`${resource} not found`, 404, 'NOT_FOUND');
  }

  static conflict(message, code = 'CONFLICT') {
    return new AppError(message, 409, code);
  }

  static unprocessable(message, code = 'UNPROCESSABLE', details = null) {
    return new AppError(message, 422, code, details);
  }

  static internal(message = 'Internal server error') {
    return new AppError(message, 500, 'INTERNAL_ERROR');
  }
}
