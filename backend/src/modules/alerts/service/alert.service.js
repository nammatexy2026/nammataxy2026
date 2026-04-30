import Alert from '../model/alert.model.js';
import Booking from '../../bookings/model/booking.model.js';
import SupportCase from '../../support/model/supportCase.model.js';
import Refund from '../../payments/model/refund.model.js';
import Payment from '../../payments/model/payment.model.js';
import Earning from '../../drivers/model/earning.model.js';
import { AppError } from '../../../utils/AppError.js';

/**
 * Generate/Upsert a system alert
 */
export async function upsertAlert(alertData) {
  const { type, relatedEntityId, status = 'active' } = alertData;

  // Find existing active/acknowledged alert for this entity/type
  const existing = await Alert.findOne({
    type,
    relatedEntityId,
    status: { $in: ['active', 'acknowledged'] }
  });

  if (existing) {
    // If it's already acknowledged, maybe we don't want to revert to active?
    // Or we update the message if it changed
    existing.message = alertData.message;
    existing.severity = alertData.severity;
    existing.triggeredAt = new Date();
    return existing.save();
  }

  return Alert.create(alertData);
}

/**
 * Get alerts with filters
 */
export async function getAlerts(filters = {}) {
  const { status, severity, type } = filters;
  const query = {};
  
  if (status) query.status = status;
  if (severity) query.severity = severity;
  if (type) query.type = type;

  return Alert.find(query)
    .sort({ triggeredAt: -1 })
    .populate('bookingId', 'bookingRef status')
    .populate('supportCaseId', 'caseRef status')
    .populate('payoutBatchId', 'batchRef status');
}

/**
 * Acknowledge an alert
 */
export async function acknowledgeAlert(alertId, staffId) {
  const alert = await Alert.findById(alertId);
  if (!alert) throw AppError.notFound('Alert not found');

  alert.status = 'acknowledged';
  alert.acknowledgedAt = new Date();
  alert.acknowledgedBy = staffId;
  return alert.save();
}

/**
 * Resolve an alert
 */
export async function resolveAlert(alertId, staffId) {
  const alert = await Alert.findById(alertId);
  if (!alert) throw AppError.notFound('Alert not found');

  alert.status = 'resolved';
  alert.resolvedAt = new Date();
  alert.resolvedBy = staffId;
  return alert.save();
}

/**
 * Refresh operational alerts (Scan system for issues)
 */
export async function refreshAlerts() {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  
  // 1. UNASSIGNED_UPCOMING_BOOKING
  // Logic: Confirmed, no driver, pickup within next 12 hours
  const twelveHoursLater = new Date(now.getTime() + 12 * 3600000);
  const twelveHoursLaterStr = twelveHoursLater.toISOString().split('T')[0];
  
  const unassignedCandidates = await Booking.find({
    status: 'confirmed',
    'assignedDriver.driverId': { $exists: false },
    'tripSummary.pickupDate': { $gte: todayStr, $lte: twelveHoursLaterStr }
  }).lean();

  for (const b of unassignedCandidates) {
    const pickupDateTime = new Date(`${b.tripSummary.pickupDate}T${b.tripSummary.pickupTime}`);
    if (pickupDateTime >= now && pickupDateTime <= twelveHoursLater) {
      await upsertAlert({
        type: 'UNASSIGNED_UPCOMING_BOOKING',
        severity: 'high',
        title: `Unassigned Upcoming: ${b.bookingRef}`,
        message: `Booking ${b.bookingRef} is scheduled for ${b.tripSummary.pickupDate} ${b.tripSummary.pickupTime} but has no driver.`,
        bookingId: b._id,
        bookingRef: b.bookingRef,
        relatedEntityType: 'Booking',
        relatedEntityId: b._id.toString()
      });
    }
  }

  // 2. LATE_BOOKING_ATTENTION
  // Logic: Status not completed/cancelled, pickup time passed by > 1 hour
  const oneHourAgo = new Date(now.getTime() - 1 * 3600000);
  const lateCandidates = await Booking.find({
    status: { $nin: ['completed', 'cancelled'] },
    'tripSummary.pickupDate': { $lte: todayStr }
  }).lean();

  for (const b of lateCandidates) {
    const pickupDateTime = new Date(`${b.tripSummary.pickupDate}T${b.tripSummary.pickupTime}`);
    if (pickupDateTime < oneHourAgo) {
      await upsertAlert({
        type: 'LATE_BOOKING_ATTENTION',
        severity: 'critical',
        title: `Late Trip Attention: ${b.bookingRef}`,
        message: `Trip ${b.bookingRef} was scheduled for ${b.tripSummary.pickupDate} ${b.tripSummary.pickupTime} but remains in ${b.status} status.`,
        bookingId: b._id,
        bookingRef: b.bookingRef,
        relatedEntityType: 'Booking',
        relatedEntityId: b._id.toString()
      });
    }
  }

  // 3. REFUND_MANUAL_REVIEW
  const manualRefunds = await Refund.find({ status: 'manual_review' }).lean();
  for (const r of manualRefunds) {
    await upsertAlert({
      type: 'REFUND_MANUAL_REVIEW',
      severity: 'medium',
      title: 'Refund Manual Review Required',
      message: `Refund of ₹${r.amount} for booking ${r.bookingId} requires manual review.`,
      bookingId: r.bookingId,
      relatedEntityType: 'Refund',
      relatedEntityId: r._id.toString()
    });
  }

  // 4. STALE_SUPPORT_CASE
  // Logic: Open > 48 hours
  const fortyEightHoursAgo = new Date(now.getTime() - 48 * 3600000);
  const staleCases = await SupportCase.find({
    status: { $in: ['open', 'in_progress', 'waiting_customer'] },
    createdAt: { $lt: fortyEightHoursAgo }
  }).lean();

  for (const c of staleCases) {
    await upsertAlert({
      type: 'STALE_SUPPORT_CASE',
      severity: 'medium',
      title: `Stale Support Case: ${c.caseRef}`,
      message: `Case ${c.caseRef} ("${c.subject}") has been open for more than 48 hours.`,
      supportCaseId: c._id,
      supportCaseRef: c.caseRef,
      relatedEntityType: 'SupportCase',
      relatedEntityId: c._id.toString()
    });
  }

  // 5. PENDING_PAYOUT_STALE
  // Logic: Pending earning > 72 hours
  const seventyTwoHoursAgo = new Date(now.getTime() - 72 * 3600000);
  const staleEarnings = await Earning.find({
    settlementStatus: 'pending',
    createdAt: { $lt: seventyTwoHoursAgo }
  }).lean();

  for (const e of staleEarnings) {
    await upsertAlert({
      type: 'PENDING_PAYOUT_STALE',
      severity: 'low',
      title: `Stale Pending Payout: ${e.bookingRef || e._id}`,
      message: `Earning for booking ${e.bookingRef} has been pending for more than 72 hours.`,
      bookingId: e.bookingId,
      bookingRef: e.bookingRef,
      relatedEntityType: 'Earning',
      relatedEntityId: e._id.toString()
    });
  }

  // Auto-resolve logic: Clear alerts where condition no longer exists
  // This is a simplified version: any alert that wasn't "refreshed" just now could be resolved.
  // But since we don't want to over-engineer, we'll let admins resolve them or 
  // implement specific auto-resolve on key events later.
  
  // 6. RECONCILIATION_EXCEPTION
  const reconExceptions = await Booking.aggregate([
    {
      $lookup: {
        from: 'driverearnings',
        localField: '_id',
        foreignField: 'bookingId',
        as: 'earning'
      }
    },
    {
      $lookup: {
        from: 'refunds',
        localField: '_id',
        foreignField: 'bookingId',
        as: 'refund'
      }
    },
    {
      $project: {
        bookingRef: 1,
        status: 1,
        paymentStatus: 1,
        isMissingEarning: {
          $and: [
            { $eq: ['$status', 'completed'] },
            { $eq: ['$paymentStatus', 'paid'] },
            { $eq: [{ $size: '$earning' }, 0] }
          ]
        },
        isRefundedButPaid: {
          $and: [
            { $eq: [{ $arrayElemAt: ['$refund.status', 0] }, 'processed'] },
            { $eq: [{ $arrayElemAt: ['$earning.settlementStatus', 0] }, 'settled'] }
          ]
        }
      }
    },
    {
      $match: {
        $or: [{ isMissingEarning: true }, { isRefundedButPaid: true }]
      }
    }
  ]);

  for (const b of reconExceptions) {
    await upsertAlert({
      type: 'RECONCILIATION_EXCEPTION',
      severity: 'high',
      title: `Reconciliation Exception: ${b.bookingRef}`,
      message: b.isMissingEarning 
        ? `Booking is completed and paid but has no driver earning record.`
        : `Booking was refunded but the driver payout was already settled.`,
      bookingId: b._id,
      bookingRef: b.bookingRef,
      relatedEntityType: 'Booking',
      relatedEntityId: b._id.toString()
    });
  }

  // 7. FAILED_PAYMENT_ATTENTION
  const failedPayments = await Payment.find({ 
    status: 'failed',
    createdAt: { $gte: new Date(now.getTime() - 24 * 3600000) } // Last 24h
  }).populate('bookingId').lean();

  for (const p of failedPayments) {
    if (p.bookingId && ['confirmed', 'arrived', 'picked_up'].includes(p.bookingId.status)) {
      await upsertAlert({
        type: 'FAILED_PAYMENT_ATTENTION',
        severity: 'medium',
        title: `Payment Failed: ${p.bookingId.bookingRef}`,
        message: `A payment attempt failed for an active booking. Action may be required to ensure collection.`,
        bookingId: p.bookingId._id,
        bookingRef: p.bookingId.bookingRef,
        relatedEntityType: 'Payment',
        relatedEntityId: p._id.toString()
      });
    }
  }

  return { success: true, timestamp: new Date() };
}

/**
 * Get Alert Summary for Dashboard
 */
export async function getAlertSummary(range = 'all') {
  const dateFilter = getDateFilter(range);

  const stats = await Alert.aggregate([
    { 
      $match: { 
        ...dateFilter,
        status: { $in: ['active', 'acknowledged'] } 
      } 
    },
    { $group: { _id: '$severity', count: { $sum: 1 } } }
  ]);

  const summary = {
    total: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0
  };

  stats.forEach(s => {
    summary[s._id] = s.count;
    summary.total += s.count;
  });

  return summary;
}

/**
 * Helper for range filtering
 */
function getDateFilter(range) {
  const now = new Date();
  const filter = {};

  if (range === 'today') {
    const start = new Date(now.setHours(0, 0, 0, 0));
    filter.triggeredAt = { $gte: start };
  } else if (range === '7d') {
    const start = new Date(now.setDate(now.getDate() - 7));
    filter.triggeredAt = { $gte: start };
  } else if (range === '30d') {
    const start = new Date(now.setDate(now.getDate() - 30));
    filter.triggeredAt = { $gte: start };
  }

  return filter;
}
