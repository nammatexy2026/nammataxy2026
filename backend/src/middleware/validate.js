/**
 * src/middleware/validate.js
 *
 * express-validator integration helper.
 * Place this after your validator chains to automatically collect errors
 * and forward them to the error handler as a 422 response.
 *
 * Usage:
 *   router.post('/route', [...validatorChain], validate, controller)
 */

import { validationResult } from 'express-validator';
import { AppError } from '../utils/AppError.js';

export function validate(req, _res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const details = errors.array().map((e) => ({
      field: e.path,
      message: e.msg,
      value: e.value,
    }));
    return next(AppError.unprocessable('Validation failed', 'VALIDATION_ERROR', details));
  }
  next();
}
