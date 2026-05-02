import express from 'express';
import * as paymentController from '../../modules/payments/controller/payment.controller.js';
import { protect, optionalAuth } from '../../middleware/auth.js';

import { asyncHandler } from '../../utils/asyncHandler.js';

const router = express.Router();

// Initiate payment (support guest or logged-in)
router.post('/initiate', optionalAuth, asyncHandler(paymentController.initiatePayment));

// Verify payment
router.post('/verify', asyncHandler(paymentController.verifyPayment));

// Record failure
router.post('/failure', asyncHandler(paymentController.paymentFailure));

export default router;
