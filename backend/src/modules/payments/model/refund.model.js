import mongoose from 'mongoose';

const refundSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },
    provider: {
      type: String,
      enum: ['razorpay'],
      required: true,
    },
    providerRefundId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['pending', 'processed', 'failed', 'not_required', 'manual_review'],
      default: 'pending',
    },
    reason: {
      type: String,
    },
    initiatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff', // or null for system/customer
    },
    rawPayload: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Refund', refundSchema);
