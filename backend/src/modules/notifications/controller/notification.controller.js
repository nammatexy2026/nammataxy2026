import Notification from '../model/notification.model.js';
import { sendSuccess } from '../../../utils/apiResponse.js';

export async function getBookingNotifications(req, res) {
  const notifications = await Notification.find({ bookingId: req.params.bookingId })
    .sort({ createdAt: -1 });
    
  return sendSuccess(res, {
    message: 'Booking notifications retrieved',
    data: notifications,
  });
}

export async function getMyNotifications(req, res) {
  const notifications = await Notification.find({ customerId: req.user.id })
    .sort({ createdAt: -1 })
    .limit(50);
    
  return sendSuccess(res, {
    message: 'User notifications retrieved',
    data: notifications,
  });
}
