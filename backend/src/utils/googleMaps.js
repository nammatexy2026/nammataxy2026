import axios from 'axios';
import config from '../config/env.js';
import logger from './logger.js';

const API_KEY = config.maps.googleApiKey;

/**
 * Get distance and duration between two locations using Google Distance Matrix API
 * @param {string} origin - Starting address or coordinates
 * @param {string} destination - Ending address or coordinates
 * @returns {Promise<object>} - { distanceKm: number, durationMin: number }
 */
export const getDistanceMatrix = async (origin, destination) => {
  if (!API_KEY) {
    logger.warn('[GoogleMaps] API Key missing. Returning fallback distance.');
    return { distanceKm: 10, durationMin: 20 }; // Fallback
  }

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        origins: origin,
        destinations: destination,
        key: API_KEY,
        units: 'metric',
      },
    });

    const data = response.data;

    if (data.status !== 'OK' || !data.rows[0].elements[0].distance) {
      logger.error('[GoogleMaps] Distance Matrix failed', { status: data.status, error: data.error_message });
      return { distanceKm: 10, durationMin: 20 };
    }

    const element = data.rows[0].elements[0];
    return {
      distanceKm: element.distance.value / 1000,
      durationMin: Math.ceil(element.duration.value / 60),
    };
  } catch (error) {
    logger.error('[GoogleMaps] Error fetching distance matrix', { error: error.message });
    return { distanceKm: 10, durationMin: 20 };
  }
};

/**
 * Geocode an address into coordinates
 * @param {string} address - Human readable address
 * @returns {Promise<object>} - { lat: number, lng: number }
 */
export const geocodeAddress = async (address) => {
  if (!API_KEY) return null;

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: API_KEY,
      },
    });

    const data = response.data;
    if (data.status === 'OK') {
      return data.results[0].geometry.location;
    }
    return null;
  } catch (error) {
    logger.error('[GoogleMaps] Geocoding error', { error: error.message });
    return null;
  }
};

/**
 * Reverse geocode coordinates into an address
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<string>} - Formatted address
 */
export const reverseGeocode = async (lat, lng) => {
  if (!API_KEY) return null;

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        latlng: `${lat},${lng}`,
        key: API_KEY,
      },
    });

    const data = response.data;
    if (data.status === 'OK') {
      return data.results[0].formatted_address;
    }
    return null;
  } catch (error) {
    logger.error('[GoogleMaps] Reverse geocoding error', { error: error.message });
    return null;
  }
};
