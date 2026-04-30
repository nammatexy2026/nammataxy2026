import Attendance from '../model/attendance.model.js';
import { AppError } from '../../../utils/AppError.js';

export async function getAllAttendance(filters = {}) {
  // Populate user details based on userModel
  return Attendance.find(filters)
    .populate('userId', 'name email phone')
    .sort({ checkIn: -1 });
}

export async function recordCheckIn(userId, userModel) {
  // Check if there's an open check-in
  const openAttendance = await Attendance.findOne({
    userId,
    checkOut: { $exists: false },
  });

  if (openAttendance) {
    return openAttendance; // Already checked in
  }

  return Attendance.create({
    userId,
    userModel,
    checkIn: new Date(),
  });
}

export async function recordCheckOut(userId) {
  const attendance = await Attendance.findOne({
    userId,
    checkOut: { $exists: false },
  }).sort({ checkIn: -1 });

  if (!attendance) {
    throw AppError.notFound('No active check-in found for this user');
  }

  const checkOutTime = new Date();
  const diffMs = checkOutTime - attendance.checkIn;
  const hours = Math.floor(diffMs / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);
  const seconds = Math.floor((diffMs % 60000) / 1000);

  attendance.checkOut = checkOutTime;
  attendance.workHours = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  await attendance.save();
  return attendance;
}
