import express from 'express';
import * as alertController from '../../modules/alerts/controller/alert.controller.js';
import { protect, authorize } from '../../middleware/auth.js';

import * as alertValidators from '../../modules/alerts/validators/alert.validators.js';
import { validate } from '../../middleware/validate.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin', 'staff'));

router.get('/', alertValidators.listAlertsValidator, validate, alertController.getAlerts);
router.get('/summary', alertController.getSummary);
router.post('/refresh', authorize('admin'), alertController.refreshAlerts);
router.post('/:alertId/acknowledge', alertValidators.alertIdValidator, validate, alertController.acknowledgeAlert);
router.post('/:alertId/resolve', authorize('admin'), alertValidators.alertIdValidator, validate, alertController.resolveAlert);

export default router;
