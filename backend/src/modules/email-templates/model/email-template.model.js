import mongoose from 'mongoose';

const emailTemplateSchema = new mongoose.Schema(
  {
    package: {
      type: String,
      required: true,
      trim: true,
    },
    tripType: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('EmailTemplate', emailTemplateSchema);
