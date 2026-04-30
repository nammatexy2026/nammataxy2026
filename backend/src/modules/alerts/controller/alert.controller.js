import * as alertService from '../service/alert.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const getAlerts = asyncHandler(async (req, res) => {
  const alerts = await alertService.getAlerts(req.query);
  sendSuccess(res, { data: alerts });
});

export const getSummary = asyncHandler(async (req, res) => {
  const summary = await alertService.getAlertSummary(req.query.range);
  sendSuccess(res, { data: summary });
});

export const acknowledgeAlert = asyncHandler(async (req, res) => {
  const alert = await alertService.acknowledgeAlert(req.params.alertId, req.user.userId);
  sendSuccess(res, { data: alert, message: 'Alert acknowledged' });
});

export const resolveAlert = asyncHandler(async (req, res) => {
  const alert = await alertService.resolveAlert(req.params.alertId, req.user.userId);
  sendSuccess(res, { data: alert, message: 'Alert resolved' });
});

export const refreshAlerts = asyncHandler(async (req, res) => {
  const result = await alertService.refreshAlerts();
  sendSuccess(res, { data: result, message: 'Alerts refreshed successfully' });
});
