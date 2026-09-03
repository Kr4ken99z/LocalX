import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Check,
  ShieldCheck,
  AlertCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Info,
  RefreshCw,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FALLBACK_PROS } from '../utils/mockData';

export default function BookingModal({ professional, initialService = null, onClose, onSuccess }) {
  const navigate = useNavigate();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Active Specialist
  const [currentPro, setCurrentPro] = useState(professional);

  // Alternative specialist in the same category
  const alternativePro = FALLBACK_PROS.find(
    (p) =>
      (p.category === currentPro.category || p.skills?.[0] === currentPro.skills?.[0]) &&
      p._id !== currentPro._id
  ) || FALLBACK_PROS.find((p) => p._id !== currentPro._id);

  // Selected Service
  const [selectedService, setSelectedService] = useState(
    initialService || currentPro?.services?.[0] || { name: 'Standard Service Consultation', price: 299 }
  );

  // Dates Helper
  const today = new Date();
  const tomorrow = new Date(Date.now() + 86400000);
  const dayAfter = new Date(Date.now() + 86400000 * 2);
  const twoMonthsLater = new Date(Date.now() + 86400000 * 62); // 2+ months ahead

  const formatDateStr = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Default date: 2 months later (so slots are open by default)
  const [scheduledDate, setScheduledDate] = useState(formatDateStr(twoMonthsLater));
  const [scheduledTime, setScheduledTime] = useState('10:00 AM - 12:00 PM');

  // Address & Notes
  const [addressLine, setAddressLine] = useState('#402, Sunshine Heights, 12th Main');
  const [city, setCity] = useState(currentPro?.location?.city || 'Kolkata');
  const [landmark, setLandmark] = useState('Near Metro Station');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Date Availability Logic (Demo professionals are fully booked for near-term dates within 2 months)
  const isAdvanceDate = (dateStr) => {
    if (!dateStr) return false;
    const selected = new Date(dateStr);
    const diffTime = selected.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 55; // 2 months or more
  };

  const isDateOpen = isAdvanceDate(scheduledDate);

  const timeSlots = isDateOpen
    ? [
        { slot: '08:00 AM - 10:00 AM', status: 'available', badge: 'Available' },
        { slot: '10:00 AM - 12:00 PM', status: 'available', badge: 'Available' },
        { slot: '01:00 PM - 03:00 PM', status: 'available', badge: 'Available' },
        { slot: '03:00 PM - 05:00 PM', status: 'available', badge: 'Available' },
        { slot: '05:00 PM - 07:00 PM', status: 'available', badge: 'Available' },
      ]
    : [
        { slot: '08:00 AM - 10:00 AM', status: 'booked', badge: 'Full' },
        { slot: '10:00 AM - 12:00 PM', status: 'booked', badge: 'Full' },
        { slot: '01:00 PM - 03:00 PM', status: 'booked', badge: 'Full' },
        { slot: '03:00 PM - 05:00 PM', status: 'booked', badge: 'Full' },
        { slot: '05:00 PM - 07:00 PM', status: 'booked', badge: 'Full' },
      ];

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!isDateOpen) {
      setError('This date is completely booked. Please choose an advance date (2+ months later on the calendar) where slots are open.');
      return;
    }

    if (!scheduledTime) {
      setError('Please select an available time slot.');
      return;
    }

    setLoading(true);
    setError('');

    const bookingPayload = {
      professionalId: currentPro._id,
      serviceId: selectedService.serviceId || currentPro._id,
      serviceName: selectedService.name,
      scheduledDate,
      scheduledTime,
      address: {
        addressLine,
        city,
        landmark,
      },
      price: selectedService.price || 299,
      notes,
    };

    let confirmedData = null;

    try {
      const res = await axios.post('/api/bookings', bookingPayload);
      if (res.data?.success && res.data.data) {
        confirmedData = res.data.data;
      }
    } catch (err) {
      // Gracefully handle unauthenticated/demo mode by creating local verified booking
    } finally {
      setLoading(false);
    }

    if (!confirmedData) {
      // Create confirmed demo booking object
      confirmedData = {
        _id: 'bk_' + Date.now(),
        bookingNumber: 'LX-' + Math.floor(1000 + Math.random() * 9000),
        customer: {
          name: 'You (Verified Customer)',
          email: 'customer@localx.app',
          phone: '+91 98301 23456',
        },
        professional: {
          businessName: currentPro.businessName,
          userId: currentPro.userId,
        },
        serviceName: selectedService.name,
        category: currentPro.category,
        scheduledDate,
        scheduledTime,
        status: 'CONFIRMED',
        basePrice: selectedService.price || 299,
        address: {
          addressLine,
          city,
          landmark,
        },
        notes,
        createdAt: new Date().toISOString(),
      };
    }

    // Save to localStorage for Customer and Admin dashboards
    try {
      const existingCustomer = JSON.parse(localStorage.getItem('localx_customer_bookings') || '[]');
      localStorage.setItem('localx_customer_bookings', JSON.stringify([confirmedData, ...existingCustomer.filter((b) => b._id !== confirmedData._id)]));

      const existingAdmin = JSON.parse(localStorage.getItem('localx_admin_bookings') || '[]');
      localStorage.setItem('localx_admin_bookings', JSON.stringify([confirmedData, ...existingAdmin.filter((b) => b._id !== confirmedData._id)]));

      window.dispatchEvent(new Event('storage'));
    } catch (e) {}

    if (onSuccess) onSuccess(confirmedData);
    setConfirmedBooking(confirmedData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-lg p-5 sm:p-6 bg-[#0b1322] border border-slate-700/90 rounded-3xl shadow-2xl relative my-auto text-xs">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Confirmation Screen */}
        {confirmedBooking ? (
          <div className="text-center space-y-4 py-3">
            <div className="w-16 h-16 rounded-full bg-teal-500/20 border-2 border-teal-400 text-teal-400 flex items-center justify-center mx-auto text-2xl animate-pulse">
              ✓
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/30 inline-block">
                Advance Booking Confirmed
              </span>
              <h3 className="text-xl font-black text-white">Booking #{confirmedBooking.bookingNumber} Confirmed!</h3>
              <p className="text-xs text-slate-300">
                Your schedule slot with <strong>{currentPro.businessName}</strong> has been successfully booked.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Service</span>
                <span className="font-bold text-white text-right">{selectedService.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Scheduled Date & Slot</span>
                <span className="font-bold text-teal-300 text-right">
                  {scheduledDate} • {scheduledTime}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Service Location</span>
                <span className="font-semibold text-slate-200 text-right">
                  {addressLine}, {city}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-400 font-bold">Estimated Total</span>
                <span className="font-extrabold text-teal-400 text-sm">₹{selectedService.price || 299}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              <button
                onClick={() => {
                  onClose();
                  navigate('/customer');
                }}
                className="w-full sm:flex-1 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs transition shadow-lg shadow-teal-500/25"
              >
                View in Customer Dashboard
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700 transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Pro Header */}
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={currentPro.userId?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={currentPro.businessName}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-teal-500/40 shrink-0"
                />
                <div>
                  <span className="text-[10px] font-extrabold text-teal-400 uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Demo Specialist
                  </span>
                  <h3 className="text-base font-extrabold text-white">{currentPro.businessName}</h3>
                  <p className="text-[11px] text-slate-400">{currentPro.location?.address || currentPro.location?.city}</p>
                </div>
              </div>
              {alternativePro && (
                <button
                  type="button"
                  onClick={() => {
                    const next = alternativePro;
                    setCurrentPro(next);
                    setSelectedService(next.services?.[0] || selectedService);
                  }}
                  className="text-[11px] font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 border border-teal-500/30 px-2.5 py-1.5 rounded-xl hover:bg-teal-500/10 transition shrink-0"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Change Specialist</span>
                </button>
              )}
            </div>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {/* 1. Service Selection */}
              <div>
                <label className="block text-slate-300 font-bold mb-1.5">1. Select Service</label>
                <div className="space-y-2">
                  {currentPro.services?.map((svc, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedService(svc)}
                      className={`p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between gap-3 ${
                        selectedService?.name === svc.name
                          ? 'bg-teal-500/10 border-teal-500/60 shadow-md shadow-teal-500/10'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-white text-xs">{svc.name}</h4>
                        <p className="text-[11px] text-slate-400">{svc.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-black text-teal-400">₹{svc.price}</span>
                        <span className="text-[9px] text-slate-500 block uppercase font-bold">{svc.priceType || 'Starts at'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Select Schedule Date */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-slate-300 font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    <span>2. Select Schedule Date</span>
                  </label>
                  {!isDateOpen && (
                    <span className="text-[10px] text-amber-300 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                      Not available on this date
                    </span>
                  )}
                </div>

                {/* Quick 3-Day Presets: Today, Tomorrow, Day After */}
                <div className="grid grid-cols-3 gap-2 mb-2.5">
                  {[
                    { date: formatDateStr(today), label: 'Today' },
                    { date: formatDateStr(tomorrow), label: 'Tomorrow' },
                    { date: formatDateStr(dayAfter), label: 'Day After' },
                  ].map((d) => (
                    <button
                      key={d.date}
                      type="button"
                      title="Not available on this date"
                      onClick={() => {
                        setScheduledDate(d.date);
                        setScheduledTime('');
                        setError('');
                      }}
                      className={`p-2.5 rounded-2xl border text-center transition ${
                        scheduledDate === d.date
                          ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-sm'
                          : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span className="font-bold text-xs block">{d.label}</span>
                    </button>
                  ))}
                </div>

                {/* Manual Calendar Date Picker Platform */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-200 font-bold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-400" />
                      Pick Any Custom Date on Calendar:
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                        isDateOpen
                          ? 'bg-teal-500/15 text-teal-300 border-teal-500/40'
                          : 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {isDateOpen ? '🟢 Open Slots Available' : '⚠️ Not available on this date'}
                    </span>
                  </div>

                  {/* HTML5 Native Calendar Date Picker */}
                  <input
                    type="date"
                    value={scheduledDate}
                    min={formatDateStr(today)}
                    onChange={(e) => {
                      setScheduledDate(e.target.value);
                      if (isAdvanceDate(e.target.value)) {
                        setScheduledTime('10:00 AM - 12:00 PM');
                        setError('');
                      } else {
                        setScheduledTime('');
                      }
                    }}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-teal-400 cursor-pointer shadow-inner"
                  />

                  {/* Informative Status Banner */}
                  {!isDateOpen ? (
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                      <div>
                        <strong className="block font-bold text-amber-200">Not available on this date</strong>
                        This specialist has no open slots on this date. Please choose a date <strong>2 months later on the calendar ({formatDateStr(twoMonthsLater)} onwards)</strong> to reserve an open booking slot.
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-[11px] flex items-start gap-2">
                      <Check className="w-4 h-4 shrink-0 text-teal-400 mt-0.5" />
                      <div>
                        <strong className="block font-bold text-teal-200">Advance Date Selected: {scheduledDate}</strong>
                        Open schedule slots available for this date! Please choose an available time slot below.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Time Slots */}
              <div>
                <label className="block text-slate-300 font-bold mb-1.5 flex items-center justify-between">
                  <span>3. Select Time Slot</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {isDateOpen ? '5 Slots Available' : '0 Slots Available for near-term'}
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timeSlots.map((item, idx) => {
                    const isBooked = item.status === 'booked';
                    const isSelected = scheduledTime === item.slot;

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={isBooked}
                        onClick={() => setScheduledTime(item.slot)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-left transition ${
                          isBooked
                            ? 'bg-slate-950/60 border-slate-900 text-slate-600 cursor-not-allowed opacity-60'
                            : isSelected
                            ? 'bg-teal-500/20 border-teal-400 text-white font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className={`w-3.5 h-3.5 ${isBooked ? 'text-slate-600' : 'text-teal-400'}`} />
                          <span className="text-[11px]">{item.slot}</span>
                        </div>

                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                            isBooked
                              ? 'bg-rose-950/50 text-rose-400 border border-rose-900/40'
                              : 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                          }`}
                        >
                          {item.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Service Location */}
              <div className="space-y-2 pt-1 border-t border-slate-800">
                <label className="block text-slate-300 font-bold">4. Service Location</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Door No, Building, Street"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Landmark (e.g. Near Metro Station)"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              {/* 5. Special Notes */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">5. Special Instructions (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Please bring an extension cord or tools"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                />
              </div>

              {/* Price Summary & Submit */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Estimated Total</span>
                  <span className="text-base font-extrabold text-teal-400">
                    ₹{selectedService.price || 299}
                  </span>
                </div>

                {!isDateOpen ? (
                  <button
                    type="button"
                    onClick={() => {
                      setScheduledDate(formatDateStr(twoMonthsLater));
                      setScheduledTime('10:00 AM - 12:00 PM');
                      setError('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold transition shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
                  >
                    <span>Pick 2 Months Ahead (Open Slot)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !scheduledTime}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold transition shadow-lg ${
                      loading || !scheduledTime
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        : 'bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-teal-500/25'
                    }`}
                  >
                    {loading ? 'Confirming...' : 'Confirm Booking Request'}
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
