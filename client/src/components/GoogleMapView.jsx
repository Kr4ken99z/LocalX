import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Star } from 'lucide-react';
import LeafletMap from './LeafletMap';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAhxfvmKYmadLCTMLxmoDJveJDc-sTgkPc';

// Custom Dark Night Mode Styling for Google Maps matching LocalX theme
const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#080f1c' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#080f1c' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8fa0bd' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#2dd4bf' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#64748b' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#0d1d2d' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#162238' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#0b1626' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#94a3b8' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#1e3a5f' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#0f2238' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#111e33' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#050b14' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#38bdf8' }],
  },
];

export default function GoogleMapView({ professionals = [], center = [22.5726, 88.3639], zoom = 12, height = '450px' }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [loadError, setLoadError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if script already loaded
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    const scriptId = 'google-maps-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      script.onerror = () => setLoadError(true);
      document.head.appendChild(script);
    } else {
      const checkTimer = setInterval(() => {
        if (window.google && window.google.maps) {
          setIsLoaded(true);
          clearInterval(checkTimer);
        }
      }, 200);
      return () => clearInterval(checkTimer);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.google) return;

    const [lat, lng] = Array.isArray(center) ? center : [22.5726, 88.3639];

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: Number(lat) || 22.5726, lng: Number(lng) || 88.3639 },
        zoom: zoom || 12,
        styles: darkMapStyle,
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
      });
    } else {
      mapInstanceRef.current.panTo({ lat: Number(lat) || 22.5726, lng: Number(lng) || 88.3639 });
    }

    // Clear old markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    const infoWindow = new window.google.maps.InfoWindow();

    professionals.forEach((pro) => {
      const coords = pro.location?.coordinates;
      if (!coords || coords.length !== 2) return;
      // Coordinates are [lng, lat]
      const proLat = Number(coords[1]);
      const proLng = Number(coords[0]);
      if (isNaN(proLat) || isNaN(proLng)) return;

      const marker = new window.google.maps.Marker({
        position: { lat: proLat, lng: proLng },
        map: mapInstanceRef.current,
        title: pro.businessName,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 9,
          fillColor: '#2dd4bf',
          fillOpacity: 1,
          strokeColor: '#080f1c',
          strokeWeight: 2,
        },
      });

      marker.addListener('click', () => {
        const content = `
          <div style="background:#0b1322;color:#fff;padding:12px;border-radius:12px;max-width:240px;font-family:sans-serif;font-size:12px;line-height:1.4;">
            <div style="color:#2dd4bf;font-size:10px;font-weight:bold;text-transform:uppercase;margin-bottom:2px;">
              ⚡ ${pro.trustTier || 'Verified Pro'}
            </div>
            <div style="font-weight:bold;font-size:13px;margin-bottom:4px;color:#fff;">${pro.businessName}</div>
            <div style="color:#94a3b8;font-size:11px;margin-bottom:6px;">${pro.location?.address || pro.location?.city || 'Kolkata'}</div>
            <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #1e293b;padding-top:6px;">
              <span style="color:#fbbf24;font-weight:bold;">★ ${pro.rating || 4.9}</span>
              <a href="/profile/${pro._id}" style="color:#2dd4bf;text-decoration:none;font-weight:bold;">Book Service &rarr;</a>
            </div>
          </div>
        `;
        infoWindow.setContent(content);
        infoWindow.open(mapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
    });
  }, [isLoaded, professionals, center, zoom]);

  if (loadError) {
    return <LeafletMap professionals={professionals} center={center} zoom={zoom} height={height} />;
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl" style={{ height }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%', backgroundColor: '#080f1c' }} />
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#080f1c] flex items-center justify-center text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
            <span>Connecting to Google Maps Real-Time Engine...</span>
          </div>
        </div>
      )}
      <div className="absolute bottom-2 right-2 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800 text-[10px] text-teal-300 font-bold flex items-center gap-1 z-10 pointer-events-none">
        <span>📍 Google Maps Live</span>
      </div>
    </div>
  );
}
