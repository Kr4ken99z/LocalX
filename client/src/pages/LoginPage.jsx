import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, Lock, Mail, AlertCircle, Sun, Shield } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, quickDemoLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAdminPinModal, setShowAdminPinModal] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await login(email, password);
    if (res.success) {
      if (res.user.role === 'professional') navigate('/professional');
      else if (res.user.role === 'admin') navigate('/admin');
      else navigate('/customer');
    } else {
      setError(res.message);
      setLoading(false);
    }
  };

  const handleDemoClick = async (role) => {
    if (role === 'admin') {
      setShowAdminPinModal(true);
      setPinError('');
      setAdminPin('');
      return;
    }

    setLoading(true);
    const res = await quickDemoLogin(role);
    if (res.success) {
      if (role === 'professional') navigate('/professional');
      else navigate('/customer');
    } else {
      setError(res.message);
      setLoading(false);
    }
  };

  const handleAdminPinSubmit = async (e) => {
    e.preventDefault();
    const clean = adminPin.trim();
    if (clean === '1337' || clean === 'admin123' || clean.toLowerCase() === 'koustav' || clean === 'password123') {
      setShowAdminPinModal(false);
      setLoading(true);
      const res = await quickDemoLogin('admin');
      if (res.success) navigate('/admin');
      else setError(res.message);
      setLoading(false);
    } else {
      setPinError('Access Denied: Invalid Owner Passcode');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10">
      {/* 2-Column Auth Card Matching User's Image 3 */}
      <div className="w-full max-w-4xl bg-[#091120]/95 border border-slate-700/60 rounded-[32px] shadow-2xl overflow-hidden backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 text-xs">
        {/* Left Editorial Panel */}
        <div className="lg:col-span-5 p-8 sm:p-10 bg-gradient-to-b from-[#0e1b30] to-[#08101e] border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-8 relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
                Local<span className="text-teal-400">X</span>
              </span>
            </div>

            <div className="space-y-4 pt-4">
              <span className="text-[11px] font-bold text-teal-400 uppercase tracking-widest block">
                WELCOME BACK
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Your local world is closer than you think.
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                Sign in to discover verified professionals, follow your bookings, and keep every service conversation in one calm place.
              </p>
            </div>
          </div>

          {/* Bottom Tagline */}
          <div className="pt-8 relative z-10 flex items-center gap-2 text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            <span>Local help, thoughtfully connected.</span>
          </div>

          {/* Ambient Glow */}
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between relative bg-[#091120]/80">
          {/* Top theme pill */}
          <div className="flex items-center justify-end mb-4">
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400 hover:text-amber-300 transition"
              title="Toggle theme"
            >
              <Sun className="w-4 h-4" />
            </button>
          </div>

          <div className="max-w-md w-full mx-auto space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-white">Welcome back</h1>
              <p className="text-slate-400 text-xs">Sign in to manage your LocalX account.</p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Email address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-sm transition shadow-lg shadow-teal-700/30 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 pt-1">
              New to LocalX?{' '}
              <Link to="/register" className="text-teal-400 font-bold hover:underline">
                Create an account
              </Link>
            </p>
          </div>

          <div className="pt-6" />
        </div>
      </div>

      {/* Admin Passcode Modal */}
      {showAdminPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-sm p-6 bg-slate-900 border border-rose-500/50 rounded-2xl shadow-2xl relative text-xs">
            <button
              onClick={() => setShowAdminPinModal(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              ✕
            </button>

            <div className="text-center space-y-1 mb-4">
              <span className="text-2xl block">🔐</span>
              <h3 className="text-base font-extrabold text-white">Owner / Admin Access</h3>
              <p className="text-slate-400 text-xs">Enter your Master Passcode to unlock admin console.</p>
            </div>

            {pinError && (
              <div className="p-2 mb-3 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-center">
                {pinError}
              </div>
            )}

            <form onSubmit={handleAdminPinSubmit} className="space-y-3">
              <input
                type="password"
                autoFocus
                placeholder="Passcode (e.g. 1337)"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                className="w-full text-center text-base tracking-widest px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-rose-500"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold transition shadow-lg shadow-rose-500/20"
              >
                Authenticate Master Console
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
