import { Router } from 'express';
import * as staffController from '../../modules/staff/controller/staff.controller.js';
import { protect, authorize } from '../../middleware/auth.js';

const router = Router();

// Only admins can manage staff
router.use(protect, authorize('admin'));

router.get('/reports', staffController.getReports);
router.get('/', staffController.getAllStaff);
router.post('/', staffController.createStaff);
router.patch('/:id', staffController.updateStaff);
router.patch('/:id/toggle', staffController.toggleStatus);

export default router;
