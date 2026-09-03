import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Star, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

// Fix Leaflet's default marker icon issue with bundlers
delete L.Icon.Default.prototype._getIconUrl;

// Custom SVG map pin for LocalX pros
const customIcon = new L.DivIcon({
  className: 'custom-pro-pin',
  html: `<div style="
    background: #080f1c;
    border: 2px solid #2dd4bf;
    color: #2dd4bf;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 14px;
    box-shadow: 0 0 15px rgba(45, 212, 191, 0.6);
  ">⚡</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -18],
});

function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center.length === 2 && !isNaN(center[0]) && !isNaN(center[1])) {
      map.setView(center, zoom || 12);
    }
  }, [center, zoom, map]);
  return null;
}

export default function LeafletMap({ professionals = [], center = [12.9716, 77.5946], zoom = 12, height = '450px' }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl" style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', backgroundColor: '#080f1c' }}
      >
        <MapUpdater center={center} zoom={zoom} />
        {/* Sleek Dark-Themed Tiles (100% Free & No API Key Watermarks) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="dark-map-tiles"
        />

        {professionals.map((pro) => {
          const coords = pro.location?.coordinates;
          if (!coords || coords.length < 2) return null;
          // In GeoJSON: [lng, lat] -> Leaflet requires [lat, lng]
          const position = [coords[1], coords[0]];

          return (
            <Marker key={pro._id} position={position} icon={customIcon}>
              <Popup className="localx-popup">
                <div className="p-1 min-w-[200px] text-slate-900">
                  <div className="flex items-center gap-2 mb-1.5">
                    <img
                      src={pro.userId?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt={pro.businessName}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-xs leading-tight">{pro.businessName}</h4>
                      <p className="text-[10px] text-slate-600">{pro.location?.address || 'Bengaluru'}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] mb-2 bg-slate-100 p-1.5 rounded">
                    <span className="flex items-center gap-1 font-semibold text-amber-600">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {pro.rating || '4.8'}
                    </span>
                    <span className="flex items-center gap-0.5 text-teal-700 font-bold">
                      <ShieldCheck className="w-3 h-3" />
                      {pro.trustScore || 85} Trust
                    </span>
                  </div>

                  <Link
                    to={`/professionals/${pro._id}`}
                    className="block text-center py-1 px-2 bg-slate-900 text-teal-300 hover:bg-teal-600 hover:text-white rounded text-[11px] font-bold transition"
                  >
                    View Services & Book →
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
