import mongoose from 'mongoose';
import Staff from '../model/staff.model.js';
import { AppError } from '../../../utils/AppError.js';

export async function getAllStaff(filters = {}) {
  return Staff.find(filters).sort({ createdAt: -1 });
}

export async function createStaff(data) {
  const existing = await Staff.findOne({ email: data.email });
  if (existing) {
    throw AppError.badRequest('Staff with this email already exists');
  }
  return Staff.create(data);
}

export async function updateStaff(id, data) {
  const staff = await Staff.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!staff) {
    throw AppError.notFound('Staff not found');
  }
  return staff;
}

export async function toggleStaffStatus(id) {
  const staff = await Staff.findById(id);
  if (!staff) {
    throw AppError.notFound('Staff not found');
  }
  staff.isActive = !staff.isActive;
  await staff.save();
  return staff;
}

export async function getStaffReports(date) {
  const staffMembers = await Staff.find({ role: 'staff' });
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const reports = await Promise.all(staffMembers.map(async (staff) => {
    // Get activity from bookings
    // We aggregate bookings where this staff was the one who confirmed/assigned it
    const bookings = await mongoose.model('Booking').aggregate([
      {
        $match: {
          'statusHistory.updatedBy': staff._id,
          createdAt: { $gte: startOfDay, $lte: endOfDay }
        }
      },
      {
        $group: {
          _id: '$selectedVehicleCategory.name',
          assigned: { 
            $sum: { $cond: [{ $in: ['confirmed', '$statusHistory.status'] }, 1, 0] } 
          },
          completed: { 
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } 
          }
        }
      }
    ]);

    // Get attendance
    const attendance = await mongoose.model('Attendance').findOne({
      userId: staff._id,
      checkIn: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ checkIn: -1 });

    return {
      name: staff.name,
      id: staff._id,
      activity: bookings,
      checkIn: attendance?.checkIn || null,
      checkOut: attendance?.checkOut || null
    };
  }));

  return reports;
}
