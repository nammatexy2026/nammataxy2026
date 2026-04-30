import { Router } from 'express';
import { protect } from '../../middleware/auth.js';
import upload from '../../middleware/upload.js';
import * as uploadController from '../../modules/upload/controller/upload.controller.js';

const router = Router();

// Protect all upload routes
router.use(protect);

/**
 * @route POST /api/v1/upload/image
 * @desc Upload a single image
 * @access Private
 */
router.post('/image', upload.single('image'), uploadController.uploadImage);

export default router;
