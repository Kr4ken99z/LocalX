import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Search,
  Filter,
  MapPin,
  Star,
  ShieldCheck,
  CheckCircle2,
  Map as MapIcon,
  Grid,
  ArrowUpDown,
  SlidersHorizontal,
  X,
  Crosshair,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { detectSmartLocation } from '../utils/locationHelper';
import TrustScoreBadge from '../components/TrustScoreBadge';
import LeafletMap from '../components/LeafletMap';
import GoogleMapView from '../components/GoogleMapView';
import BookingModal from '../components/BookingModal';
import { FALLBACK_CATEGORIES, FALLBACK_PROS, METROPOLITAN_CITIES } from '../utils/mockData';

const cityCoordinatesMap = {
  Kolkata: [22.5726, 88.3639],
  Bengaluru: [12.9716, 77.5946],
  Mumbai: [19.0760, 72.8777],
  'Delhi NCR': [28.6139, 77.2090],
  Hyderabad: [17.3850, 78.4867],
  Chennai: [13.0827, 80.2707],
  Pune: [18.5204, 73.8567],
  Ahmedabad: [23.0225, 72.5714],
  Jaipur: [26.9124, 75.7873],
  Chandigarh: [30.7333, 76.7794],
  Lucknow: [26.8467, 80.9462],
  Kochi: [9.9312, 76.2673],
};

export default function ExplorePage({ selectedCity = 'Kolkata', onSelectCity }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [professionals, setProfessionals] = useState(FALLBACK_PROS);
  const [services, setServices] = useState(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(false);

  // Filters State
  const initialCity = searchParams.get('city') || selectedCity || 'Kolkata';
  const [city, setCity] = useState(initialCity);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedService, setSelectedService] = useState(searchParams.get('service') || 'all');
  const [radius, setRadius] = useState(25); // km
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('trustScore');
  const [viewMode, setViewMode] = useState('both'); // 'both', 'grid', 'map'
  const [mapCenter, setMapCenter] = useState(cityCoordinatesMap[initialCity] || [22.5726, 88.3639]);
  const [isLocating, setIsLocating] = useState(false);
  const [mapEngine, setMapEngine] = useState('google'); // 'google' | 'osm'

  // Pagination State (Requested by user: 7-8 professionals per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Booking Modal
  const [activeBookingPro, setActiveBookingPro] = useState(null);

  const demoCities = [
    'All Cities',
    'Kolkata',
    'Bengaluru',
    'Delhi NCR',
    'Mumbai',
    'Hyderabad',
    'Chennai',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Chandigarh',
    'Lucknow',
    'Kochi',
  ];

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [city, search, selectedService, minRating, verifiedOnly, sortBy]);

  useEffect(() => {
    if (selectedCity && selectedCity !== city) {
      setCity(selectedCity);
      if (cityCoordinatesMap[selectedCity]) {
        setMapCenter(cityCoordinatesMap[selectedCity]);
      }
    }
  }, [selectedCity]);

  useEffect(() => {
    // Fetch categories
    axios.get('/api/services')
      .then((res) => {
        if (res.data?.success && res.data.data?.length > 0) setServices(res.data.data);
      })
      .catch(() => setServices(FALLBACK_CATEGORIES));
  }, []);

  useEffect(() => {
    const fetchProfessionals = async () => {
      setLoading(true);
      try {
        const params = {
          city: city !== 'all' && city !== 'All Cities' ? city : undefined,
          search: search || undefined,
          service: selectedService !== 'all' ? selectedService : undefined,
          rating: minRating > 0 ? minRating : undefined,
          verifiedOnly: verifiedOnly ? 'true' : undefined,
          sort: sortBy,
        };

        const res = await axios.get('/api/professionals', { params }).catch(() => null);
        if (res?.data?.success && res.data.data?.length > 0) {
          setProfessionals(res.data.data);
        } else {
          // Filter fallback data client-side by city & criteria
          let list = [...FALLBACK_PROS];
          if (city && city !== 'All Cities' && city !== 'all') {
            list = list.filter((p) => p.location?.city?.toLowerCase() === city.toLowerCase());
          }
          if (verifiedOnly) list = list.filter((p) => p.verificationStatus === 'VERIFIED');
          if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
          if (selectedService !== 'all') {
            list = list.filter((p) => p.services?.some((s) => s.slug === selectedService) || p.skills?.includes(selectedService));
          }
          if (search) {
            const q = search.toLowerCase();
            list = list.filter((p) => p.businessName?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
          }
          setProfessionals(list);
        }
      } catch (err) {
        let list = [...FALLBACK_PROS];
        if (city && city !== 'All Cities' && city !== 'all') {
          list = list.filter((p) => p.location?.city?.toLowerCase() === city.toLowerCase());
        }
        setProfessionals(list);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, [city, search, selectedService, minRating, verifiedOnly, sortBy]);

  // Sync city coordinates when city changes
  useEffect(() => {
    if (cityCoordinatesMap[city]) {
      setMapCenter(cityCoordinatesMap[city]);
    }
  }, [city]);

  const handleUseMyLocation = async () => {
    setIsLocating(true);
    try {
      const loc = await detectSmartLocation();
      setCity(loc.city);
      setMapCenter(loc.coordinates);
      if (onSelectCity) onSelectCity(loc.city);

      // Attempt nearby query around coordinates
      const [lat, lng] = loc.coordinates;
      const res = await axios.get(`/api/professionals/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
      if (res.data.success && res.data.data.length > 0) {
        setProfessionals(res.data.data);
      }
    } catch (e) {
      setCity('Kolkata');
      setMapCenter(cityCoordinatesMap['Kolkata']);
    } finally {
      setIsLocating(false);
    }
  };

  // Calculate Pagination
  const totalPages = Math.max(1, Math.ceil(professionals.length / itemsPerPage));
  const paginatedPros = professionals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Helper to generate pagination with ellipsis/dots (e.g. 1 2 3 4 5 ... 14)
  const getPaginationItems = (current, total) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 4) {
      return [1, 2, 3, 4, 5, '...', total];
    }
    if (current >= total - 3) {
      return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    }
    return [1, '...', current - 1, current, current + 1, '...', total];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Explore Hero Banner (Matching User's Boat & Beacon Metaphor) */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-700/60 bg-[#0c1424]/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        {/* Ambient ray light glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 50% -20%, rgba(245, 158, 11, 0.28) 0%, rgba(245, 158, 11, 0.06) 45%, transparent 75%)',
          }}
        />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] font-bold text-amber-300 tracking-[0.25em] uppercase block">
              YOU HAVE ARRIVED · LOCALX IS HERE
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Somewhere unknown?<br />
              <span className="text-teal-400">Start with LocalX.</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              When every street feels unfamiliar, LocalX becomes your local signal. Like a lone boat navigating dark waters guided by a beacon of light, LocalX connects you to verified specialists so you never feel lost.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-teal-500/50 text-teal-300 text-xs font-bold shadow-inner">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                YOUR LOCAL SIGNAL IS ACTIVE
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                SCROLL TO DISCOVER TRUSTED HELP
              </span>
            </div>
          </div>

          {/* Boat & Beacon Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl group bg-slate-950">
              <img
                src="/localx-boat.png"
                alt="Solitary boat illuminated by LocalX golden beacon in unknown waters"
                className="w-full h-48 sm:h-56 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1424] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-amber-200/90 font-medium bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/20">
                <span className="font-semibold">🧭 In Unknown Waters · Guided by LocalX</span>
                <span className="text-teal-300 font-bold">{professionals.length} Pros</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Discovery Heading */}
      <div className="space-y-1">
        <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-widest block">
          SERVICE DISCOVERY
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Find trusted help near you.
        </h2>
        <p className="text-xs text-slate-400 max-w-2xl">
          Search verified professionals by distance, service, rating, price, and availability. Your coordinates are used only to find nearby providers.
        </p>
      </div>

      {/* Top Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-teal-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by specialist name, skills, or service title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto text-xs">
            {/* City Selector */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  if (onSelectCity) onSelectCity(e.target.value);
                }}
                aria-label="Location City"
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer pr-1"
              >
                <option value="all">All Locations</option>
                {demoCities.map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-white font-medium">
                    {c}
                  </option>
                ))}
                {city && !demoCities.includes(city) && city !== 'all' && (
                  <option value={city} className="bg-slate-900 text-teal-300 font-semibold">
                    📍 {city}
                  </option>
                )}
              </select>
            </div>

            {/* Use My Location Button */}
            <button
              type="button"
              onClick={handleUseMyLocation}
              disabled={isLocating}
              title="Detect and center map on my GPS location"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/40 text-teal-300 font-bold transition shrink-0"
            >
              <Crosshair className={`w-3.5 h-3.5 text-teal-400 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Locating...' : 'Use my location'}</span>
            </button>

            {/* Verified Only Toggle */}
            <button
              type="button"
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition ${
                verifiedOnly
                  ? 'bg-teal-500/20 border-teal-500/50 text-teal-300 font-semibold'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Verified Only</span>
            </button>

            {/* Rating Filter */}
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              aria-label="Filter by minimum rating"
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-teal-400"
            >
              <option value={0}>All Ratings</option>
              <option value={4.5}>4.5★ and above</option>
              <option value={4.0}>4.0★ and above</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort professionals by"
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-teal-400"
            >
              <option value="trustScore">Highest Trust Score</option>
              <option value="rating">Top Customer Rating</option>
              <option value="experience">Years of Experience</option>
              <option value="reviews">Most Reviewed</option>
            </select>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center rounded-xl bg-slate-950 border border-slate-800 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-slate-800 text-teal-400' : 'text-slate-400'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-lg ${viewMode === 'map' ? 'bg-slate-800 text-teal-400' : 'text-slate-400'}`}
                title="Map View"
              >
                <MapIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('both')}
                className={`p-1.5 rounded-lg ${viewMode === 'both' ? 'bg-slate-800 text-teal-400' : 'text-slate-400'}`}
                title="Split Map & Grid"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedService('all')}
            className={`px-3 py-1 rounded-full font-medium shrink-0 transition ${
              selectedService === 'all'
                ? 'bg-teal-400 text-slate-950 font-bold'
                : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            All Services
          </button>
          {services.map((s) => (
            <button
              key={s._id}
              onClick={() => setSelectedService(s.slug)}
              className={`px-3 py-1 rounded-full font-medium shrink-0 transition flex items-center gap-1.5 ${
                selectedService === s.slug
                  ? 'bg-teal-400 text-slate-950 font-bold'
                  : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span>{s.icon}</span>
              <span>{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`grid gap-6 ${viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
        {/* Map Column (if 'map' or 'both') */}
        {(viewMode === 'both' || viewMode === 'map') && (
          <div className={viewMode === 'both' ? 'lg:col-span-5 order-2 lg:order-1' : 'w-full'}>
            <div className="sticky top-28 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="font-semibold text-slate-300">
                  {mapEngine === 'google' ? 'Google Maps Live' : 'OpenStreetMap'}{' '}
                  <span className="text-slate-500 font-normal">({city === 'all' ? 'All India' : city})</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-teal-400 font-bold">{professionals.length} specialists</span>
                  <div className="flex items-center rounded-lg bg-slate-950 border border-slate-800 p-0.5 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setMapEngine('google')}
                      className={`px-2 py-0.5 rounded font-bold transition ${
                        mapEngine === 'google'
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Google
                    </button>
                    <button
                      type="button"
                      onClick={() => setMapEngine('osm')}
                      className={`px-2 py-0.5 rounded font-bold transition ${
                        mapEngine === 'osm'
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      OSM
                    </button>
                  </div>
                </div>
              </div>

              {mapEngine === 'google' ? (
                <GoogleMapView
                  professionals={professionals}
                  center={mapCenter}
                  zoom={12}
                  height={viewMode === 'map' ? '650px' : '550px'}
                />
              ) : (
                <LeafletMap
                  professionals={professionals}
                  center={mapCenter}
                  zoom={12}
                  height={viewMode === 'map' ? '650px' : '550px'}
                />
              )}
            </div>
          </div>
        )}

        {/* Professionals Grid Column */}
        {(viewMode === 'both' || viewMode === 'grid') && (
          <div className={viewMode === 'both' ? 'lg:col-span-7 order-1 lg:order-2 space-y-4' : 'space-y-4'}>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <p>
                Showing <strong className="text-white">{professionals.length}</strong> verified specialists in{' '}
                <span className="text-teal-400 font-semibold">{city === 'all' ? 'All Locations' : city}</span>
              </p>
              {totalPages > 1 && (
                <span className="text-[11px] text-slate-400 font-semibold bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="glass-panel p-5 rounded-2xl animate-pulse h-36"></div>
                ))}
              </div>
            ) : professionals.length === 0 ? (
              <div className="glass-panel p-12 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base">No specialists found in {city}</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try switching to another city (like Kolkata or Bengaluru) or resetting filters.
                </p>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      setCity('Kolkata');
                      setSearch('');
                      setSelectedService('all');
                      setMinRating(0);
                      setVerifiedOnly(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-teal-400 text-slate-950 text-xs font-bold shadow"
                  >
                    View Kolkata Specialists
                  </button>
                  <button
                    onClick={() => {
                      setCity('all');
                      setSearch('');
                      setSelectedService('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                  >
                    View All
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {paginatedPros.map((pro) => (
                    <div
                      key={pro._id}
                      className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col sm:flex-row justify-between gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={pro.userId?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                          alt={pro.businessName}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500/30 shrink-0"
                        />
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <Link
                              to={`/professionals/${pro._id}`}
                              className="font-extrabold text-white text-sm hover:text-teal-300 transition"
                            >
                              {pro.businessName}
                            </Link>
                            {pro.verificationStatus === 'VERIFIED' && (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/30">
                                <CheckCircle2 className="w-3 h-3" />
                                VERIFIED PRO
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-300 line-clamp-1">{pro.tagline || pro.description}</p>

                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                            <span className="flex items-center gap-1 font-semibold text-amber-400">
                              <Star className="w-3 h-3 fill-amber-400" />
                              {pro.rating || 4.8} ({pro.totalReviews || 12} reviews)
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-teal-400" />
                              {pro.location?.address || pro.location?.city || 'Kolkata'}
                            </span>
                            <span>•</span>
                            <span>{pro.experienceYears || 5} yrs exp</span>
                          </div>

                          <div className="pt-1">
                            <TrustScoreBadge score={pro.trustScore || 85} tier={pro.trustTier || 'Rising Pro'} />
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800 gap-2 shrink-0">
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] text-slate-400 block">Starting at</span>
                          <span className="text-lg font-extrabold text-teal-400">
                            ₹{pro.services?.[0]?.price || 299}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/professionals/${pro._id}`}
                            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-semibold transition"
                          >
                            Profile
                          </Link>
                          <button
                            onClick={() => setActiveBookingPro(pro)}
                            className="px-3.5 py-1.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold transition shadow-md shadow-teal-500/20"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls (Pages 1 to 5+) */}
                {totalPages > 1 && (
                  <div className="pt-4 pb-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-400">
                      Showing <strong className="text-white">{(currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
                      <strong className="text-white">{Math.min(currentPage * itemsPerPage, professionals.length)}</strong> of{' '}
                      <strong className="text-teal-400">{professionals.length}</strong> specialists
                    </p>

                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      {/* Previous Page */}
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentPage((p) => Math.max(1, p - 1));
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Prev</span>
                      </button>

                      {/* Numbered Page Buttons with Dots */}
                      {getPaginationItems(currentPage, totalPages).map((item, idx) => {
                        if (item === '...') {
                          return (
                            <span
                              key={`dots-${idx}`}
                              className="w-7 h-8 flex items-center justify-center text-slate-500 font-extrabold select-none text-xs"
                            >
                              …
                            </span>
                          );
                        }
                        const pageNum = Number(item);
                        return (
                          <button
                            key={pageNum}
                            type="button"
                            onClick={() => {
                              setCurrentPage(pageNum);
                              window.scrollTo({ top: 350, behavior: 'smooth' });
                            }}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center transition font-bold text-xs ${
                              currentPage === pageNum
                                ? 'bg-teal-400 text-slate-950 font-black shadow-lg shadow-teal-500/25 scale-105'
                                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      {/* Next Page */}
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition flex items-center gap-1"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {activeBookingPro && (
        <BookingModal
          professional={activeBookingPro}
          onClose={() => setActiveBookingPro(null)}
          onSuccess={() => setActiveBookingPro(null)}
        />
      )}
    </div>
  );
}
