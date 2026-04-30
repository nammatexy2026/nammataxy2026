import Booking from '../model/booking.model.js';
import Driver from '../../drivers/model/driver.model.js';
import DriverEarning from '../../drivers/model/earning.model.js';
import Notification from '../../notifications/model/notification.model.js';
import Payment from '../../payments/model/payment.model.js';
import Refund from '../../payments/model/refund.model.js';
import { AppError } from '../../../utils/AppError.js';

/**
 * Assemble a comprehensive audit trail for a booking
 */
export async function getBookingAuditTrail(bookingId) {
  const booking = await Booking.findById(bookingId).lean();
  if (!booking) throw AppError.notFound('Booking not found');

  // Fetch all related entities in parallel
  const [earning, notifications, payment, refund] = await Promise.all([
    DriverEarning.findOne({ bookingId }).populate('driverId', 'name phone').lean(),
    Notification.find({ bookingId }).sort({ createdAt: -1 }).lean(),
    booking.paymentId ? Payment.findById(booking.paymentId).lean() : Promise.resolve(null),
    booking.refundId ? Refund.findById(booking.refundId).lean() : Promise.resolve(null)
  ]);

  // Build the timeline events
  const timeline = [];

  // 1. Creation
  timeline.push({
    event: 'BOOKING_CREATED',
    timestamp: booking.createdAt,
    message: `Booking created via ${booking.tripSummary.quoteSource || 'web'}`,
    details: {
      pickup: `${booking.tripSummary.pickupDate} ${booking.tripSummary.pickupTime}`,
      fare: booking.fareDetails.computedFare
    }
  });

  // 2. Status History Transitions
  if (booking.statusHistory) {
    booking.statusHistory.forEach(h => {
      timeline.push({
        event: 'STATUS_UPDATE',
        timestamp: h.timestamp,
        message: `Status changed to ${(h.status || 'unknown').toUpperCase()}`,
        details: {
          updatedBy: h.updatedByModel,
          note: h.note
        }
      });
    });
  }

  // 3. Assignment
  if (booking.assignedDriver?.assignedAt) {
    timeline.push({
      event: 'DRIVER_ASSIGNED',
      timestamp: booking.assignedDriver.assignedAt,
      message: `Driver ${booking.assignedDriver.name} assigned`,
      details: {
        phone: booking.assignedDriver.phone,
        vehicle: booking.assignedDriver.vehicleNumber
      }
    });
  }

  // 4. Payment
  if (payment) {
    timeline.push({
      event: 'PAYMENT_STATE',
      timestamp: payment.updatedAt || payment.createdAt,
      message: `Payment ${(payment.status || 'unknown').toUpperCase()} via ${(payment.method || 'unknown').toUpperCase()}`,
      details: {
        paymentId: payment.providerPaymentId,
        amount: payment.amount
      }
    });
  }

  // 5. Refund
  if (refund) {
    timeline.push({
      event: 'REFUND_STATE',
      timestamp: refund.updatedAt || refund.createdAt,
      message: `Refund ${(refund.status || 'unknown').toUpperCase()}`,
      details: {
        refundId: refund.providerRefundId,
        amount: refund.amount,
        reason: refund.reason
      }
    });
  }

  // 6. Notifications
  notifications.forEach(n => {
    timeline.push({
      event: 'NOTIFICATION_SENT',
      timestamp: n.createdAt,
      message: `${(n.channel || 'system').toUpperCase()} notification: ${n.eventKey}`,
      details: {
        status: n.status,
        recipient: n.recipient
      }
    });
  });

  // 7. Settlement
  if (earning) {
    timeline.push({
      event: 'EARNING_SETTLEMENT',
      timestamp: earning.settledAt || earning.createdAt,
      message: `Earning ${(earning.settlementStatus || 'pending').toUpperCase()}`,
      details: {
        amount: earning.earningAmount,
        driver: earning.driverId?.name
      }
    });
  }

  // Sort timeline by timestamp ascending
  timeline.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return {
    booking,
    earning,
    notifications,
    payment,
    refund,
    timeline
  };
}
