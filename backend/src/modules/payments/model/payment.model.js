import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
    provider: {
      type: String,
      enum: ['razorpay'],
      required: true,
    },
    providerOrderId: {
      type: String,
      required: true,
    },
    providerPaymentId: {
      type: String,
    },
    providerSignature: {
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
      enum: ['created', 'pending', 'paid', 'failed', 'refunded', 'cancelled'],
      default: 'created',
    },
    method: {
      type: String,
    },
    receipt: {
      type: String,
    },
    rawPayload: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

// Indexes for performance
paymentSchema.index({ bookingId: 1 });
paymentSchema.index({ providerOrderId: 1 }, { unique: true });
paymentSchema.index({ status: 1, createdAt: -1 });
paymentSchema.index({ customerId: 1, createdAt: -1 });

export default mongoose.model('Payment', paymentSchema);
