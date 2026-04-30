import * as batchService from '../service/settlementBatch.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const createBatch = asyncHandler(async (req, res) => {
  const { earningIds, notes } = req.body;
  const staffId = req.user.id;
  const batch = await batchService.createBatch(earningIds, staffId, notes);
  return sendSuccess(res, {
    message: 'Settlement batch created as draft',
    data: batch
  });
});

export const processBatch = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const staffId = req.user.id;
  const batch = await batchService.processBatch(id, staffId);
  return sendSuccess(res, {
    message: 'Settlement batch processed successfully',
    data: batch
  });
});

export const cancelBatch = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const batch = await batchService.cancelBatch(id);
  return sendSuccess(res, {
    message: 'Settlement batch cancelled',
    data: batch
  });
});

export const getBatch = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const batch = await batchService.getBatchDetails(id);
  return sendSuccess(res, { data: batch });
});

export const getAllBatches = asyncHandler(async (req, res) => {
  const batches = await batchService.listBatches(req.query);
  return sendSuccess(res, { data: batches });
});
