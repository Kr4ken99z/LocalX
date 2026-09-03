import React, { useState } from 'react';
import axios from 'axios';
import { X, AlertTriangle, AlertCircle, ShieldAlert } from 'lucide-react';

export default function DisputeModal({ booking, onClose, onSuccess }) {
  const [reason, setReason] = useState('Poor Work Quality');
  const [description, setDescription] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const reasons = [
    'Service Not Completed',
    'Poor Work Quality',
    'Overcharging / Pricing Issue',
    'Professional Did Not Arrive',
    'Damaged Property',
    'Unprofessional Behavior',
    'Other',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/disputes', {
        bookingId: booking._id,
        reason,
        description,
        evidence: evidenceUrl ? [{ title: 'Customer photo/evidence', url: evidenceUrl }] : [],
      });

      if (res.data.success) {
        if (onSuccess) onSuccess(res.data.data);
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to file dispute');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl relative text-xs">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-rose-400 mb-2">
          <ShieldAlert className="w-5 h-5" />
          <h3 className="text-base font-bold text-white">File a Service Dispute</h3>
        </div>
        <p className="text-slate-400 mb-4">
          Booking #{booking.bookingNumber} • Our platform mediation team investigates all reported disputes.
        </p>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Primary Dispute Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-rose-400"
            >
              {reasons.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Explanation & Incident Details</label>
            <textarea
              required
              rows="3"
              placeholder="Describe what went wrong in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-rose-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Photo / Proof URL (Optional)</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/... or image link"
              value={evidenceUrl}
              onChange={(e) => setEvidenceUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-rose-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold transition shadow-lg shadow-rose-500/20"
          >
            {loading ? 'Submitting...' : 'Submit to Admin Queue'}
          </button>
        </form>
      </div>
    </div>
  );
}
