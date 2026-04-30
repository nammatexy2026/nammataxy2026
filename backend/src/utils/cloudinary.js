import { v2 as cloudinary } from 'cloudinary';
import config from '../config/env.js';
import logger from './logger.js';

// Configure Cloudinary
if (config.cloudinary.cloudName && config.cloudinary.apiKey && config.cloudinary.apiSecret) {
  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
    secure: true
  });
  logger.info('[Cloudinary] Configured successfully');
} else {
  logger.warn('[Cloudinary] Configuration missing. Image uploads will fail.');
}

/**
 * Upload a file buffer to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer from multer
 * @param {string} folder - Destination folder in Cloudinary
 * @returns {Promise<object>} - Cloudinary upload result
 */
export const uploadToCloudinary = (fileBuffer, folder = 'namma-taxi') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          logger.error('[Cloudinary] Upload failed', { error });
          return reject(error);
        }
        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

/**
 * Delete a file from Cloudinary
 * @param {string} publicId - The public ID of the file to delete
 * @returns {Promise<object>} - Cloudinary deletion result
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    logger.error('[Cloudinary] Deletion failed', { publicId, error });
    throw error;
  }
};

export default cloudinary;
