import * as dispatchService from '../service/dispatch.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

/**
 * Get driver recommendations for a booking
 */
export const getRecommendations = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const recommendations = await dispatchService.getRecommendedDrivers(id);
  
  return sendSuccess(res, {
    data: recommendations
  });
});

/**
 * Get conflicts for a booking
 */
export const getConflicts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const conflicts = await dispatchService.detectBookingConflicts(id);
  
  return sendSuccess(res, {
    data: conflicts
  });
});
