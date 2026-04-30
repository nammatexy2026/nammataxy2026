import * as staffService from '../service/staff.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';

export async function getAllStaff(req, res) {
  const staff = await staffService.getAllStaff();
  return sendSuccess(res, {
    data: staff,
  });
}

export async function createStaff(req, res) {
  const staff = await staffService.createStaff(req.body);
  return sendSuccess(res, {
    message: 'Staff member created successfully',
    data: staff,
  });
}

export async function updateStaff(req, res) {
  const staff = await staffService.updateStaff(req.params.id, req.body);
  return sendSuccess(res, {
    message: 'Staff member updated successfully',
    data: staff,
  });
}

export async function toggleStatus(req, res) {
  const staff = await staffService.toggleStaffStatus(req.params.id);
  return sendSuccess(res, {
    message: `Staff member ${staff.isActive ? 'enabled' : 'disabled'} successfully`,
    data: staff,
  });
}

export async function getReports(req, res) {
  const { date } = req.query;
  const reports = await staffService.getStaffReports(date || new Date());
  return sendSuccess(res, {
    data: reports,
  });
}
