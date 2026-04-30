import Banner from '../model/banner.model.js';
import { sendSuccess } from '../../../utils/apiResponse.js';
import { AppError } from '../../../utils/AppError.js';

export const getBanners = async (req, res) => {
  const { status } = req.query;
  const query = status ? { status } : {};
  const banners = await Banner.find(query).sort({ order: 1, createdAt: -1 });
  
  return sendSuccess(res, {
    message: 'Banners retrieved successfully',
    data: banners,
  });
};

export const createBanner = async (req, res) => {
  const banner = await Banner.create(req.body);
  
  return sendSuccess(res, {
    message: 'Banner created successfully',
    data: banner,
  }, 201);
};

export const updateBanner = async (req, res) => {
  const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  
  if (!banner) {
    throw AppError.notFound('Banner not found');
  }
  
  return sendSuccess(res, {
    message: 'Banner updated successfully',
    data: banner,
  });
};

export const deleteBanner = async (req, res) => {
  const banner = await Banner.findByIdAndDelete(req.params.id);
  
  if (!banner) {
    throw AppError.notFound('Banner not found');
  }
  
  return sendSuccess(res, {
    message: 'Banner deleted successfully',
  });
};
