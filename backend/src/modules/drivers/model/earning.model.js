import mongoose from 'mongoose';

const driverEarningSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
      unique: true, // One earning per booking
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      required: true,
    },
    bookingRef: {
      type: String,
      required: true,
    },
    tripFare: {
      type: Number,
      required: true,
    },
    earningAmount: {
      type: Number,
      required: true,
    },
    earningRuleType: {
      type: String,
      enum: ['percentage', 'flat'],
      default: 'percentage',
    },
    earningRuleValue: {
      type: Number,
      default: 80, // Default 80% to driver
    },
    settlementStatus: {
      type: String,
      enum: ['pending', 'settled', 'cancelled', 'adjusted'],
      default: 'pending',
    },
    settledAt: Date,
    settledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
    },
    payoutBatchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SettlementBatch',
    },
    notes: String,
  },
  { timestamps: true }
);

// Indexes for performance
driverEarningSchema.index({ driverId: 1, settlementStatus: 1 });
driverEarningSchema.index({ settlementStatus: 1, createdAt: -1 });
driverEarningSchema.index({ bookingRef: 1 });
driverEarningSchema.index({ payoutBatchId: 1 });
driverEarningSchema.index({ createdAt: -1 });

export default mongoose.model('DriverEarning', driverEarningSchema);
