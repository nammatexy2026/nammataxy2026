/**
 * src/utils/apiResponse.js
 *
 * Standardised JSON response helpers.
 *
 * All API responses follow this envelope:
 *   { success, message, data, meta, errors }
 *
 * Rules:
 *   - Success responses always have { success: true, data }
 *   - Error responses always have { success: false, errors }
 *   - Pagination is carried in { meta }
 */

/**
 * Send a successful response.
 * @param {import('express').Response} res
 * @param {object}  payload
 * @param {*}       payload.data    - Response data (object, array, or null)
 * @param {string}  payload.message - Optional human-readable message
 * @param {object}  payload.meta    - Optional pagination / metadata
 * @param {number}  payload.status  - HTTP status code (default 200)
 */
export function sendSuccess(res, { data = null, message = 'OK', meta = null, status = 200 } = {}) {
  const body = {
    success: true,
    message,
    data,
  };

  if (meta) body.meta = meta;

  return res.status(status).json(body);
}

/**
 * Send a created (201) response.
 */
export function sendCreated(res, { data = null, message = 'Created successfully' } = {}) {
  return sendSuccess(res, { data, message, status: 201 });
}

/**
 * Send an error response.
 * Prefer using the global error handler (middleware/errorHandler.js) instead.
 * Use this only when you need a manual error response in a specific place.
 *
 * @param {import('express').Response} res
 * @param {object}  payload
 * @param {string}  payload.message  - User-facing error summary
 * @param {string}  payload.code     - Machine-readable error code
 * @param {*}       payload.errors   - Detailed validation errors or null
 * @param {number}  payload.status   - HTTP status code (default 500)
 */
export function sendError(
  res,
  { message = 'An error occurred', code = 'ERROR', errors = null, status = 500 } = {},
) {
  const body = {
    success: false,
    message,
    code,
  };

  if (errors) body.errors = errors;

  return res.status(status).json(body);
}

/**
 * Build a pagination meta object for list endpoints.
 * @param {number} total  - Total number of records in the dataset
 * @param {number} page   - Current page (1-indexed)
 * @param {number} limit  - Records per page
 */
export function buildPaginationMeta(total, page, limit) {
  const totalPages = Math.ceil(total / limit);
  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}
