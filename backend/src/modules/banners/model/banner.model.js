import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: '/user',
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    order: {
      type: Number,
      default: 0,
    },
    badge: {
      type: String,
      trim: true,
    },
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model('Banner', bannerSchema);
