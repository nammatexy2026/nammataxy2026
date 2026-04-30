import { Router } from 'express';
import * as attendanceController from '../../modules/attendance/controller/attendance.controller.js';
import { protect, authorize } from '../../middleware/auth.js';

const router = Router();

// Admin/Staff can view all attendance
router.get('/', protect, authorize('staff', 'admin'), attendanceController.getAllAttendance);

// Users (Drivers/Staff) can check-in/out
router.post('/check-in', protect, attendanceController.checkIn);
router.post('/check-out', protect, attendanceController.checkOut);

export default router;
