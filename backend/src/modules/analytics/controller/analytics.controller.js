import * as analyticsService from '../service/analytics.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

/**
 * Get main dashboard metrics
 */
export const getDashboardSummary = asyncHandler(async (req, res) => {
  const { range } = req.query;
  const stats = await analyticsService.getDashboardStats(range);
  
  return sendSuccess(res, {
    message: 'Dashboard summary retrieved',
    data: stats
  });
});

export const getBookingsSummary = asyncHandler(async (req, res) => {
  const { range } = req.query;
  const stats = await analyticsService.getBookingsSummary(range);
  return sendSuccess(res, { data: stats });
});

export const getPaymentsSummary = asyncHandler(async (req, res) => {
  const { range } = req.query;
  const stats = await analyticsService.getPaymentsSummary(range);
  return sendSuccess(res, { data: stats });
});

export const getDriversSummary = asyncHandler(async (req, res) => {
  const stats = await analyticsService.getDriversSummary();
  return sendSuccess(res, { data: stats });
});
