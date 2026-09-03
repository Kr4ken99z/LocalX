import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Search,
  MapPin,
  ShieldCheck,
  Star,
  ArrowRight,
  Zap,
  CheckCircle2,
  Lock,
  Clock,
  Award,
  Sparkles,
  Users,
  Crosshair,
  Compass,
} from 'lucide-react';
import { detectSmartLocation } from '../utils/locationHelper';
import TrustScoreBadge from '../components/TrustScoreBadge';
import { FALLBACK_CATEGORIES, FALLBACK_PROS } from '../utils/mockData';

export default function HomePage({ selectedCity = 'Kolkata', onSelectCity }) {
  const navigate = useNavigate();
  const [services, setServices] = useState(FALLBACK_CATEGORIES);
  const [featuredPros, setFeaturedPros] = useState(FALLBACK_PROS.slice(0, 4));
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const demoCities = ['Kolkata', 'Bengaluru', 'Delhi NCR', 'Mumbai', 'Hyderabad', 'Chennai', 'Pune'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, prosRes] = await Promise.all([
          axios.get('/api/services').catch(() => null),
          axios.get(`/api/professionals?city=${encodeURIComponent(selectedCity)}&sort=rating`).catch(() => null),
        ]);

        if (servicesRes?.data?.success && servicesRes.data.data?.length > 0) {
          setServices(servicesRes.data.data);
        } else {
          setServices(FALLBACK_CATEGORIES);
        }

        if (prosRes?.data?.success && prosRes.data.data?.length > 0) {
          setFeaturedPros(prosRes.data.data.slice(0, 4));
        } else {
          const cityPros = FALLBACK_PROS.filter(
            (p) => p.location?.city?.toLowerCase() === selectedCity.toLowerCase()
          );
          setFeaturedPros(cityPros.length > 0 ? cityPros.slice(0, 4) : FALLBACK_PROS.slice(0, 4));
        }
      } catch (err) {
        setServices(FALLBACK_CATEGORIES);
        const cityPros = FALLBACK_PROS.filter(
          (p) => p.location?.city?.toLowerCase() === selectedCity.toLowerCase()
        );
        setFeaturedPros(cityPros.length > 0 ? cityPros.slice(0, 4) : FALLBACK_PROS.slice(0, 4));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCity]);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    navigate(`/explore?search=${encodeURIComponent(searchQuery)}&city=${encodeURIComponent(selectedCity)}`);
  };

  const handleUseMyLocation = async () => {
    setIsLocating(true);
    try {
      const loc = await detectSmartLocation();
      if (onSelectCity) onSelectCity(loc.city);
    } catch (e) {
      if (onSelectCity) onSelectCity('Kolkata');
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section matching Screenshot 3 */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-center hero-gradient border-b border-slate-800/60">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-teal-500/40 text-teal-300 text-xs font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span>VERIFIED HYPERLOCAL SERVICES</span>
          </div>

          {/* Main Hero Heading matching Screenshot 3 */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            Trusted local help,{' '}
            <span className="block sm:inline bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
              right at your doorstep.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Connect with background-checked electricians, AC mechanics, plumbers, and cleaning specialists within your neighborhood radius. Transparent pricing, zero guesswork.
          </p>

          {/* Features Highlights row matching Screenshot 3 */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300 font-semibold pt-1">
            <span className="flex items-center gap-1.5 text-teal-400">
              ✓ 100% Background Verified
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              ★ 4.9 Average Rating
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              ⚡ 25-Min Arrival Radius
            </span>
          </div>

          {/* Search Bar matching Screenshot 2 */}
          <form
            onSubmit={handleHeroSearch}
            className="max-w-3xl mx-auto p-2 rounded-2xl bg-[#0b1322]/95 border border-slate-700/90 shadow-2xl flex flex-col md:flex-row items-center gap-2 backdrop-blur-xl"
          >
            {/* Service Input */}
            <div className="flex items-center gap-2.5 flex-1 px-3 py-2 w-full">
              <Search className="w-4 h-4 text-teal-400 shrink-0" />
              <input
                type="text"
                placeholder="What service do you need? (e.g. Electrician, AC Repair)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Location Selector + Use My Location matching user request */}
            <div className="flex items-center gap-2 px-3 py-1.5 border-t md:border-t-0 md:border-l border-slate-800 w-full md:w-auto text-xs shrink-0">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => onSelectCity && onSelectCity(e.target.value)}
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer pr-1"
                aria-label="Location City"
              >
                {demoCities.map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-white font-medium">
                    {c}
                  </option>
                ))}
                {selectedCity && !demoCities.includes(selectedCity) && (
                  <option value={selectedCity} className="bg-slate-900 text-teal-300 font-semibold">
                    📍 {selectedCity}
                  </option>
                )}
              </select>

              {/* Use My Location GPS Icon Button */}
              <button
                type="button"
                onClick={handleUseMyLocation}
                disabled={isLocating}
                title="Use my current GPS location"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/40 text-[11px] font-semibold transition"
              >
                <Crosshair className={`w-3.5 h-3.5 text-teal-400 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Locating...' : 'Use my location'}</span>
              </button>
            </div>

            {/* Find Specialists Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-7 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs transition shadow-lg shadow-teal-500/25 shrink-0"
            >
              Find Specialists
            </button>
          </form>

          {/* Quick Category Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 pt-1">
            <span className="font-medium">Quick suggestions in {selectedCity}:</span>
            {['Electrician', 'AC Deep Clean', 'Plumber', 'Full Cleaning', 'Carpenter'].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/explore?search=${encodeURIComponent(tag)}&city=${encodeURIComponent(selectedCity)}`)}
                className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 hover:text-white transition text-[11px]"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Service Categories */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-400">Comprehensive Directory</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Popular Service Categories</h2>
            <p className="text-xs text-slate-400 mt-1">Choose from vetted specialists available in {selectedCity} today.</p>
          </div>
          <Link
            to={`/explore?city=${encodeURIComponent(selectedCity)}`}
            className="flex items-center gap-1 text-xs font-bold text-teal-400 hover:text-teal-300 transition"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((cat) => (
            <Link
              key={cat._id}
              to={`/explore?service=${encodeURIComponent(cat.slug)}&city=${encodeURIComponent(selectedCity)}`}
              className="glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-between group text-decoration-none min-h-[170px]"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                  {cat.icon || '⚡'}
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-teal-300 transition">{cat.name}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{cat.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-teal-400">Starts at ₹{cat.basePrice}</span>
                <span className="text-slate-400 group-hover:text-white flex items-center gap-0.5 transition font-semibold">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How LocalX Delivers Trust */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800 relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-400">Governance & Reliability</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-3">
              How LocalX Delivers Trust
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every professional is government-verified, scored algorithmically, and backed by administrative mediation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white mb-1">Government ID & License Audit</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                National ID, residence proof, and trade certifications are manually audited in our admin queue before any pro can accept customer bookings.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white mb-1">Deterministic Trust Score</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                An open mathematical scoring system combining verified booking completions, authentic reviews, response velocity, and zero cancellation rate.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white mb-1">Resolution & Dispute Mediation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                If an issue occurs, customers can submit formal dispute mediation with photo evidence for rapid administrative review and resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Verified Specialists */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-400">Neighborhood Champions in {selectedCity}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Verified Pro Spotlight</h2>
          </div>
          <Link
            to={`/explore?city=${encodeURIComponent(selectedCity)}`}
            className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
          >
            <span>See All Specialists</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredPros.map((pro) => (
            <div
              key={pro._id}
              className="glass-panel rounded-2xl p-5 flex flex-col justify-between hover:border-slate-600 transition group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <img
                    src={pro.userId?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={pro.businessName}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500/40 group-hover:scale-105 transition"
                  />
                  <div className="flex flex-col items-end">
                    <span className="flex items-center gap-1 text-xs font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/30">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {pro.rating || 4.8}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">{pro.completedJobs || 50}+ jobs completed</span>
                  </div>
                </div>

                <div className="mb-2">
                  <h3 className="font-extrabold text-sm text-white group-hover:text-teal-300 transition line-clamp-1">
                    {pro.businessName}
                  </h3>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
                    <span className="truncate">{pro.location?.address || selectedCity}</span>
                  </p>
                </div>

                <div className="my-3">
                  <TrustScoreBadge score={pro.trustScore || 85} tier={pro.trustTier || 'Rising Pro'} />
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {pro.tagline || pro.description}
                </p>

                <div className="flex flex-wrap gap-1 mt-3">
                  {pro.skills?.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 text-[10px] rounded-md bg-slate-800 text-slate-300 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Starts from</span>
                  <span className="text-sm font-bold text-teal-400">₹{pro.services?.[0]?.price || 299}</span>
                </div>
                <Link
                  to={`/professionals/${pro._id}`}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-400/10 hover:bg-teal-400 text-teal-300 hover:text-slate-950 font-bold text-xs transition border border-teal-500/30"
                >
                  Book Pro
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner matching Screenshot 3 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/80 via-teal-950/90 to-slate-950 p-8 sm:p-12 border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-xl text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready to discover trusted local help?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Browse top-rated professionals near you in seconds with zero commitment.
            </p>
          </div>

          <Link
            to={`/explore?city=${encodeURIComponent(selectedCity)}`}
            className="px-8 py-3.5 rounded-xl bg-slate-950 hover:bg-teal-400 text-teal-300 hover:text-slate-950 font-extrabold text-xs transition border border-teal-500/40 shadow-lg shrink-0 text-center"
          >
            Explore Now
          </Link>
        </div>
      </section>

      {/* About LocalX / Bottom Description Section (Target of About Menu Link) */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-400">About LocalX</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Hyperlocal Trust, Built From The Ground Up.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              LocalX was born out of a simple observation: finding a dependable electrician, technician, or cleaner in an unfamiliar neighborhood shouldn’t feel like a leap of faith. Like a solitary boat navigating unknown waters guided by a beacon of light, LocalX anchors you to vetted, high-performing independent specialists nearby.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-xs">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
              <h3 className="font-bold text-white text-sm">Strict ID Verification</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Every specialist undergoes rigorous background checks and Aadhaar/Govt ID verification before taking bookings on the network.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
              <h3 className="font-bold text-white text-sm">Escrow Protection</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Payments are held safely in escrow and only disbursed once you confirm job satisfaction with OTP completion codes.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
              <h3 className="font-bold text-white text-sm">Real-Time Dispatch</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Hyperlocal radius tracking connects you to professionals within your immediate postal zone for fast, same-day arrival.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
