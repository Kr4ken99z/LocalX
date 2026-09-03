import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Plus, Trash2, Check, Zap, DollarSign, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProServices() {
  const { professionalProfile, refreshProfile } = useAuth();
  const [services, setServices] = useState(professionalProfile?.services || []);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriceType, setNewPriceType] = useState('starts_at');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddService = () => {
    if (!newName.trim() || !newPrice) return;
    const item = {
      name: newName,
      price: Number(newPrice),
      priceType: newPriceType,
      description: newDesc,
    };
    setServices([...services, item]);
    setNewName('');
    setNewPrice('');
    setNewDesc('');
  };

  const handleRemove = (idx) => {
    setServices(services.filter((_, i) => i !== idx));
  };

  const handleSaveServices = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.patch('/api/professionals/me', {
        services,
      });
      await refreshProfile();
      setMessage('Services and pricing updated successfully!');
    } catch (err) {
      setMessage('Failed to update services.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-xs">
      <Link to="/professional" className="inline-flex items-center gap-1 text-slate-400 hover:text-white">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Pro Workspace</span>
      </Link>

      <div>
        <span className="text-xs font-extrabold uppercase tracking-widest text-violet-400">Catalog Manager</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">Services & Pricing Setup</h1>
        <p className="text-slate-400">Define the exact repair and maintenance offerings visible on your profile.</p>
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Services List */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <h3 className="font-bold text-white text-sm">Active Service Offerings</h3>
        <div className="space-y-3">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-sm">{s.name}</h4>
                  <span className="px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 text-[10px] font-semibold">
                    {s.priceType === 'fixed' ? 'Fixed' : 'Starts at'}
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-0.5">{s.description || 'Standard service delivery.'}</p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="text-base font-extrabold text-teal-400">₹{s.price}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Service Section */}
        <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3 pt-3">
          <span className="font-bold text-slate-300 block">Add New Service Item</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Service Title (e.g. Inverter Check)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
            />
            <input
              type="number"
              placeholder="Price in ₹"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
            />
            <select
              value={newPriceType}
              onChange={(e) => setNewPriceType(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
            >
              <option value="starts_at">Starts at (Diagnostic)</option>
              <option value="fixed">Fixed Flat Rate</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Brief scope description..."
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddService}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-400 border border-slate-700 font-bold flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add to Catalog</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleSaveServices}
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-400 text-white font-bold transition shadow-md shadow-violet-500/20"
        >
          {loading ? 'Saving...' : 'Save Services & Rates'}
        </button>
      </div>
    </div>
  );
}
