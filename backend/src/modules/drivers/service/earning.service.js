import mongoose from 'mongoose';
import DriverEarning from '../model/earning.model.js';
import Booking from '../../bookings/model/booking.model.js';
import { AppError } from '../../../utils/AppError.js';

/**
 * Calculate and record earnings for a completed booking
 */
export async function recordTripEarning(bookingId) {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw AppError.notFound('Booking not found');
  if (booking.status !== 'completed') return;
  if (!booking.assignedDriver?.driverId) return;

  // Check for existing earning to prevent duplicates
  const existing = await DriverEarning.findOne({ bookingId });
  if (existing) return existing;

  // Rule: 80% of fare goes to driver (Simple default rule)
  const tripFare = booking.fareDetails.computedFare;
  const earningPercentage = 80;
  const earningAmount = Math.floor((tripFare * earningPercentage) / 100);

  const earning = await DriverEarning.create({
    bookingId: booking._id,
    driverId: booking.assignedDriver.driverId,
    bookingRef: booking.bookingRef,
    tripFare,
    earningAmount,
    earningRuleType: 'percentage',
    earningRuleValue: earningPercentage,
    settlementStatus: 'pending',
  });

  return earning;
}

/**
 * Mark an earning as settled
 */
export async function settleEarning(earningId, staffId, notes = '') {
  const earning = await DriverEarning.findById(earningId);
  if (!earning) throw AppError.notFound('Earning record not found');
  
  if (earning.settlementStatus === 'settled') {
    return earning;
  }

  if (earning.payoutBatchId) {
    throw AppError.badRequest('This earning is already linked to a payout batch. Please process or cancel the batch instead.');
  }

  earning.settlementStatus = 'settled';
  earning.settledAt = new Date();
  earning.settledBy = staffId;
  if (notes) earning.notes = notes;

  await earning.save();
  return earning;
}

/**
 * Get earnings for a driver
 */
export async function getDriverEarnings(driverId) {
  return DriverEarning.find({ driverId })
    .populate('payoutBatchId', 'batchRef processedAt')
    .sort({ createdAt: -1 });
}

/**
 * Get summary stats for driver earnings
 */
export async function getDriverEarningsSummary(driverId) {
  const stats = await DriverEarning.aggregate([
    { $match: { driverId: new mongoose.Types.ObjectId(driverId) } },
    {
      $group: {
        _id: '$settlementStatus',
        totalAmount: { $sum: '$earningAmount' },
        count: { $sum: 1 },
      }
    }
  ]);

  const summary = {
    pending: { amount: 0, count: 0 },
    settled: { amount: 0, count: 0 },
    total: { amount: 0, count: 0 }
  };

  stats.forEach(s => {
    if (s._id === 'pending') {
      summary.pending = { amount: s.totalAmount, count: s.count };
    } else if (s._id === 'settled') {
      summary.settled = { amount: s.totalAmount, count: s.count };
    }
    summary.total.amount += s.totalAmount;
    summary.total.count += s.count;
  });

  return summary;
}
