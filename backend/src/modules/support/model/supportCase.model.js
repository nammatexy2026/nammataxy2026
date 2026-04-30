import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff'
  },
  authorName: String,
  authorRole: String,
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const supportCaseSchema = new mongoose.Schema({
  caseRef: {
    type: String,
    unique: true,
    required: true
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  bookingRef: String,
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  customerPhone: String,
  category: {
    type: String,
    enum: ['payment', 'refund', 'driver', 'pickup_delay', 'cancellation', 'pricing', 'behavior', 'technical', 'other'],
    default: 'other'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'waiting_customer', 'resolved', 'closed'],
    default: 'open'
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff'
  },
  createdByName: String,
  createdByRole: String,
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff'
  },
  resolvedByName: String,
  resolvedByRole: String,
  resolvedAt: Date,
  closedAt: Date,
  tags: [String],
  notes: [noteSchema],
  latestActivityAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Auto-generate caseRef if not provided
supportCaseSchema.pre('validate', async function(next) {
  if (!this.caseRef) {
    const count = await this.constructor.countDocuments();
    this.caseRef = `SUP-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

// Indexes for common query patterns
supportCaseSchema.index({ status: 1, latestActivityAt: -1 });
supportCaseSchema.index({ priority: 1, status: 1 });
supportCaseSchema.index({ bookingId: 1 });
supportCaseSchema.index({ assignedTo: 1, status: 1 });
supportCaseSchema.index({ createdAt: -1 });

const SupportCase = mongoose.model('SupportCase', supportCaseSchema);

export default SupportCase;
