import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, Lock, Mail, AlertCircle, ArrowRight, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    if (clean === '1337' || clean === 'admin123' || clean.toLowerCase() === 'koustav') {
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
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mx-auto text-teal-400">
            <Zap className="w-6 h-6 text-teal-400 fill-teal-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Sign in to LocalX</h1>
          <p className="text-xs text-slate-400">Access your customer, pro, or administrative console.</p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
          <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block">
            Instant 1-Click Demo Logins
          </span>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleDemoClick('customer')}
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-teal-500/40 text-teal-300 font-semibold transition text-center"
            >
              👤 Customer
            </button>
            <button
              type="button"
              onClick={() => handleDemoClick('professional')}
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-violet-500/40 text-violet-300 font-semibold transition text-center"
            >
              ⚡ Pro
            </button>
            <button
              type="button"
              onClick={() => handleDemoClick('admin')}
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-rose-500/40 text-rose-300 font-semibold transition text-center"
            >
              🛡️ Admin
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold transition shadow-lg shadow-teal-500/20 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 pt-2">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-teal-400 font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Admin Passcode Modal */}
      {showAdminPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
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
              <p className="text-slate-400">
                The platform governance console is restricted. Enter your Owner Passcode to sign in.
              </p>
            </div>

            {pinError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            <form onSubmit={handleAdminPinSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">
                  Owner Passcode
                </label>
                <input
                  type="password"
                  autoFocus
                  placeholder="Enter owner passcode"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Default owner passcode: <code className="text-rose-400 font-mono">1337</code> or <code className="text-rose-400 font-mono">admin123</code>
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAdminPinModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold transition shadow-lg shadow-rose-500/20"
                >
                  Unlock & Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
