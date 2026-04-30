import Pricing from '../model/pricing.model.js';
import { AppError } from '../../../utils/AppError.js';

export async function createPricing(data) {
  // Check if pricing already exists for this combination
  const existing = await Pricing.findOne({
    serviceType: data.serviceType,
    tripMode: data.tripMode,
    vehicleCategoryId: data.vehicleCategoryId,
  });

  if (existing) {
    throw AppError.conflict('Pricing rule for this service, mode, and vehicle already exists');
  }

  const pricing = await Pricing.create(data);
  return pricing;
}

export async function getAllPricing(filters = {}) {
  // Populate vehicle category details so it's readable
  return Pricing.find(filters).populate('vehicleCategoryId', 'name seats image');
}

export async function getPricingById(id) {
  const pricing = await Pricing.findById(id).populate('vehicleCategoryId', 'name seats image');
  if (!pricing) {
    throw AppError.notFound('Pricing rule not found');
  }
  return pricing;
}

export async function updatePricing(id, data) {
  const pricing = await Pricing.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate('vehicleCategoryId', 'name seats image');

  if (!pricing) {
    throw AppError.notFound('Pricing rule not found');
  }

  return pricing;
}
