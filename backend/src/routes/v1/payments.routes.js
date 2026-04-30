import express from 'express';
import * as paymentController from '../../modules/payments/controller/payment.controller.js';
import { protect, optionalAuth } from '../../middleware/auth.js';

const router = express.Router();

// Initiate payment (support guest or logged-in)
router.post('/initiate', optionalAuth, paymentController.initiatePayment);

// Verify payment
router.post('/verify', paymentController.verifyPayment);

// Record failure
router.post('/failure', paymentController.paymentFailure);

export default router;
