import Quote from '../model/quote.model.js';
import Pricing from '../../pricing/model/pricing.model.js';
import VehicleCategory from '../../vehicle-categories/model/vehicleCategory.model.js';
import { AppError } from '../../../utils/AppError.js';
import * as mapService from '../../../integrations/maps/mapService.js';

/**
 * Calculates a fallback distance if actual map routing is not available.
 * This is a temporary placeholder strategy.
 */
function estimateDistance(serviceType, tripMode) {
  if (serviceType === 'airport') return 40; // Default airport distance
  if (serviceType === 'outstation') {
    return tripMode === 'roundtrip' ? 600 : 300; // Default outstation distance
  }
  return 0; // Tours usually use package pricing, not purely distance
}

export async function createQuote(data) {
  const { serviceType, tripMode, pickupLocation, dropLocation } = data;

  // 1. Fetch active pricing rules for this service and mode
  const pricingRules = await Pricing.find({
    serviceType,
    tripMode,
    isActive: true,
  }).populate('vehicleCategoryId');

  if (!pricingRules.length) {
    throw AppError.notFound('No services currently available for this route/mode');
  }

  // 2. Resolve distance and duration (Maps Provider vs Fallback)
  let distanceKm = 0;
  let estimatedDuration = 0;
  let quoteSource = 'fallback';

  if (serviceType === 'tours') {
    quoteSource = 'package';
  } else {
    const routeData = await mapService.getDistanceAndDuration(pickupLocation, dropLocation);
    
    if (routeData) {
      distanceKm = routeData.distanceKm;
      estimatedDuration = routeData.durationMins;
      quoteSource = 'provider';
    } else {
      distanceKm = estimateDistance(serviceType, tripMode);
      quoteSource = 'fallback';
    }
  }
  
  // 2. Compute fares for each available vehicle category
  const availableCategories = pricingRules.map((rule) => {
    const category = rule.vehicleCategoryId;
    if (!category || !category.isActive) return null;

    let computedFare = 0;
    let baseFare = rule.baseFare || 0;
    let perKmRate = rule.perKmRate || 0;
    let driverAllowance = rule.driverAllowance || 0;

    if (serviceType === 'tours') {
      // Tours usually use a fixed package price
      computedFare = rule.packagePrice || baseFare;
    } else {
      // Basic distance computation
      const billableKm = Math.max(distanceKm, rule.minimumKm || 0);
      computedFare = baseFare + (billableKm * perKmRate) + driverAllowance;
      
      // If outstation roundtrip, driver allowance is per day (assuming 1 day for simplicity here)
      if (serviceType === 'outstation' && tripMode === 'roundtrip') {
        // Just an example logic for roundtrip
        computedFare += driverAllowance * 1; 
      }
    }

    return {
      vehicleCategoryId: category._id,
      categoryName: category.name,
      seats: category.seats,
      luggage: category.luggage,
      ac: category.ac,
      image: category.image,
      baseDisplayPrice: category.baseDisplayPrice,
      computedFare,
      breakdown: {
        baseFare,
        perKmRate,
        driverAllowance,
      },
    };
  }).filter(Boolean);

  if (availableCategories.length === 0) {
    throw AppError.notFound('No vehicle categories available for this service');
  }

  // 3. Save quote (expires in 30 mins)
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
  
  const quote = await Quote.create({
    ...data,
    distanceKm,
    estimatedDuration,
    quoteSource,
    availableCategories,
    expiresAt,
  });

  return quote;
}

export async function getQuoteById(id) {
  const quote = await Quote.findById(id);
  if (!quote) {
    throw AppError.notFound('Quote not found or expired');
  }
  return quote;
}
