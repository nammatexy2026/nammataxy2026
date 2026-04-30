import * as settingService from '../service/setting.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await settingService.getAllSettings();
  return sendSuccess(res, {
    message: 'Settings retrieved successfully',
    data: settings,
  });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const { key, value, description } = req.body;
  const setting = await settingService.updateSetting(key, value, description);
  return sendSuccess(res, {
    message: 'Settings updated successfully',
    data: setting,
  });
});
