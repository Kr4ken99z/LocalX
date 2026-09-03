import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Zap,
  MapPin,
  Search,
  MessageSquare,
  Calendar,
  Shield,
  Briefcase,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Crosshair,
  ExternalLink,
  ArrowRight,
  ArrowDown,
} from 'lucide-react';
import { detectSmartLocation } from '../utils/locationHelper';

export default function Navbar({ selectedCity = 'Kolkata', onSelectCity, onUseMyLocation }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const cities = ['Kolkata', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune'];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}&city=${selectedCity}`);
    }
  };

  const handleUseMyLocation = async () => {
    setIsLocating(true);
    try {
      const loc = await detectSmartLocation();
      if (onSelectCity) onSelectCity(loc.city);
      if (onUseMyLocation) onUseMyLocation(loc);
    } catch (e) {
      if (onSelectCity) onSelectCity('Kolkata');
    } finally {
      setIsLocating(false);
    }
  };

  const navigateAndScroll = (hashId) => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(hashId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#' + hashId);
      setTimeout(() => {
        const el = document.getElementById(hashId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#080f1c]/90 border-b border-slate-800/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Brand Logo & Location */}
            <div className="flex items-center gap-4 sm:gap-5">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
                  <Zap className="w-5 h-5 text-slate-950 fill-slate-950" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl tracking-tight text-white flex items-center">
                    Local<span className="text-teal-400">X</span>
                  </span>
                  <span className="text-[10px] text-teal-400/80 tracking-wider -mt-1 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                    Hyperlocal Network
                  </span>
                </div>
              </Link>

              {/* City Selector with "Use my location" button */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs shadow-inner">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => onSelectCity && onSelectCity(e.target.value)}
                  aria-label="Select City"
                  className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer pr-1"
                >
                  {cities.map((city) => (
                    <option key={city} value={city} className="bg-slate-900 text-white font-medium">
                      {city}
                    </option>
                  ))}
                  {selectedCity && !cities.includes(selectedCity) && (
                    <option value={selectedCity} className="bg-slate-900 text-teal-300 font-semibold">
                      📍 {selectedCity}
                    </option>
                  )}
                </select>

                {/* Use my location button */}
                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  disabled={isLocating}
                  title="Detect and use my current GPS location"
                  className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[11px] font-semibold transition shrink-0"
                >
                  <Crosshair className={`w-3 h-3 text-teal-400 ${isLocating ? 'animate-spin' : ''}`} />
                  <span className="hidden md:inline">{isLocating ? 'Locating...' : 'Use my location'}</span>
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex flex-1 max-w-md relative">
              <input
                type="text"
                placeholder="What service do you need? (e.g. Electrician, AC Repair)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition"
              />
              <Search className="w-4 h-4 text-teal-400 absolute left-3 top-2.5" />
            </form>

            {/* Navigation & Actions */}
            <div className="flex items-center gap-3">
              {/* Menu Drawer Toggle Button - Hidden on explore professional page per request */}
              {!location.pathname.startsWith('/explore') && (
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-slate-600 text-slate-200 text-xs font-semibold transition"
                >
                  {menuOpen ? <X className="w-4 h-4 text-teal-400" /> : <Menu className="w-4 h-4 text-teal-400" />}
                  <span>Menu</span>
                </button>
              )}

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 transition"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover border border-teal-500/50"
                    />
                    <div className="hidden sm:flex flex-col text-left">
                      <span className="text-xs font-semibold text-white truncate max-w-[100px]">{user.name}</span>
                      <span className="text-[10px] uppercase text-teal-400 font-bold">{user.role}</span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {profileDropdown && (
                    <div
                      className="absolute right-0 mt-2 w-56 p-2 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl z-50 text-xs"
                      onClick={() => setProfileDropdown(false)}
                    >
                      <div className="px-3 py-2 border-b border-slate-800 mb-1">
                        <p className="font-semibold text-white">{user.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      </div>

                      {user.role === 'customer' && (
                        <>
                          <Link to="/customer" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">
                            <Calendar className="w-4 h-4 text-teal-400" />
                            My Bookings & Track Status
                          </Link>
                          <Link to="/customer/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">
                            <User className="w-4 h-4 text-teal-400" />
                            Saved Addresses & Profile
                          </Link>
                          <Link to="/messages" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">
                            <MessageSquare className="w-4 h-4 text-teal-400" />
                            Messages
                          </Link>
                        </>
                      )}

                      {user.role === 'professional' && (
                        <>
                          <Link to="/professional" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">
                            <Briefcase className="w-4 h-4 text-violet-400" />
                            Pro Dashboard & Requests
                          </Link>
                          <Link to="/professional/services" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">
                            <Zap className="w-4 h-4 text-violet-400" />
                            Services & Pricing
                          </Link>
                          <Link to="/professional/verification" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">
                            <Shield className="w-4 h-4 text-violet-400" />
                            Verification Documents
                          </Link>
                          <Link to="/messages" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">
                            <MessageSquare className="w-4 h-4 text-violet-400" />
                            Messages
                          </Link>
                        </>
                      )}

                      {user.role === 'admin' && (
                        <Link to="/admin" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">
                          <Shield className="w-4 h-4 text-rose-400" />
                          Admin Governance Console
                        </Link>
                      )}

                      <div className="border-t border-slate-800 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            navigate('/');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-500/10 text-rose-400 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl shadow-sm transition"
                  >
                    Join LocalX
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Menu Drawer matching Screenshot 3 */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="w-full max-w-sm h-full bg-[#0b1322] border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-400 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                  </div>
                  <span className="font-extrabold text-base text-white">Local<span className="text-teal-400">X</span></span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed">
                Nearby help, thoughtfully connected. Discover verified local professionals with clarity from the first click.
              </p>

              {/* Mobile Location Selector */}
              <div className="sm:hidden p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-slate-400 font-bold block text-[11px]">Selected City</span>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      if (onSelectCity) onSelectCity(e.target.value);
                    }}
                    className="flex-1 bg-transparent text-white font-bold focus:outline-none"
                  >
                    {cities.map((c) => (
                      <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleUseMyLocation();
                    setMenuOpen(false);
                  }}
                  className="w-full py-1.5 rounded-xl bg-teal-500/10 text-teal-300 border border-teal-500/30 text-[11px] font-bold flex items-center justify-center gap-1.5"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>Use my location</span>
                </button>
              </div>

              {/* EXPLORE LOCALX */}
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-400 block">
                  Explore LocalX
                </span>
                <Link
                  to="/explore"
                  onClick={() => setMenuOpen(false)}
                  className="w-full p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 text-white font-semibold flex items-center justify-between border border-slate-800 transition"
                >
                  <span>Explore Professionals</span>
                  <ArrowRight className="w-4 h-4 text-teal-400" />
                </Link>
                <button
                  type="button"
                  onClick={() => navigateAndScroll('services')}
                  className="w-full p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 text-white font-semibold flex items-center justify-between border border-slate-800 transition text-left"
                >
                  <span>Services Directory</span>
                  <ArrowDown className="w-4 h-4 text-teal-400" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateAndScroll('about')}
                  className="w-full p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 text-white font-semibold flex items-center justify-between border border-slate-800 transition text-left"
                >
                  <span>About LocalX</span>
                  <ArrowDown className="w-4 h-4 text-teal-400" />
                </button>
              </div>

              {/* CONNECT */}
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-400 block">
                  Connect
                </span>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 text-white font-semibold flex items-center justify-between border border-slate-800 transition"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 text-white font-semibold flex items-center justify-between border border-slate-800 transition"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>

              {/* POPULAR HELP */}
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-400 block">
                  Popular Help
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/explore?service=electrician"
                    onClick={() => setMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] border border-slate-800"
                  >
                    ⚡ Electricians
                  </Link>
                  <Link
                    to="/explore?service=plumber"
                    onClick={() => setMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] border border-slate-800"
                  >
                    🔧 Plumbers
                  </Link>
                  <Link
                    to="/explore?service=ac-repair"
                    onClick={() => setMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] border border-slate-800"
                  >
                    ❄️ AC Technicians
                  </Link>
                  <Link
                    to="/explore?service=cleaning"
                    onClick={() => setMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] border border-slate-800"
                  >
                    ✨ Home Cleaners
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Actions in Drawer */}
            <div className="pt-6 border-t border-slate-800 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                        alt={user.name}
                        className="w-8 h-8 rounded-xl object-cover border border-teal-500/40"
                      />
                      <div className="text-left">
                        <p className="text-white font-bold text-xs truncate max-w-[140px]">{user.name}</p>
                        <p className="text-[10px] text-teal-400 capitalize font-semibold">{user.role}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                      navigate('/');
                    }}
                    className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-bold text-center border border-rose-500/30 transition flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-center transition"
                  >
                    Join LocalX
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 font-semibold text-center border border-slate-800"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
