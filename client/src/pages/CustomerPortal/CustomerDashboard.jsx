import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  Star,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Truck,
  Wrench,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import ReviewModal from '../../components/ReviewModal';
import DisputeModal from '../../components/DisputeModal';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';

export default function CustomerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active'); // 'active', 'completed', 'all'
  const [reviewBooking, setReviewBooking] = useState(null);
  const [disputeBooking, setDisputeBooking] = useState(null);
  const { user } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();

  const fetchBookings = async () => {
    let apiBookings = [];
    try {
      const res = await axios.get('/api/bookings');
      if (res.data.success && Array.isArray(res.data.data)) {
        apiBookings = res.data.data;
      }
    } catch (err) {
      console.warn('Fetch customer bookings fallback to local storage:', err);
    }

    try {
      const local = JSON.parse(localStorage.getItem('localx_customer_bookings') || '[]');
      const adminBookings = JSON.parse(localStorage.getItem('localx_admin_bookings') || '[]');

      // Merge API bookings and local customer/admin demo bookings
      const mergedMap = new Map();
      [...apiBookings, ...local, ...adminBookings].forEach((item) => {
        if (item && item._id && !mergedMap.has(item._id)) {
          mergedMap.set(item._id, item);
        }
      });
      const allBookings = Array.from(mergedMap.values());
      setBookings(allBookings);
    } catch (e) {
      setBookings(apiBookings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    const handleStorage = () => fetchBookings();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Listen to real-time booking status change events
  useEffect(() => {
    if (!socket) return;
    const handleStatusUpdate = () => {
      fetchBookings();
    };
    socket.on('booking_status_change', handleStatusUpdate);
    return () => {
      socket.off('booking_status_change', handleStatusUpdate);
    };
  }, [socket]);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking request?')) return;
    try {
      await axios.patch(`/api/bookings/${bookingId}/status`, {
        status: 'CANCELLED',
        comment: 'Cancelled by customer',
      });
      fetchBookings();
    } catch (err) {
      // Also update local storage if it was a demo booking
      try {
        const local = JSON.parse(localStorage.getItem('localx_customer_bookings') || '[]');
        const updated = local.map((b) => (b._id === bookingId ? { ...b, status: 'CANCELLED' } : b));
        localStorage.setItem('localx_customer_bookings', JSON.stringify(updated));
        fetchBookings();
      } catch (e) {}
    }
  };

  const activeStatuses = ['PENDING', 'ACCEPTED', 'ON_THE_WAY', 'IN_PROGRESS', 'CONFIRMED'];
  const activeBookings = bookings.filter((b) => activeStatuses.includes(b.status));
  const completedBookings = bookings.filter((b) => b.status === 'COMPLETED' || b.status === 'CANCELLED');

  const displayedBookings =
    activeTab === 'active'
      ? activeBookings
      : activeTab === 'completed'
      ? completedBookings
      : bookings;

  const renderStatusStepper = (currentStatus) => {
    const steps = [
      { key: 'PENDING', label: 'Requested' },
      { key: 'ACCEPTED', label: 'Confirmed' },
      { key: 'ON_THE_WAY', label: 'On The Way' },
      { key: 'IN_PROGRESS', label: 'In Progress' },
      { key: 'COMPLETED', label: 'Completed' },
    ];

    if (currentStatus === 'CANCELLED' || currentStatus === 'REJECTED') {
      return (
        <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold py-2">
          <XCircle className="w-4 h-4" />
          <span>This booking was {currentStatus.toLowerCase()}</span>
        </div>
      );
    }

    const currentIndex = steps.findIndex((s) => s.key === currentStatus);

    return (
      <div className="pt-3 pb-1">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-800 -z-0"></div>
          {steps.map((step, idx) => {
            const isDone = idx <= currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <div key={step.key} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition ${
                    isCurrent
                      ? 'bg-teal-400 text-slate-950 ring-4 ring-teal-500/20'
                      : isDone
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {isDone ? '✓' : idx + 1}
                </div>
                <span className={`text-[10px] mt-1 font-medium ${isCurrent ? 'text-teal-400 font-bold' : isDone ? 'text-slate-300' : 'text-slate-500'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-400">Customer Workspace</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">My Service Bookings</h1>
          <p className="text-xs text-slate-400">Track service progress, chat with specialists, and leave verified reviews.</p>
        </div>
        <Link
          to="/explore"
          className="px-4 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 rounded-xl text-xs font-bold transition shadow-md shadow-teal-500/20 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Find New Specialist</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab('active')}
          className={`pb-3 px-3 font-bold transition relative ${
            activeTab === 'active' ? 'text-teal-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          Active Services ({activeBookings.length})
          {activeTab === 'active' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400"></span>}
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`pb-3 px-3 font-bold transition relative ${
            activeTab === 'completed' ? 'text-teal-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          Completed & History ({completedBookings.length})
          {activeTab === 'completed' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400"></span>}
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 px-3 font-bold transition relative ${
            activeTab === 'all' ? 'text-teal-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          All Requests ({bookings.length})
          {activeTab === 'all' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400"></span>}
        </button>
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="glass-panel p-6 rounded-2xl h-44 animate-pulse"></div>
          ))}
        </div>
      ) : displayedBookings.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-base">No bookings found in this view</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Ready to get home repairs done? Explore our verified electricians, plumbers, and AC repair specialists.
          </p>
          <Link to="/explore" className="px-4 py-2 bg-teal-400 text-slate-950 text-xs font-bold rounded-xl inline-block">
            Browse Specialists
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {displayedBookings.map((b) => (
            <div key={b._id} className="glass-panel p-6 rounded-3xl space-y-4 border border-slate-800/90">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-md border border-teal-500/30">
                    #{b.bookingNumber}
                  </span>
                  <span className="text-xs text-slate-400">
                    Booked on {new Date(b.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Status:</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      b.status === 'COMPLETED'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : b.status === 'CANCELLED' || b.status === 'REJECTED'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        : 'bg-teal-500/10 text-teal-300 border border-teal-500/30 animate-pulse'
                    }`}
                  >
                    {b.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Service & Specialist Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Specialist */}
                <div className="flex items-center gap-3">
                  <img
                    src={b.professional?.userId?.avatar || b.professionalId?.userId?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt="Pro"
                    className="w-12 h-12 rounded-2xl object-cover border border-teal-500/30 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm">{b.professional?.businessName || b.professionalId?.businessName || 'Specialist'}</h4>
                    <p className="text-slate-400 text-[11px]">{b.professional?.userId?.name || b.professionalId?.userId?.name || 'Verified Specialist'}</p>
                    <p className="text-slate-400 text-[11px]">{b.professional?.userId?.phone || b.professionalId?.userId?.phone || '+91 98301 23456'}</p>
                  </div>
                </div>

                {/* Service & Schedule */}
                <div className="space-y-1">
                  <p className="font-bold text-white text-sm">{b.serviceName}</p>
                  <p className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    {b.scheduledDate} • {b.scheduledTime}
                  </p>
                  <p className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    {b.address?.addressLine}, {b.address?.city}
                  </p>
                </div>

                {/* Pricing & Chat CTA */}
                <div className="flex flex-col sm:items-end justify-center space-y-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block sm:text-right">Price</span>
                    <span className="text-lg font-extrabold text-teal-400 sm:text-right block">₹{b.price || b.basePrice || 299}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/messages?bookingId=${b._id}&targetUserId=${b.professionalId?.userId?._id}&targetName=${encodeURIComponent(b.professionalId?.businessName || 'Pro')}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                      <span>Chat Specialist</span>
                    </Link>

                    {b.status === 'PENDING' && (
                      <button
                        onClick={() => handleCancelBooking(b._id)}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition"
                      >
                        Cancel
                      </button>
                    )}

                    {b.status === 'COMPLETED' && (
                      <>
                        {!b.hasReview ? (
                          <button
                            onClick={() => setReviewBooking(b)}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1 transition shadow-sm"
                          >
                            <Star className="w-3.5 h-3.5 fill-slate-950" />
                            <span>Leave Review</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Reviewed
                          </span>
                        )}

                        {!b.hasDispute && (
                          <button
                            onClick={() => setDisputeBooking(b)}
                            className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-800 text-xs font-medium transition"
                            title="File a dispute if issue occurred"
                          >
                            <ShieldAlert className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                {renderStatusStepper(b.status)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {reviewBooking && (
        <ReviewModal
          booking={reviewBooking}
          onClose={() => setReviewBooking(null)}
          onSuccess={() => {
            setReviewBooking(null);
            fetchBookings();
          }}
        />
      )}

      {/* Dispute Modal */}
      {disputeBooking && (
        <DisputeModal
          booking={disputeBooking}
          onClose={() => setDisputeBooking(null)}
          onSuccess={() => {
            setDisputeBooking(null);
            fetchBookings();
          }}
        />
      )}
    </div>
  );
}
