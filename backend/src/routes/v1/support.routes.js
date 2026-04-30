import express from 'express';
import * as supportController from '../../modules/support/controller/support.controller.js';
import { protect, authorize } from '../../middleware/auth.js';

import * as supportValidators from '../../modules/support/validators/support.validators.js';
import { validate } from '../../middleware/validate.js';

const router = express.Router();

// Admin/Staff only routes
router.use(protect);
router.use(authorize('admin', 'staff'));

router.post('/', supportValidators.createCaseValidator, validate, supportController.createCase);
router.get('/', supportValidators.listCasesValidator, validate, supportController.getCases);
router.get('/metrics', authorize('admin'), supportController.getMetrics);
router.get('/ref/:caseRef', supportController.getCaseByRef);
router.get('/booking/:bookingId', supportController.getBookingSummary);
router.patch('/:caseId', supportValidators.updateCaseValidator, validate, supportController.updateCase);
router.post('/:caseId/notes', supportValidators.addNoteValidator, validate, supportController.addNote);

export default router;
