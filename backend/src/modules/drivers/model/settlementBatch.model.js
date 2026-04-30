import mongoose from 'mongoose';

const settlementBatchSchema = new mongoose.Schema(
  {
    batchRef: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['draft', 'processed', 'cancelled'],
      default: 'draft',
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    totalTrips: {
      type: Number,
      required: true,
      default: 0,
    },
    earningIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DriverEarning',
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: true,
    },
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
    },
    processedAt: Date,
    notes: String,
  },
  { timestamps: true }
);

// Helper to generate batch reference
settlementBatchSchema.statics.generateBatchRef = function() {
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `PAY-${timestamp}-${random}`;
};

export default mongoose.model('SettlementBatch', settlementBatchSchema);
