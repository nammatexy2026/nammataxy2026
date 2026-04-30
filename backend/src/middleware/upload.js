import multer from 'multer';
import { AppError } from '../utils/AppError.js';

// Use memory storage for Cloudinary streaming
const storage = multer.memoryStorage();

/**
 * File filter to allow only images
 */
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

/**
 * Configure multer
 */
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export default upload;
