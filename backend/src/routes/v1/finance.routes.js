import express from 'express';
import * as financeController from '../../modules/finance/controller/finance.controller.js';
import { protect, authorize } from '../../middleware/auth.js';

const router = express.Router();

// All finance routes are admin/staff only
router.use(protect);
router.use(authorize('admin', 'staff'));

router.get('/reconciliation', financeController.getReconciliationData);
router.get('/summary', financeController.getFinanceSummary);
router.get('/export', authorize('admin'), financeController.exportReconciliationCsv);

export default router;
