import * as vehicleCategoryService from '../service/vehicleCategory.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';

export async function createCategory(req, res) {
  const category = await vehicleCategoryService.createCategory(req.body);
  return sendSuccess(res, {
    status: 201,
    message: 'Vehicle category created',
    data: category,
  });
}

export async function getAllCategories(req, res) {
  const filters = {};
  // if public endpoint, only show active
  if (req.path.includes('/public')) {
    filters.isActive = true;
  } else if (req.query.isActive !== undefined) {
    filters.isActive = req.query.isActive === 'true';
  }

  const categories = await vehicleCategoryService.getAllCategories(filters);
  return sendSuccess(res, {
    message: 'Vehicle categories retrieved',
    data: categories,
  });
}

export async function getCategory(req, res) {
  const category = await vehicleCategoryService.getCategoryById(req.params.id);
  return sendSuccess(res, {
    message: 'Vehicle category retrieved',
    data: category,
  });
}

export async function updateCategory(req, res) {
  const category = await vehicleCategoryService.updateCategory(req.params.id, req.body);
  return sendSuccess(res, {
    message: 'Vehicle category updated',
    data: category,
  });
}

export async function deleteCategory(req, res) {
  const category = await vehicleCategoryService.deleteCategory(req.params.id);
  return sendSuccess(res, {
    message: 'Vehicle category disabled (soft delete)',
    data: category,
  });
}
