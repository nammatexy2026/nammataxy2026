import * as paymentService from '../service/payment.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';

export const initiatePayment = async (req, res) => {
  const { bookingId, phone } = req.body;
  const authContext = {
    userId: req.user?.userId,
    guestPhone: phone
  };
  
  const paymentInfo = await paymentService.initiatePayment(bookingId, authContext);
  
  return sendSuccess(res, {
    message: 'Payment initiated',
    data: paymentInfo,
  });
};

export const verifyPayment = async (req, res) => {
  const result = await paymentService.verifyPayment(req.body);
  
  return sendSuccess(res, {
    message: 'Payment verified successfully',
    data: result,
  });
};

export const paymentFailure = async (req, res) => {
  const { orderId, error } = req.body;
  await paymentService.handlePaymentFailure(orderId, error);
  
  return sendSuccess(res, {
    message: 'Payment failure recorded',
  });
};
