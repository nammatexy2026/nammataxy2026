import Razorpay from 'razorpay';
import crypto from 'crypto';
import { AppError } from '../../../utils/AppError.js';

let razorpay;

export const getRazorpayInstance = () => {
  if (razorpay) return razorpay;

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    console.error('RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing in environment variables');
    // We don't throw here to allow the app to boot even without keys, but it will fail on actual payment
  }

  razorpay = new Razorpay({
    key_id: keyId || 'dummy_key',
    key_secret: keySecret || 'dummy_secret',
  });

  return razorpay;
};

export const createOrder = async (amount, receipt) => {
  const instance = getRazorpayInstance();
  try {
    const order = await instance.orders.create({
      amount: Math.round(amount * 100), // convert to paise
      currency: 'INR',
      receipt: receipt,
    });
    return order;
  } catch (error) {
    console.error('Razorpay Order Creation Error:', error);
    throw AppError.badRequest('Failed to create payment order: ' + error.description);
  }
};

export const verifySignature = (orderId, paymentId, signature) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret';
  const generatedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
};

export const createRefund = async (paymentId, amount, notes = {}) => {
  const instance = getRazorpayInstance();
  try {
    const refund = await instance.payments.refund(paymentId, {
      amount: Math.round(amount * 100), // convert to paise
      notes: notes,
    });
    return refund;
  } catch (error) {
    console.error('Razorpay Refund Error:', error);
    // Some errors might be because payment is not captured yet, or already refunded
    throw error;
  }
};
