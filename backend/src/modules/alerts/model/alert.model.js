import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  alertRef: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'UNASSIGNED_UPCOMING_BOOKING',
      'LATE_BOOKING_ATTENTION',
      'REFUND_MANUAL_REVIEW',
      'RECONCILIATION_EXCEPTION',
      'STALE_SUPPORT_CASE',
      'PENDING_PAYOUT_STALE',
      'FAILED_PAYMENT_ATTENTION',
      'OTHER'
    ]
  },
  severity: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'acknowledged', 'resolved', 'dismissed'],
    default: 'active'
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  // Entity links for direct navigation
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  bookingRef: String,
  supportCaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SupportCase'
  },
  supportCaseRef: String,
  payoutBatchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SettlementBatch'
  },
  payoutBatchRef: String,
  
  // Generic entity mapping if needed
  relatedEntityType: String,
  relatedEntityId: String,
  
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  triggeredAt: {
    type: Date,
    default: Date.now
  },
  acknowledgedAt: Date,
  acknowledgedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff'
  },
  resolvedAt: Date,
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff'
  }
}, {
  timestamps: true
});

// Auto-generate alertRef
alertSchema.pre('validate', async function(next) {
  if (!this.alertRef) {
    const count = await this.constructor.countDocuments();
    this.alertRef = `ALT-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Indexes for common query patterns
alertSchema.index({ status: 1, triggeredAt: -1 });
alertSchema.index({ severity: 1, status: 1 });
alertSchema.index({ type: 1, relatedEntityId: 1 });
alertSchema.index({ bookingId: 1 });
alertSchema.index({ supportCaseId: 1 });

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;
