import * as keywordService from '../service/keyword.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';

export async function getAllKeywords(req, res) {
  const keywords = await keywordService.getAllKeywords();
  return sendSuccess(res, {
    data: keywords,
  });
}

export async function createKeyword(req, res) {
  const keyword = await keywordService.createKeyword(req.body);
  return sendSuccess(res, {
    message: 'Keyword created successfully',
    data: keyword,
  });
}

export async function updateKeyword(req, res) {
  const keyword = await keywordService.updateKeyword(req.params.id, req.body);
  return sendSuccess(res, {
    message: 'Keyword updated successfully',
    data: keyword,
  });
}

export async function deleteKeyword(req, res) {
  await keywordService.deleteKeyword(req.params.id);
  return sendSuccess(res, {
    message: 'Keyword deleted successfully',
  });
}
