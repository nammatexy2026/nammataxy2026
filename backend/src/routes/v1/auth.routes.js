import { Router } from 'express';
import * as authController from '../../modules/auth/controller/auth.controller.js';
import { adminLoginValidator, requestOtpValidator, verifyOtpValidator, driverLoginValidator } from '../../modules/auth/validators/auth.validators.js';
import { validate } from '../../middleware/validate.js';
import { protect } from '../../middleware/auth.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const router = Router();

// POST /api/v1/auth/admin/login
router.post(
  '/admin/login',
  adminLoginValidator,
  validate,
  asyncHandler(authController.adminLogin)
);

// POST /api/v1/auth/driver/login
router.post(
  '/driver/login',
  driverLoginValidator,
  validate,
  asyncHandler(authController.driverLogin)
);

// POST /api/v1/auth/customer/request-otp
router.post(
  '/customer/request-otp',
  requestOtpValidator,
  validate,
  asyncHandler(authController.requestCustomerOtp)
);

// POST /api/v1/auth/customer/verify-otp
router.post(
  '/customer/verify-otp',
  verifyOtpValidator,
  validate,
  asyncHandler(authController.verifyCustomerOtp)
);

// GET /api/v1/auth/me
router.get(
  '/me',
  protect,
  asyncHandler(authController.getMe)
);

export default router;
