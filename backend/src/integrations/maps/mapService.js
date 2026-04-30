import config from '../../config/env.js';

/**
 * Fetches distance and duration from Google Maps Distance Matrix API.
 * 
 * @param {string} origin - The pickup location text/address
 * @param {string} destination - The drop location text/address
 * @returns {Promise<{distanceKm: number, durationMins: number, status: string} | null>}
 */
export async function getDistanceAndDuration(origin, destination) {
  if (!origin || !destination) {
    return null;
  }

  const apiKey = config.maps.googleApiKey;
  if (!apiKey) {
    console.warn('MAPS: Google Maps API Key not configured. Using fallback estimation.');
    return null;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    
    // Set a 5-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    const data = await response.json();

    if (data.status !== 'OK') {
      console.warn(`MAPS: API returned status ${data.status} - ${data.error_message || ''}`);
      return null;
    }

    const element = data.rows?.[0]?.elements?.[0];
    
    if (!element || element.status !== 'OK') {
      console.warn(`MAPS: Route calculation failed for given locations. Status: ${element?.status}`);
      return null;
    }

    // value is in meters, convert to km
    const distanceKm = element.distance.value / 1000;
    // value is in seconds, convert to minutes
    const durationMins = Math.round(element.duration.value / 60);

    return {
      distanceKm,
      durationMins,
      status: 'OK'
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn('MAPS: Provider request timed out after 5 seconds.');
    } else {
      console.error('MAPS: Provider integration error:', error.message);
    }
    return null; // Gracefully fail back
  }
}
