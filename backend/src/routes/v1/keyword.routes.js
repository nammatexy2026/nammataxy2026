import { Router } from 'express';
import * as keywordController from '../../modules/keywords/controller/keyword.controller.js';
import { protect, authorize } from '../../middleware/auth.js';

const router = Router();

// Only admins can manage keywords
router.use(protect, authorize('admin'));

router.get('/', keywordController.getAllKeywords);
router.post('/', keywordController.createKeyword);
router.patch('/:id', keywordController.updateKeyword);
router.delete('/:id', keywordController.deleteKeyword);

export default router;
