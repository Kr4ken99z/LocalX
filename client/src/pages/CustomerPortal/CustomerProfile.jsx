import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { User, MapPin, Plus, Trash2, Check, AlertCircle } from 'lucide-react';

export default function CustomerProfile() {
  const { user, refreshProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [savedAddresses, setSavedAddresses] = useState(user?.savedAddresses || []);
  const [newLabel, setNewLabel] = useState('Home');
  const [newLine, setNewLine] = useState('');
  const [newLandmark, setNewLandmark] = useState('');
  const [newCity, setNewCity] = useState('Kolkata');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.patch('/api/auth/profile', {
        name,
        phone,
        savedAddresses,
      });
      await refreshProfile();
      setMessage('Profile and addresses saved successfully!');
    } catch (err) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = () => {
    if (!newLine.trim()) return;
    const newAddr = {
      label: newLabel,
      addressLine: newLine,
      landmark: newLandmark,
      city: newCity,
    };
    setSavedAddresses([...savedAddresses, newAddr]);
    setNewLine('');
    setNewLandmark('');
  };

  const handleRemoveAddress = (idx) => {
    setSavedAddresses(savedAddresses.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-xs">
      <div>
        <span className="text-xs font-extrabold uppercase tracking-widest text-teal-400">Account Settings</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">Profile & Saved Addresses</h1>
        <p className="text-slate-400">Manage your contact details and multiple service locations.</p>
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleUpdateProfile} className="space-y-6">
        {/* Personal Details */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-teal-400" />
            <span>Personal Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400"
              />
            </div>
          </div>
        </div>

        {/* Saved Addresses */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-teal-400" />
            <span>Saved Service Addresses</span>
          </h3>

          <div className="space-y-3">
            {savedAddresses.map((addr, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3"
              >
                <div>
                  <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 font-bold text-[10px] uppercase">
                    {addr.label}
                  </span>
                  <p className="font-semibold text-white mt-1">{addr.addressLine}</p>
                  {addr.landmark && <p className="text-slate-400 text-[11px]">Landmark: {addr.landmark}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveAddress(idx)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 transition rounded-lg hover:bg-slate-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add New Address Bar */}
          <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-3 pt-3">
            <span className="font-bold text-slate-300 block">Add New Service Location</span>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Label (e.g. Home, Office, Villa)"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
              />
              <select
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                aria-label="Address City"
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none cursor-pointer"
              >
                {['Kolkata', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune'].map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Full Street Address"
                value={newLine}
                onChange={(e) => setNewLine(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Landmark (Optional)"
                value={newLandmark}
                onChange={(e) => setNewLandmark(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleAddAddress}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-400 border border-slate-700 font-bold flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Saved Addresses</span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold transition shadow-md shadow-teal-500/20"
        >
          {loading ? 'Saving Changes...' : 'Save Profile Changes'}
        </button>
      </form>
    </div>
  );
}
