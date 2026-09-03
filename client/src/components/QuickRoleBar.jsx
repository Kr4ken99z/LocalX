import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Wrench, Shield, Sparkles, Lock, Key, X, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuickRoleBar() {
  const { user, quickDemoLogin, logout } = useAuth();
  const navigate = useNavigate();
  const [showAdminPinModal, setShowAdminPinModal] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState('');

  const handleRoleSwitch = async (role, destination) => {
    if (role === 'admin' && user?.role !== 'admin') {
      setShowAdminPinModal(true);
      setPinError('');
      setAdminPin('');
      return;
    }

    await quickDemoLogin(role);
    if (destination) {
      navigate(destination);
    }
  };

  const handleAdminVerify = async (e) => {
    e.preventDefault();
    // Authorized Owner Passcodes: '1337', 'admin123', 'koustav'
    const cleanPin = adminPin.trim();
    if (cleanPin === '1337' || cleanPin === 'admin123' || cleanPin.toLowerCase() === 'koustav') {
      setPinError('');
      setShowAdminPinModal(false);
      await quickDemoLogin('admin');
      navigate('/admin');
    } else {
      setPinError('Access Denied: Invalid Owner Passcode. Admin portal is restricted.');
    }
  };

  return (
    <>
      <div className="bg-slate-900/95 border-b border-slate-800 text-xs py-1.5 px-4 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="flex items-center gap-1 font-semibold text-teal-400">
              <Sparkles className="w-3.5 h-3.5" />
              Role Switcher:
            </span>
            <span className="hidden sm:inline text-slate-400">
              Switch customer & pro views:
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Customer Button */}
            <button
              onClick={() => handleRoleSwitch('customer', '/customer')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                user?.role === 'customer'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/50 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700'
              }`}
            >
              <User className="w-3.5 h-3.5 text-teal-400" />
              <span>Customer Portal</span>
              {user?.role === 'customer' && <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>}
            </button>

            {/* Professional Button */}
            <button
              onClick={() => handleRoleSwitch('professional', '/professional')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                user?.role === 'professional'
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/50 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-violet-400" />
              <span>Professional Portal</span>
              {user?.role === 'professional' && <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>}
            </button>

            {/* Admin Button - Protected by Owner Passcode */}
            <button
              onClick={() => handleRoleSwitch('admin', '/admin')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                user?.role === 'admin'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-sm font-bold'
                  : 'text-rose-400/90 hover:text-rose-300 hover:bg-rose-950/30 border border-rose-900/60'
              }`}
              title={user?.role === 'admin' ? 'Admin Active' : 'Owner / Admin Protected Access'}
            >
              {user?.role === 'admin' ? (
                <Shield className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-rose-400" />
              )}
              <span>{user?.role === 'admin' ? 'Admin Console' : 'Admin (Owner Only)'}</span>
              {user?.role === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>}
            </button>
          </div>
        </div>
      </div>

      {/* Admin Passcode Modal */}
      {showAdminPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm p-6 bg-slate-900 border border-rose-500/50 rounded-2xl shadow-2xl relative">
            <button
              onClick={() => setShowAdminPinModal(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1 mb-5">
              <h3 className="text-base font-extrabold text-white">Owner / Admin Access</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The platform governance console is private. Enter your Owner Passcode to access.
              </p>
            </div>

            {pinError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            <form onSubmit={handleAdminVerify} className="space-y-4">
              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">
                  Owner Passcode
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    autoFocus
                    placeholder="Enter owner passcode"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
                  />
                </div>
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
                  Unlock Console
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
