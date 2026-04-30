import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'userModel',
    },
    userModel: {
      type: String,
      required: true,
      enum: ['Driver', 'Staff'],
    },
    checkIn: {
      type: Date,
      required: true,
      default: Date.now,
    },
    checkOut: {
      type: Date,
    },
    workHours: {
      type: String, // Calculated as HH:MM:SS
      default: '',
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'on_leave'],
      default: 'present',
    },
    notes: String,
  },
  { timestamps: true }
);

// Index for faster queries
attendanceSchema.index({ userId: 1, checkIn: -1 });

export default mongoose.model('Attendance', attendanceSchema);
