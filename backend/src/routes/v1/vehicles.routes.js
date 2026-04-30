/**
 * src/routes/v1/vehicles.routes.js
 *
 * -- PHASE 1 STUB --
 * Routes for the 'vehicles' module.
 * Will be fully implemented in Phase 2.
 *
 * NOTE: Do not add real business logic here until the module models, services, and API contracts are implemented in Phase 2.
 */

import { Router } from 'express';
import { sendError } from '../../utils/apiResponse.js';

const router = Router();

// Placeholder — replace with real controller methods in Phase 2
router.all('*', (_req, res) => {
  return sendError(res, {
    message: '[STUB] vehicles module not yet implemented. Coming in Phase 2.',
    code: 'NOT_IMPLEMENTED',
    status: 501,
  });
});

export default router;

