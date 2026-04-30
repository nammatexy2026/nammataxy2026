import { Router } from 'express';
import * as addressController from '../../modules/addresses/controller/address.controller.js';
import { protect, authorize } from '../../middleware/auth.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const router = Router();

// Protect all routes for customer
router.use(protect, authorize('customer'));

router.get('/', asyncHandler(addressController.getMyAddresses));
router.post('/', asyncHandler(addressController.createAddress));
router.patch('/:id', asyncHandler(addressController.updateAddress));
router.delete('/:id', asyncHandler(addressController.deleteAddress));

export default router;
