import * as pricingService from '../service/pricing.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';

export async function createPricing(req, res) {
  const pricing = await pricingService.createPricing(req.body);
  return sendSuccess(res, {
    status: 201,
    message: 'Pricing rule created',
    data: pricing,
  });
}

export async function getAllPricing(req, res) {
  const filters = {};
  if (req.query.serviceType) filters.serviceType = req.query.serviceType;
  if (req.query.vehicleCategoryId) filters.vehicleCategoryId = req.query.vehicleCategoryId;

  const pricings = await pricingService.getAllPricing(filters);
  return sendSuccess(res, {
    message: 'Pricing rules retrieved',
    data: pricings,
  });
}

export async function getPricing(req, res) {
  const pricing = await pricingService.getPricingById(req.params.id);
  return sendSuccess(res, {
    message: 'Pricing rule retrieved',
    data: pricing,
  });
}

export async function updatePricing(req, res) {
  const pricing = await pricingService.updatePricing(req.params.id, req.body);
  return sendSuccess(res, {
    message: 'Pricing rule updated',
    data: pricing,
  });
}
