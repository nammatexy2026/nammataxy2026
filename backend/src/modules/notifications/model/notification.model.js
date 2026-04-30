import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
    channel: {
      type: String,
      enum: ['sms', 'email', 'whatsapp'],
      required: true,
    },
    eventKey: {
      type: String, // e.g., 'booking_created'
      required: true,
    },
    recipient: {
      type: String, // phone number or email
      required: true,
    },
    subject: {
      type: String,
    },
    messageBody: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['queued', 'sent', 'failed', 'skipped'],
      default: 'queued',
    },
    providerMessageId: {
      type: String,
    },
    errorMessage: {
      type: String,
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

// Indexes for performance
notificationSchema.index({ bookingId: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, createdAt: -1 });

export default mongoose.model('Notification', notificationSchema);
