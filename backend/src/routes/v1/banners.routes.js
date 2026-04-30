import { Router } from 'express';
import * as bannerController from '../../modules/banners/controller/banner.controller.js';
import { protect, authorize } from '../../middleware/auth.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const router = Router();

// Public route to get active banners
router.get('/', asyncHandler(bannerController.getBanners));

// Admin routes
router.post('/', protect, authorize('admin', 'staff'), asyncHandler(bannerController.createBanner));
router.patch('/:id', protect, authorize('admin', 'staff'), asyncHandler(bannerController.updateBanner));
router.delete('/:id', protect, authorize('admin', 'staff'), asyncHandler(bannerController.deleteBanner));

export default router;
