import Keyword from '../model/keyword.model.js';
import { AppError } from '../../../utils/AppError.js';

export async function getAllKeywords() {
  return Keyword.find().sort({ page: 1 });
}

export async function createKeyword(data) {
  const existing = await Keyword.findOne({ page: data.page });
  if (existing) {
    throw AppError.badRequest('Keyword for this page already exists');
  }
  return Keyword.create(data);
}

export async function updateKeyword(id, data) {
  const keyword = await Keyword.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!keyword) {
    throw AppError.notFound('Keyword not found');
  }
  return keyword;
}

export async function deleteKeyword(id) {
  const keyword = await Keyword.findByIdAndDelete(id);
  if (!keyword) {
    throw AppError.notFound('Keyword not found');
  }
  return keyword;
}
