import * as driverService from '../service/driver.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';

export async function createDriver(req, res) {
  const driver = await driverService.createDriver(req.body);
  return sendSuccess(res, {
    message: 'Driver created successfully',
    data: driver,
  }, 201);
}

export async function getAllDrivers(req, res) {
  const filters = {};
  if (req.query.status) filters.status = req.query.status;
  if (req.query.isActive) filters.isActive = req.query.isActive === 'true';

  const drivers = await driverService.getAllDrivers(filters);
  return sendSuccess(res, {
    data: drivers,
  });
}

export async function getDriverById(req, res) {
  const driver = await driverService.getDriverById(req.params.id);
  return sendSuccess(res, {
    data: driver,
  });
}

export async function updateDriver(req, res) {
  const driver = await driverService.updateDriver(req.params.id, req.body);
  return sendSuccess(res, {
    message: 'Driver updated successfully',
    data: driver,
  });
}

export async function deleteDriver(req, res) {
  await driverService.deleteDriver(req.params.id);
  return sendSuccess(res, {
    message: 'Driver deleted successfully',
  });
}
