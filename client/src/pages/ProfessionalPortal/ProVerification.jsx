import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Upload, CheckCircle2, Clock, XCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProVerification() {
  const { professionalProfile, refreshProfile } = useAuth();
  const [docType, setDocType] = useState('gov_id');
  const [docTitle, setDocTitle] = useState('Government Photo ID');
  const [docUrl, setDocUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const status = professionalProfile?.verificationStatus || 'PENDING';

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await axios.post(`/api/professionals/${professionalProfile._id}/verification`, {
        docType,
        title: docTitle,
        fileUrl: docUrl || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80',
      });
      await refreshProfile();
      setMessage('Document submitted! Our compliance team will audit it within 24 hours.');
      setDocUrl('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit document');
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
        <span className="text-xs font-extrabold uppercase tracking-widest text-violet-400">Trust & Identity</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">Professional Verification Center</h1>
        <p className="text-slate-400">Verified specialists receive +25 Trust Score points, priority search placement, and the Verified Pro badge.</p>
      </div>

      {/* Current Status Banner */}
      <div className={`p-6 rounded-3xl border flex items-center justify-between gap-4 ${
        status === 'VERIFIED'
          ? 'bg-teal-500/10 border-teal-500/30 text-teal-300'
          : status === 'REJECTED'
          ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
      }`}>
        <div className="flex items-center gap-3">
          {status === 'VERIFIED' ? (
            <CheckCircle2 className="w-8 h-8 text-teal-400" />
          ) : status === 'REJECTED' ? (
            <XCircle className="w-8 h-8 text-rose-400" />
          ) : (
            <Clock className="w-8 h-8 text-amber-400 animate-pulse" />
          )}
          <div>
            <h3 className="font-bold text-base text-white">Status: {status}</h3>
            <p className="text-xs opacity-90">
              {status === 'VERIFIED'
                ? 'Your credentials have been audited and approved by the LocalX compliance team.'
                : status === 'REJECTED'
                ? 'Your previous submission was not approved. Please review remarks and upload updated credentials.'
                : 'Your documents are currently queued for administrative audit.'}
            </p>
            {professionalProfile?.verificationRemarks && (
              <p className="text-xs font-semibold mt-1">Admin remarks: "{professionalProfile.verificationRemarks}"</p>
            )}
          </div>
        </div>
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Upload New Document Card */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <Upload className="w-4 h-4 text-teal-400" />
          <span>Submit Verification Document</span>
        </h3>

        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Document Category</label>
              <select
                value={docType}
                onChange={(e) => {
                  setDocType(e.target.value);
                  if (e.target.value === 'gov_id') setDocTitle('Government Photo ID');
                  if (e.target.value === 'trade_cert') setDocTitle('Trade / Technical License');
                  if (e.target.value === 'address_proof') setDocTitle('Utility / Address Proof');
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
              >
                <option value="gov_id">Aadhaar / National Identity Card</option>
                <option value="trade_cert">Trade License / Diploma / Certificate</option>
                <option value="address_proof">Address Proof (Electricity / Lease)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Document Title</label>
              <input
                type="text"
                required
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Document Photo / Scan URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/... or scan link"
              value={docUrl}
              onChange={(e) => setDocUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              In production or testing, enter an image or document URL to submit for administrative review.
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold transition shadow-md shadow-teal-500/20 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Upload & Queue for Verification'}
          </button>
        </form>
      </div>

      {/* Submitted Documents History */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <h3 className="font-bold text-white text-sm">Uploaded Documents Registry</h3>
        <div className="space-y-3">
          {professionalProfile?.documents?.map((doc, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 font-bold text-[10px] uppercase">
                  {doc.docType}
                </span>
                <p className="font-bold text-white mt-1">{doc.title}</p>
                <p className="text-slate-400 text-[10px]">Submitted on {new Date(doc.uploadedAt).toLocaleDateString()}</p>
              </div>
              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-teal-400 hover:text-white border border-slate-700 font-semibold text-[11px]"
              >
                View Scan ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
