import * as attendanceService from '../service/attendance.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';

export async function getAllAttendance(req, res) {
  const filters = {};
  if (req.query.userModel) filters.userModel = req.query.userModel;
  if (req.query.userId) filters.userId = req.query.userId;

  const attendance = await attendanceService.getAllAttendance(filters);
  return sendSuccess(res, {
    data: attendance,
  });
}

export async function checkIn(req, res) {
  const { userId, userModel } = req.body;
  const attendance = await attendanceService.recordCheckIn(userId, userModel);
  return sendSuccess(res, {
    message: 'Checked in successfully',
    data: attendance,
  });
}

export async function checkOut(req, res) {
  const { userId } = req.body;
  const attendance = await attendanceService.recordCheckOut(userId);
  return sendSuccess(res, {
    message: 'Checked out successfully',
    data: attendance,
  });
}
