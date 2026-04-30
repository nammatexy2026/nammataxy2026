import * as supportService from '../service/support.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const createCase = asyncHandler(async (req, res) => {
  const supportCase = await supportService.createCase(req.body, req.user);
  sendSuccess(res, { data: supportCase, message: 'Support case created successfully' });
});

export const getCases = asyncHandler(async (req, res) => {
  const cases = await supportService.getCases(req.query);
  sendSuccess(res, { data: cases });
});

export const getCaseByRef = asyncHandler(async (req, res) => {
  const supportCase = await supportService.getCaseByRef(req.params.caseRef);
  sendSuccess(res, { data: supportCase });
});

export const updateCase = asyncHandler(async (req, res) => {
  const supportCase = await supportService.updateCase(req.params.caseId, req.body, req.user);
  sendSuccess(res, { data: supportCase, message: 'Case updated successfully' });
});

export const addNote = asyncHandler(async (req, res) => {
  const supportCase = await supportService.addNote(req.params.caseId, req.body.body, req.user);
  sendSuccess(res, { data: supportCase, message: 'Note added successfully' });
});

export const getMetrics = asyncHandler(async (req, res) => {
  const metrics = await supportService.getSupportMetrics(req.query.range);
  sendSuccess(res, { data: metrics });
});

export const getBookingSummary = asyncHandler(async (req, res) => {
  const summary = await supportService.getBookingSupportSummary(req.params.bookingId);
  sendSuccess(res, { data: summary });
});
