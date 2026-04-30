import * as authService from '../service/auth.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';

export async function adminLogin(req, res) {
  const { email, password } = req.body;

  const result = await authService.loginAdmin({ email, password });

  return sendSuccess(res, {
    message: 'Login successful',
    data: result,
  });
}

export async function driverLogin(req, res) {
  const { phone, password } = req.body;
  const result = await authService.loginDriver({ phone, password });
  return sendSuccess(res, {
    message: 'Driver login successful',
    data: result,
  });
}

export async function getMe(req, res) {
  // Extract user info from req.user (set by protect middleware)
  const { userId, role } = req.user;
  
  const userProfile = await authService.getMe({ userId, role });

  return sendSuccess(res, {
    message: 'Current user profile',
    data: userProfile,
  });
}

export async function requestCustomerOtp(req, res) {
  const { phone } = req.body;
  const result = await authService.requestCustomerOtp({ phone });
  return sendSuccess(res, {
    message: result.message,
    data: null,
  });
}

export async function verifyCustomerOtp(req, res) {
  const { phone, code } = req.body;
  const result = await authService.verifyCustomerOtp({ phone, code });
  return sendSuccess(res, {
    message: 'OTP verified successfully',
    data: result,
  });
}
