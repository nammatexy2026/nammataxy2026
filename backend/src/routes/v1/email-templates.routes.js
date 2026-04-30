import { Router } from 'express';
import * as templateController from '../../modules/email-templates/controller/email-template.controller.js';
import { protect, authorize } from '../../middleware/auth.js';

const router = Router();

router.use(protect, authorize('admin', 'staff'));

router.get('/', templateController.getAllTemplates);
router.post('/', templateController.createTemplate);
router.patch('/:id', templateController.updateTemplate);
router.delete('/:id', templateController.deleteTemplate);

export default router;
