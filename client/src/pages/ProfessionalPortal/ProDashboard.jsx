import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  CheckCircle,
  Clock,
  Star,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  MessageSquare,
  Truck,
  Check,
  X,
  Phone,
  Calendar,
  MapPin,
} from 'lucide-react';
import TrustScoreBadge from '../../components/TrustScoreBadge';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';

const DEMO_PRO_BOOKINGS = [
  {
    _id: 'pro_bk_1',
    bookingNumber: 'LX-3926',
    customerId: {
      name: 'Rohan Sen',
      email: 'customer@localx.app',
      phone: '+91 98301 23456',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
    },
    serviceName: 'Electrician Diagnostics & Standard Service',
    scheduledDate: '2026-11-04',
    scheduledTime: '10:00 AM - 12:00 PM',
    status: 'ACCEPTED',
    price: 299,
    basePrice: 299,
    address: {
      addressLine: '#402, Sunshine Heights, 12th Main',
      city: 'Kolkata',
      landmark: 'Near South City Mall',
    },
    notes: 'Please check sub-meter tripping and circuit breaker.',
  },
  {
    _id: 'pro_bk_2',
    bookingNumber: 'LX-8777',
    customerId: {
      name: 'Ananya Roy',
      email: 'ananya.roy@example.com',
      phone: '+91 98309 87654',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    },
    serviceName: 'Jet Pump Deep Foam AC Cleaning',
    scheduledDate: '2026-11-12',
    scheduledTime: '01:00 PM - 03:00 PM',
    status: 'ON_THE_WAY',
    price: 549,
    basePrice: 549,
    address: {
      addressLine: 'Block C, Lake Town',
      city: 'Kolkata',
      landmark: 'Near Clock Tower',
    },
    notes: 'Split AC indoor unit leaking water during high cooling.',
  },
  {
    _id: 'pro_bk_3',
    bookingNumber: 'LX-9403',
    customerId: {
      name: 'Pooja Agarwal',
      email: 'pooja.a@example.com',
      phone: '+91 98302 99881',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
    },
    serviceName: 'Emergency Tap & Sink Leak Rectification',
    scheduledDate: '2026-11-18',
    scheduledTime: '08:00 AM - 10:00 AM',
    status: 'PENDING',
    price: 299,
    basePrice: 299,
    address: {
      addressLine: 'Flat 3B, Silver Oak, Salt Lake Sector 2',
      city: 'Kolkata',
      landmark: 'Near Karunamoyee Metro',
    },
    notes: 'Urgent kitchen sink pipeline overflow.',
  },
  {
    _id: 'pro_bk_4',
    bookingNumber: 'LX-9401',
    customerId: {
      name: 'Dr. Debabrata Sen',
      email: 'dr.sen@example.com',
      phone: '+91 98319 22334',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    },
    serviceName: 'Electrical Diagnostics & Wiring Fault Rectification',
    scheduledDate: '2026-09-02',
    scheduledTime: '10:00 AM - 12:00 PM',
    status: 'COMPLETED',
    price: 299,
    basePrice: 299,
    address: {
      addressLine: '77 Southern Avenue, Keyatala',
      city: 'Kolkata',
    },
  },
];

export default function ProDashboard() {
  const { user, professionalProfile, refreshProfile } = useAuth();
  const { socket } = useSocket();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState('');

  const fetchProBookings = async () => {
    let proBookings = [];
    try {
      const res = await axios.get('/api/bookings');
      if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
        proBookings = res.data.data;
      }
    } catch (err) {
      console.warn('Fetch pro bookings fallback:', err);
    }

    if (proBookings.length === 0) {
      try {
        const saved = JSON.parse(localStorage.getItem('localx_admin_bookings') || '[]');
        if (Array.isArray(saved) && saved.length > 0) {
          proBookings = saved.map((b) => ({
            ...b,
            customerId: b.customerId || b.customer,
          }));
        } else {
          proBookings = DEMO_PRO_BOOKINGS;
        }
      } catch (e) {
        proBookings = DEMO_PRO_BOOKINGS;
      }
    }
    setBookings(proBookings);
    setLoading(false);
  };

  useEffect(() => {
    fetchProBookings();
    const handleStorage = () => fetchProBookings();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('booking_status_change', fetchProBookings);
    return () => socket.off('booking_status_change', fetchProBookings);
  }, [socket]);

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    setActionLoading(bookingId);
    try {
      await axios.patch(`/api/bookings/${bookingId}/status`, {
        status: newStatus,
        comment: `Professional updated status to ${newStatus}`,
      });
    } catch (err) {
      console.warn('Backend update fallback to local state:', err);
    }

    // Update local state and storage
    const updated = bookings.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b));
    setBookings(updated);
    try {
      localStorage.setItem('localx_admin_bookings', JSON.stringify(updated));
      localStorage.setItem('localx_customer_bookings', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}

    setActionLoading('');
  };

  const incomingRequests = bookings.filter((b) => b.status === 'PENDING');
  const ongoingJobs = bookings.filter((b) =>
    ['ACCEPTED', 'ON_THE_WAY', 'IN_PROGRESS'].includes(b.status)
  );
  const completedJobs = bookings.filter((b) => b.status === 'COMPLETED');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-xs">
      {/* Top Banner & Profile Overview */}
      <div className="glass-panel p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-violet-500/30">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80'}
            alt="Pro"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-violet-500/50"
          />
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-violet-400 uppercase tracking-wider">Professional Operations Hub</span>
            <h1 className="text-2xl font-extrabold text-white">
              {professionalProfile?.businessName || user?.name + ' Services'}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-slate-400">
              <span className="flex items-center gap-1 font-bold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {professionalProfile?.rating || 4.9} Rating
              </span>
              <span>•</span>
              <span className="text-slate-300 font-semibold">{professionalProfile?.completedJobs || 84} Jobs Completed</span>
              <span>•</span>
              <span className="text-slate-300 font-semibold">{professionalProfile?.responseRate || 98}% Response Rate</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <TrustScoreBadge
            score={professionalProfile?.trustScore || 94}
            tier={professionalProfile?.trustTier || 'Elite Pro'}
          />
          <Link
            to="/professional/verification"
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold transition flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Verification Center</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl space-y-1">
          <span className="text-slate-400 font-medium">Incoming Requests</span>
          <p className="text-2xl font-extrabold text-teal-400">{incomingRequests.length}</p>
          <span className="text-[11px] text-slate-400">Awaiting your confirmation</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-1">
          <span className="text-slate-400 font-medium">In-Progress / Ongoing</span>
          <p className="text-2xl font-extrabold text-cyan-400">{ongoingJobs.length}</p>
          <span className="text-[11px] text-slate-400">Live active work</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-1">
          <span className="text-slate-400 font-medium">Completed Bookings</span>
          <p className="text-2xl font-extrabold text-violet-400">{completedJobs.length}</p>
          <span className="text-[11px] text-slate-400">Total verified deliveries</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-1">
          <span className="text-slate-400 font-medium">Platform Trust Rating</span>
          <p className="text-2xl font-extrabold text-amber-400">{professionalProfile?.rating || '4.9'} ★</p>
          <span className="text-[11px] text-slate-400">{professionalProfile?.trustTier || 'Elite Pro'}</span>
        </div>
      </div>

      {/* Incoming Requests Section (Accept / Reject) */}
      <div className="glass-panel p-6 rounded-3xl space-y-4 border-teal-500/20">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
            <span>Incoming Booking Requests ({incomingRequests.length})</span>
          </h2>
          <span className="text-[11px] text-slate-400">Review and accept or reject service calls</span>
        </div>

        {incomingRequests.length === 0 ? (
          <p className="text-slate-400 py-4 italic text-center">No new pending requests right now. You are up to date!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {incomingRequests.map((req) => (
              <div key={req._id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-teal-400 font-bold">#{req.bookingNumber}</span>
                    <h3 className="font-bold text-white text-sm">{req.serviceName}</h3>
                    <p className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-400" />
                      {req.scheduledDate} • {req.scheduledTime}
                    </p>
                  </div>
                  <span className="text-base font-extrabold text-teal-400">₹{req.price}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-1">
                  <p className="font-semibold text-white">Customer: {req.customerId?.name}</p>
                  <p className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-teal-400" />
                    {req.address?.addressLine}, {req.address?.city}
                  </p>
                  {req.notes && (
                    <p className="text-slate-300 italic pt-1 border-t border-slate-800">"{req.notes}"</p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleUpdateBookingStatus(req._id, 'ACCEPTED')}
                    disabled={actionLoading === req._id}
                    className="flex-1 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold flex items-center justify-center gap-1 transition shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>Accept Job</span>
                  </button>
                  <button
                    onClick={() => handleUpdateBookingStatus(req._id, 'REJECTED')}
                    disabled={actionLoading === req._id}
                    className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-rose-400 border border-slate-800 font-semibold flex items-center gap-1 transition"
                  >
                    <X className="w-4 h-4" />
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ongoing Jobs & Lifecycle Progression */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <Truck className="w-4 h-4 text-violet-400" />
          <span>Ongoing Scheduled Jobs & Status Updates ({ongoingJobs.length})</span>
        </h2>
        <p className="text-slate-400">
          Update the real-time lifecycle as you travel to the customer and complete the job.
        </p>

        {ongoingJobs.length === 0 ? (
          <p className="text-slate-400 py-4 italic text-center">No ongoing jobs at the moment.</p>
        ) : (
          <div className="space-y-4">
            {ongoingJobs.map((job) => (
              <div key={job._id} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/30">
                      #{job.bookingNumber}
                    </span>
                    <h3 className="font-bold text-white">{job.serviceName}</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full font-bold text-violet-300 bg-violet-500/20 border border-violet-500/40">
                    Current: {job.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-400 block">Customer:</span>
                    <p className="font-bold text-white">{job.customerId?.name}</p>
                    <p className="text-slate-400">{job.customerId?.phone}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Location:</span>
                    <p className="text-white">{job.address?.addressLine}</p>
                    <p className="text-slate-400">{job.address?.landmark}</p>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-slate-400 block">Service Total:</span>
                    <p className="text-base font-extrabold text-teal-400">₹{job.price}</p>
                  </div>
                </div>

                {/* Status Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-slate-800">
                  <span className="text-slate-400 font-semibold mr-1">Advance Status:</span>

                  {job.status === 'ACCEPTED' && (
                    <button
                      onClick={() => handleUpdateBookingStatus(job._id, 'ON_THE_WAY')}
                      className="px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold flex items-center gap-1.5 transition"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Mark "On The Way"</span>
                    </button>
                  )}

                  {job.status === 'ON_THE_WAY' && (
                    <button
                      onClick={() => handleUpdateBookingStatus(job._id, 'IN_PROGRESS')}
                      className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-1.5 transition"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Mark "In Progress" (Arrived)</span>
                    </button>
                  )}

                  {job.status === 'IN_PROGRESS' && (
                    <button
                      onClick={() => handleUpdateBookingStatus(job._id, 'COMPLETED')}
                      className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-1.5 transition shadow-sm"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Complete Service & Finalize</span>
                    </button>
                  )}

                  <Link
                    to={`/messages?bookingId=${job._id}&targetUserId=${job.customerId?._id}&targetName=${encodeURIComponent(job.customerId?.name || 'Customer')}`}
                    className="ml-auto px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1 font-semibold transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                    <span>Message Customer</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
