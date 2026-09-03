import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Zap,
  User,
  Wrench,
  AlertCircle,
  Mail,
  Lock,
  Phone,
  MapPin,
  Crosshair,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { detectSmartLocation } from '../utils/locationHelper';
import { METROPOLITAN_CITIES } from '../utils/mockData';

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'professional' ? 'professional' : 'customer';

  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Electrician');
  
  // Location States for Professional Registration
  const [city, setCity] = useState('Kolkata');
  const [isCustomCity, setIsCustomCity] = useState(false);
  const [customCity, setCustomCity] = useState('');
  const [address, setAddress] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleUseGpsLocation = async () => {
    setIsLocating(true);
    setLocationSuccess('');
    setError('');
    try {
      const loc = await detectSmartLocation();
      if (loc && loc.city) {
        if (METROPOLITAN_CITIES.includes(loc.city)) {
          setCity(loc.city);
          setIsCustomCity(false);
        } else {
          setIsCustomCity(true);
          setCustomCity(loc.city);
        }
        if (loc.address) {
          setAddress(loc.address);
        }
        setLocationSuccess(`GPS Location Detected: ${loc.city}${loc.address ? ` (${loc.address})` : ''}`);
      } else {
        setLocationSuccess('GPS Location Captured Successfully!');
      }
    } catch (err) {
      setError('Could not detect GPS location automatically. Please choose your city from the list.');
    } finally {
      setIsLocating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const effectiveCity = role === 'professional' 
      ? (isCustomCity ? (customCity.trim() || 'Kolkata') : city) 
      : undefined;

    const res = await register({
      name,
      email,
      phone,
      password,
      role,
      businessName: role === 'professional' ? businessName : undefined,
      serviceCategory: role === 'professional' ? serviceCategory : undefined,
      city: effectiveCity,
      address: role === 'professional' ? (address.trim() || undefined) : undefined,
    });

    if (res.success) {
      if (role === 'professional') navigate('/professional');
      else navigate('/customer');
    } else {
      setError(res.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mx-auto text-teal-400">
            <Zap className="w-6 h-6 text-teal-400 fill-teal-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Join LocalX</h1>
          <p className="text-xs text-slate-400">Create your account to hire or provide verified hyperlocal services.</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition ${
              role === 'customer'
                ? 'bg-teal-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>I'm a Customer</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('professional')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition ${
              role === 'professional'
                ? 'bg-violet-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>I'm a Service Pro</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Common Inputs: Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Password (min 6 characters)</label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400"
              />
            </div>

            {/* CUSTOMER ONLY: Informational note that location is NOT needed to register */}
            {role === 'customer' && (
              <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-[11px] text-teal-200 leading-relaxed flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-teal-300">Instant Access Without Location Setup</p>
                  <p className="text-slate-300 mt-0.5">
                    As a customer, you do not need to provide your location during sign up. You can detect your GPS or select any area anytime while exploring services!
                  </p>
                </div>
              </div>
            )}

            {/* PROFESSIONAL ONLY: Business Name, Trade Category, & Location Setup */}
            {role === 'professional' && (
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-violet-300 font-semibold mb-1">Business / Brand Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SparkVolt Solutions"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-violet-400"
                  />
                </div>

                <div>
                  <label className="block text-violet-300 font-semibold mb-1">Primary Trade Category</label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-violet-400"
                  >
                    <option value="Electrician">Electrician & Wiring</option>
                    <option value="AC Repair">AC Servicing & Refrigeration</option>
                    <option value="Plumber">Plumbing & Drainage</option>
                    <option value="Cleaning">Deep Home Cleaning</option>
                    <option value="Carpenter">Carpentry & Assembly</option>
                    <option value="Painter">Painting & Waterproofing</option>
                    <option value="Pest Control">Pest Control</option>
                    <option value="Smart Home">Smart Home & CCTV</option>
                  </select>
                </div>

                {/* Location Section with GPS Button & All Metropolitan Cities */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <label className="text-violet-300 font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" />
                      <span>Operational Base & Service Location</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleUseGpsLocation}
                      disabled={isLocating}
                      title="Auto-detect coordinates and city via GPS"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/40 text-teal-300 text-[11px] font-bold transition shrink-0"
                    >
                      <Crosshair className={`w-3.5 h-3.5 text-teal-400 ${isLocating ? 'animate-spin' : ''}`} />
                      <span>{isLocating ? 'Detecting GPS...' : 'Use My GPS Location'}</span>
                    </button>
                  </div>

                  {locationSuccess && (
                    <div className="p-2.5 rounded-xl bg-teal-500/15 border border-teal-500/40 text-teal-300 text-[11px] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-teal-400" />
                      <span>{locationSuccess}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Metropolitan City Select */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-slate-300 font-semibold">City</label>
                        <button
                          type="button"
                          onClick={() => setIsCustomCity(!isCustomCity)}
                          className="text-[10px] text-teal-400 hover:underline font-bold"
                        >
                          {isCustomCity ? 'Pick Metro City' : 'Type Custom City'}
                        </button>
                      </div>

                      {isCustomCity ? (
                        <input
                          type="text"
                          required
                          placeholder="e.g. Surat, Indore, Patna"
                          value={customCity}
                          onChange={(e) => setCustomCity(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-violet-400"
                        />
                      ) : (
                        <select
                          value={city}
                          onChange={(e) => {
                            if (e.target.value === 'custom') {
                              setIsCustomCity(true);
                            } else {
                              setCity(e.target.value);
                            }
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-violet-400"
                        >
                          {METROPOLITAN_CITIES.map((c) => (
                            <option key={c} value={c} className="bg-slate-900 text-white">
                              {c}
                            </option>
                          ))}
                          <option value="custom" className="bg-slate-900 text-teal-300 font-bold">
                            + Other City (Type Manually)
                          </option>
                        </select>
                      )}
                    </div>

                    {/* Area / Locality */}
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Area / Locality</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Salt Lake, Indiranagar, Bandra"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-violet-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-xl font-bold transition shadow-lg disabled:opacity-50 ${
                role === 'professional'
                  ? 'bg-violet-500 hover:bg-violet-400 text-white shadow-violet-500/20'
                  : 'bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-teal-500/20'
              }`}
            >
              {loading ? 'Creating Account...' : `Register as ${role === 'professional' ? 'Service Specialist' : 'Customer'}`}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 pt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-teal-400 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
