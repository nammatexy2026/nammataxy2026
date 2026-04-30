import { Router } from 'express';
import * as quoteController from '../../modules/quotes/controller/quote.controller.js';
import * as validators from '../../modules/quotes/validators/quote.validators.js';
import { validate } from '../../middleware/validate.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const router = Router();

// Public routes for quote generation
router.post(
  '/',
  validators.createQuoteValidator,
  validate,
  asyncHandler(quoteController.createQuote)
);

router.get(
  '/:id',
  validators.quoteIdValidator,
  validate,
  asyncHandler(quoteController.getQuote)
);

export default router;
