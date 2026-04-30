import { Router } from 'express';
import * as driverController from '../../modules/drivers/controller/driver.controller.js';
import * as driverValidators from '../../modules/drivers/validators/driver.validators.js';
import * as earningController from '../../modules/drivers/controller/earning.controller.js';
import * as batchController from '../../modules/drivers/controller/settlementBatch.controller.js';
import * as settlementValidators from '../../modules/drivers/validators/settlement.validators.js';
import { validate } from '../../middleware/validate.js';
import { protect, authorize } from '../../middleware/auth.js';

const router = Router();

// All driver management routes are for admin/staff
router.use(protect);
router.use(authorize('staff', 'admin')); // Ensuring only privileged users can manage drivers

router.post(
  '/',
  driverValidators.createDriverValidator,
  validate,
  driverController.createDriver
);

router.get('/', driverValidators.listDriversValidator, validate, driverController.getAllDrivers);

router.get(
  '/:id',
  driverValidators.driverIdValidator,
  validate,
  driverController.getDriverById
);

router.patch(
  '/:id',
  driverValidators.updateDriverValidator,
  validate,
  driverController.updateDriver
);

router.delete(
  '/:id',
  driverValidators.driverIdValidator,
  validate,
  driverController.deleteDriver
);

// Earnings & Settlements (Admin)
router.get('/earnings/all', driverValidators.driverEarningsValidator, validate, earningController.getAllEarnings);
router.get('/earnings/export', authorize('admin'), driverValidators.driverEarningsValidator, validate, earningController.exportEarnings);
router.patch('/earnings/:id/settle', authorize('admin'), settlementValidators.settleEarningValidator, validate, earningController.settleEarning);

// Payout Batches

router.get('/batches', settlementValidators.listBatchesValidator, validate, batchController.getAllBatches);
router.post('/batches', authorize('admin'), settlementValidators.createBatchValidator, validate, batchController.createBatch);
router.get('/batches/:id', settlementValidators.batchIdValidator, validate, batchController.getBatch);
router.patch('/batches/:id/process', authorize('admin'), settlementValidators.batchIdValidator, validate, batchController.processBatch);
router.patch('/batches/:id/cancel', authorize('admin'), settlementValidators.batchIdValidator, validate, batchController.cancelBatch);

export default router;

