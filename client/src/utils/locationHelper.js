/**
 * Smart Location Helper for LocalX
 * Automatically handles geolocation requests.
 * Maps suburban/nearby locations (e.g. Ranaghat, Nadia, suburban Bengal)
 * directly to the primary Kolkata service hub.
 */
export async function detectSmartLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ city: 'Kolkata', coordinates: [22.5726, 88.3639] });
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
          const detectedCity = (address.city || address.town || address.suburb || address.county || '').toLowerCase();
          const state = (address.state || '').toLowerCase();

          // Specific requirement: If user is in Ranaghat, Nadia, or surrounding areas, use Kolkata
          if (
            detectedCity.includes('ranaghat') ||
            detectedCity.includes('nadia') ||
            detectedCity.includes('santipur') ||
            detectedCity.includes('krishnanagar') ||
            detectedCity.includes('chakdaha') ||
            state.includes('bengal') ||
            (latitude >= 22.0 && latitude <= 24.5 && longitude >= 87.0 && longitude <= 89.5)
          ) {
            resolve({
              city: 'Kolkata',
              rawLocation: 'Ranaghat Area',
              mappedNote: 'Mapped to nearest Kolkata Service Hub',
              coordinates: [22.5726, 88.3639],
            });
            return;
          }

          // Otherwise, match nearest metro hub
          const hubs = [
            { city: 'Kolkata', coords: [22.5726, 88.3639] },
            { city: 'Bengaluru', coords: [12.9716, 77.5946] },
            { city: 'Mumbai', coords: [19.0760, 72.8777] },
            { city: 'Delhi NCR', coords: [28.6139, 77.2090] },
            { city: 'Hyderabad', coords: [17.3850, 78.4867] },
            { city: 'Pune', coords: [18.5204, 73.8567] },
          ];

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
            coordinates: closest.coords,
          });
        } catch (e) {
          // Default to Kolkata on network/Nominatim error
          resolve({ city: 'Kolkata', coordinates: [22.5726, 88.3639] });
        }
      },
      (err) => {
        console.warn('Geolocation permission denied or timed out:', err.message);
        // Default to Kolkata
        resolve({ city: 'Kolkata', coordinates: [22.5726, 88.3639] });
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  });
}
