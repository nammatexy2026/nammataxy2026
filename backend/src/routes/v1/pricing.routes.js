import { Router } from 'express';
import * as pricingController from '../../modules/pricing/controller/pricing.controller.js';
import * as validators from '../../modules/pricing/validators/pricing.validators.js';
import { validate } from '../../middleware/validate.js';
import { protect, authorize } from '../../middleware/auth.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const router = Router();

// All pricing management is admin/staff only
router.use(protect, authorize('admin', 'staff'));

router.get('/', asyncHandler(pricingController.getAllPricing));

router.post(
  '/',
  validators.createPricingValidator,
  validate,
  asyncHandler(pricingController.createPricing)
);

router.get(
  '/:id',
  validators.pricingIdValidator,
  validate,
  asyncHandler(pricingController.getPricing)
);

router.patch(
  '/:id',
  validators.updatePricingValidator,
  validate,
  asyncHandler(pricingController.updatePricing)
);

export default router;
