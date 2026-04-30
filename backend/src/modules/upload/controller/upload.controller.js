import { asyncHandler } from '../../../utils/asyncHandler.js';
import { uploadToCloudinary } from '../../../utils/cloudinary.js';
import { AppError } from '../../../utils/AppError.js';
import { sendSuccess } from '../../../utils/apiResponse.js';

/**
 * Handle single image upload to Cloudinary
 * POST /api/v1/upload/image
 */
export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError('No file uploaded', 400);
  }

  const folder = req.body.folder || 'namma-taxi';
  const result = await uploadToCloudinary(req.file.buffer, folder);

  sendSuccess(res, {
    data: {
      url: result.secure_url,
      publicId: result.public_id,
      originalName: req.file.originalname,
      format: result.format,
      size: result.bytes
    },
    message: 'Image uploaded successfully'
  });
});
