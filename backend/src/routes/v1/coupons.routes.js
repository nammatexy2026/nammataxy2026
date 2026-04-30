import { Router } from 'express';
import * as couponController from '../../modules/coupons/controller/coupon.controller.js';
import { protect, authorize } from '../../middleware/auth.js';

const router = Router();

// Public validation
router.post('/validate', couponController.validateCoupon);

// Admin only management
router.use(protect, authorize('admin'));

router.get('/', couponController.getAllCoupons);
router.post('/', couponController.createCoupon);
router.patch('/:id', couponController.updateCoupon);
router.delete('/:id', couponController.deleteCoupon);

export default router;
