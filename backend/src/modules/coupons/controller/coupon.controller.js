import * as couponService from '../service/coupon.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';

export async function getAllCoupons(req, res) {
  const coupons = await couponService.getAllCoupons();
  return sendSuccess(res, {
    data: coupons,
  });
}

export async function createCoupon(req, res) {
  const coupon = await couponService.createCoupon(req.body);
  return sendSuccess(res, {
    message: 'Coupon created successfully',
    data: coupon,
  });
}

export async function updateCoupon(req, res) {
  const coupon = await couponService.updateCoupon(req.params.id, req.body);
  return sendSuccess(res, {
    message: 'Coupon updated successfully',
    data: coupon,
  });
}

export async function deleteCoupon(req, res) {
  await couponService.deleteCoupon(req.params.id);
  return sendSuccess(res, {
    message: 'Coupon deleted successfully',
  });
}

export async function validateCoupon(req, res) {
  const { code, orderValue } = req.body;
  const coupon = await couponService.validateCoupon(code, orderValue);
  return sendSuccess(res, {
    message: 'Coupon is valid',
    data: coupon,
  });
}
