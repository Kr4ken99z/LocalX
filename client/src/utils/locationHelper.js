/**
 * Smart Location Helper for LocalX
 * Automatically handles geolocation requests.
 * Maps suburban/nearby locations (e.g. Ranaghat, Nadia, suburban Bengal)
 * directly to the primary Kolkata service hub with redirect notifications.
 */
export async function detectSmartLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        city: 'Kolkata',
        rawLocation: 'Default Location',
        isRedirected: false,
        coordinates: [22.5726, 88.3639],
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Reverse geocode via OpenStreetMap Nominatim
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            { headers: { 'Accept-Language': 'en' } }
          );
          const data = await res.json();
          const address = data.address || {};
          const detectedCity = (
            address.city ||
            address.town ||
            address.suburb ||
            address.village ||
            address.county ||
            'Ranaghat'
          ).toLowerCase();
          const state = (address.state || '').toLowerCase();

          // 12 Primary Metro Hubs
          const hubs = [
            { city: 'Kolkata', coords: [22.5726, 88.3639], keywords: ['kolkata', 'calcutta', 'howrah', 'salt lake', 'new town'] },
            { city: 'Bengaluru', coords: [12.9716, 77.5946], keywords: ['bengaluru', 'bangalore', 'whitefield', 'koramangala'] },
            { city: 'Mumbai', coords: [19.076, 72.8777], keywords: ['mumbai', 'bombay', 'thane', 'navi mumbai'] },
            { city: 'Delhi NCR', coords: [28.6139, 77.209], keywords: ['delhi', 'noida', 'gurgaon', 'gurugram', 'faridabad', 'ghaziabad'] },
            { city: 'Hyderabad', coords: [17.385, 78.4867], keywords: ['hyderabad', 'secunderabad', 'cyberabad'] },
            { city: 'Chennai', coords: [13.0827, 80.2707], keywords: ['chennai', 'madras'] },
            { city: 'Pune', coords: [18.5204, 73.8567], keywords: ['pune', 'pcmc'] },
            { city: 'Ahmedabad', coords: [23.0225, 72.5714], keywords: ['ahmedabad', 'gandhinagar'] },
            { city: 'Jaipur', coords: [26.9124, 75.7873], keywords: ['jaipur'] },
            { city: 'Chandigarh', coords: [30.7333, 76.7794], keywords: ['chandigarh', 'mohali', 'panchkula'] },
            { city: 'Lucknow', coords: [26.8467, 80.9462], keywords: ['lucknow'] },
            { city: 'Surat', coords: [21.1702, 72.8311], keywords: ['surat'] },
          ];

          // Check direct match
          const exactMatch = hubs.find((h) => h.keywords.some((k) => detectedCity.includes(k)));
          if (exactMatch) {
            resolve({
              city: exactMatch.city,
              rawLocation: address.city || address.town || exactMatch.city,
              isRedirected: false,
              coordinates: [latitude, longitude],
            });
            return;
          }

          // Format clean raw city name (capitalize)
          const rawCityName =
            detectedCity.charAt(0).toUpperCase() + detectedCity.slice(1) || 'Ranaghat';

          // Specific Bengal/Nadia/Ranaghat check or nearest distance match
          if (
            detectedCity.includes('ranaghat') ||
            detectedCity.includes('nadia') ||
            detectedCity.includes('santipur') ||
            detectedCity.includes('krishnanagar') ||
            detectedCity.includes('kalyani') ||
            detectedCity.includes('chakdaha') ||
            state.includes('bengal') ||
            (latitude >= 21.5 && latitude <= 25.0 && longitude >= 86.5 && longitude <= 89.5)
          ) {
            resolve({
              city: 'Kolkata',
              rawLocation: rawCityName || 'Ranaghat',
              isRedirected: true,
              redirectReason: `No local professionals found in ${rawCityName || 'Ranaghat'}.`,
              nearestCity: 'Kolkata',
              coordinates: [22.5726, 88.3639],
            });
            return;
          }

          // Distance-based nearest metro calculation
          let closest = hubs[0];
          let minD = Infinity;
          for (const h of hubs) {
            const d = Math.hypot(latitude - h.coords[0], longitude - h.coords[1]);
            if (d < minD) {
              minD = d;
              closest = h;
            }
          }

          resolve({
            city: closest.city,
            rawLocation: rawCityName,
            isRedirected: true,
            redirectReason: `No local professionals found in ${rawCityName}.`,
            nearestCity: closest.city,
            coordinates: closest.coords,
          });
        } catch (e) {
          resolve({
            city: 'Kolkata',
            rawLocation: 'Ranaghat',
            isRedirected: true,
            redirectReason: 'No local professionals found in Ranaghat.',
            nearestCity: 'Kolkata',
            coordinates: [22.5726, 88.3639],
          });
        }
      },
      (err) => {
        console.warn('Geolocation error / fallback to Kolkata:', err.message);
        resolve({
          city: 'Kolkata',
          rawLocation: 'Ranaghat',
          isRedirected: true,
          redirectReason: 'GPS location mapped to primary service hub.',
          nearestCity: 'Kolkata',
          coordinates: [22.5726, 88.3639],
        });
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  });
}
