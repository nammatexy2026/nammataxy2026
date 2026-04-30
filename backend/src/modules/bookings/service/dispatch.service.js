import Booking from '../model/booking.model.js';
import Driver from '../../drivers/model/driver.model.js';
import { AppError } from '../../../utils/AppError.js';

/**
 * Convert booking pickupDate and pickupTime strings to a Date object
 */
export function getBookingDate(booking) {
  if (!booking.tripSummary?.pickupDate || !booking.tripSummary?.pickupTime) return null;
  return new Date(`${booking.tripSummary.pickupDate}T${booking.tripSummary.pickupTime}`);
}

/**
 * Get recommended drivers for a specific booking
 */
export async function getRecommendedDrivers(bookingId) {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw AppError.notFound('Booking not found');

  const drivers = await Driver.find({ isActive: true });
  const bookingDate = getBookingDate(booking);

  // Get active bookings for all drivers to check for conflicts
  const activeBookings = await Booking.find({
    status: { $in: ['assigned', 'enroute', 'arrived', 'started'] },
    'assignedDriver.driverId': { $in: drivers.map(d => d._id) }
  }).lean();

  const recommendations = drivers.map(driver => {
    let score = 0;
    const reasons = [];

    // 1. Availability Status
    if (driver.status === 'available') {
      score += 50;
      reasons.push('Available');
    } else {
      reasons.push(`Currently ${driver.status}`);
    }

    // 2. Vehicle Category Match
    if (driver.vehicleCategoryId?.toString() === booking.selectedVehicleCategory.categoryId.toString()) {
      score += 30;
      reasons.push('Category Match');
    } else {
      reasons.push('Category Mismatch');
    }

    // 3. Workload Check
    const driverActiveBookings = activeBookings.filter(b => 
      b.assignedDriver?.driverId?.toString() === driver._id.toString()
    );

    if (driverActiveBookings.length === 0) {
      score += 20;
      reasons.push('No active trips');
    } else {
      score -= (driverActiveBookings.length * 10);
      reasons.push(`${driverActiveBookings.length} active trips`);
    }

    // 4. Scheduling Conflicts (Simple overlap check)
    // If driver has a booking within 4 hours of this one
    const nearbyBookings = activeBookings.filter(b => {
      if (b.assignedDriver?.driverId?.toString() !== driver._id.toString()) return false;
      const bDate = getBookingDate(b);
      if (!bDate || !bookingDate) return false;
      const diffHrs = Math.abs(bookingDate - bDate) / 36e5;
      return diffHrs < 4;
    });

    if (nearbyBookings.length > 0) {
      score -= 40;
      reasons.push('Potential time conflict');
    }

    return {
      driver: {
        _id: driver._id,
        name: driver.name,
        phone: driver.phone,
        vehicleNumber: driver.vehicleNumber,
        status: driver.status
      },
      score,
      reasons
    };
  });

  // Sort by score descending
  return recommendations.sort((a, b) => b.score - a.score);
}

/**
 * Detect operational conflicts for a booking
 */
export async function detectBookingConflicts(bookingId) {
  const booking = await Booking.findById(bookingId);
  if (!booking) return [];

  const conflicts = [];
  const now = new Date();
  const bookingDate = getBookingDate(booking);

  // 1. Late Unassigned Conflict
  if (booking.status === 'confirmed' && bookingDate && bookingDate < now) {
    conflicts.push({
      type: 'LATE_UNASSIGNED',
      severity: 'high',
      message: 'Booking is past pickup time and still unassigned'
    });
  }

  // 2. Overlapping Assignment Conflict (if driver is assigned)
  if (booking.assignedDriver?.driverId && bookingDate) {
    const overlapping = await Booking.find({
      _id: { $ne: booking._id },
      'assignedDriver.driverId': booking.assignedDriver.driverId,
      status: { $in: ['assigned', 'enroute', 'arrived', 'started'] }
    }).lean();

    overlapping.forEach(other => {
      const otherDate = getBookingDate(other);
      if (otherDate) {
        const diffHrs = Math.abs(bookingDate - otherDate) / 36e5;
        if (diffHrs < 3) {
          conflicts.push({
            type: 'OVERLAP',
            severity: 'medium',
            message: `Overlaps with booking ${other.bookingRef} (within 3 hours)`
          });
        }
      }
    });
  }

  return conflicts;
}
