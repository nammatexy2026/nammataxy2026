import { Router } from 'express';
import * as settingController from '../../modules/settings/controller/setting.controller.js';
import { protect, authorize } from '../../middleware/auth.js';

const router = Router();

// Allow public access to GET settings (for footer/contact info)
router.get('/', settingController.getSettings);

// Only admins can update settings
router.patch('/', protect, authorize('admin'), settingController.updateSettings);

export default router;
