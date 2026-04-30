import * as templateService from '../service/email-template.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const getAllTemplates = asyncHandler(async (req, res) => {
  const templates = await templateService.getAllTemplates();
  return sendSuccess(res, { data: templates });
});

export const createTemplate = asyncHandler(async (req, res) => {
  const template = await templateService.createTemplate(req.body);
  return sendSuccess(res, { message: 'Template created', data: template });
});

export const updateTemplate = asyncHandler(async (req, res) => {
  const template = await templateService.updateTemplate(req.params.id, req.body);
  return sendSuccess(res, { message: 'Template updated', data: template });
});

export const deleteTemplate = asyncHandler(async (req, res) => {
  await templateService.deleteTemplate(req.params.id);
  return sendSuccess(res, { message: 'Template deleted' });
});
