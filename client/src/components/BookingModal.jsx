import React, { useState } from 'react';
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

  // Active Specialist (Supports 1-click switching to alternative specialist)
  const [currentPro, setCurrentPro] = useState(professional);

  // Find alternative specialist in the same category
  const alternativePro = FALLBACK_PROS.find(
    (p) =>
      (p.category === currentPro.category || p.skills?.[0] === currentPro.skills?.[0]) &&
      p._id !== currentPro._id
  ) || FALLBACK_PROS.find((p) => p._id !== currentPro._id);

  const isHighDemandBooked = currentPro.availabilityType === 'booked_until_nov';

  // Selected Service
  const [selectedService, setSelectedService] = useState(
    initialService || currentPro?.services?.[0] || { name: 'Standard Service Consultation', price: 299 }
  );

  // Month selection for high-demand pros: 'sep', 'oct', 'nov'
  const [selectedMonth, setSelectedMonth] = useState(isHighDemandBooked ? 'sep' : 'sep');

  // Dates
  const today = new Date();
  const tomorrow = new Date(Date.now() + 86400000);
  const dayAfter = new Date(Date.now() + 86400000 * 2);
  const novDate1 = '2026-11-02';
  const novDate2 = '2026-11-03';
  const novDate3 = '2026-11-04';

  const formatDateStr = (d) => d.toISOString().split('T')[0];

  const [scheduledDate, setScheduledDate] = useState(
    isHighDemandBooked ? formatDateStr(today) : formatDateStr(tomorrow)
  );
  const [scheduledTime, setScheduledTime] = useState(isHighDemandBooked ? '' : '01:00 PM - 03:00 PM');

  // Address & Notes
  const [addressLine, setAddressLine] = useState('#402, Sunshine Heights, 12th Main, Salt Lake');
  const [city, setCity] = useState(currentPro?.location?.city || 'Kolkata');
  const [landmark, setLandmark] = useState('Near Metro Station');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Date Availability Logic
  const getAvailabilityStatus = (dateStr) => {
    if (isHighDemandBooked) {
      if (dateStr.startsWith('2026-09') || dateStr.startsWith('2026-10') || dateStr === formatDateStr(today) || dateStr === formatDateStr(tomorrow)) {
        return {
          status: 'booked',
          badge: 'Fully Booked',
          badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
          message: 'No open slots in September or October. Nearest open availability begins in November 2026.',
        };
      }
      return {
        status: 'available',
        badge: 'Available',
        badgeColor: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
        message: 'Multiple slots open for November 2026.',
      };
    } else {
      // Rapid response pro: available now
      if (dateStr === formatDateStr(today)) {
        return {
          status: 'booked',
          badge: 'Booked Today',
          badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          message: 'Today’s schedule is full. Tomorrow is wide open!',
        };
      }
      return {
        status: 'available',
        badge: 'Slots Open',
        badgeColor: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
        message: 'Open slots available for fast dispatch!',
      };
    }
  };

  const getTimeSlotsForDate = (dateStr) => {
    if (isHighDemandBooked && (dateStr.startsWith('2026-09') || dateStr.startsWith('2026-10') || dateStr === formatDateStr(today))) {
      return [
        { slot: '08:00 AM - 10:00 AM', status: 'booked', reason: 'Booked by neighbor' },
        { slot: '10:00 AM - 12:00 PM', status: 'booked', reason: 'High demand job' },
        { slot: '01:00 PM - 03:00 PM', status: 'booked', reason: 'Scheduled service' },
        { slot: '03:00 PM - 05:00 PM', status: 'booked', reason: 'In transit' },
      ];
    }

    return [
      { slot: '08:00 AM - 10:00 AM', status: 'available', reason: 'Open' },
      { slot: '10:00 AM - 12:00 PM', status: 'available', reason: 'Open' },
      { slot: '01:00 PM - 03:00 PM', status: 'available', reason: 'Open' },
      { slot: '03:00 PM - 05:00 PM', status: 'available', reason: 'Open' },
      { slot: '05:00 PM - 07:00 PM', status: 'available', reason: 'Open' },
    ];
  };

  const currentSlotInfo = getAvailabilityStatus(scheduledDate);
  const isDateFullyBooked = currentSlotInfo.status === 'booked';
  const currentSlots = getTimeSlotsForDate(scheduledDate);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!scheduledTime) {
      setError('Please select an available time slot.');
      return;
    }

    if (isDateFullyBooked) {
      setError('This date is completely booked. Please choose tomorrow or later.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/bookings', {
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
      });

      if (res.data.success) {
        if (onSuccess) onSuccess(res.data.data);
        onClose();
        navigate('/customer');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit booking request. Please check login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-lg p-6 bg-[#0b1322] border border-slate-700/80 rounded-3xl shadow-2xl relative my-8 text-xs">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

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
                {isHighDemandBooked ? 'High Demand Specialist (Peak Volume)' : 'Quick Response Specialist'}
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
                if (next.availabilityType === 'available_now') {
                  setScheduledDate(formatDateStr(tomorrow));
                  setScheduledTime('01:00 PM - 03:00 PM');
                } else {
                  setScheduledDate(formatDateStr(today));
                  setScheduledTime('');
                }
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
            <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto pr-1">
              {currentPro.services?.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedService(s)}
                  className={`p-2.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    selectedService.name === s.name
                      ? 'bg-teal-500/15 border-teal-500/60 text-white'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-white text-xs">{s.name}</p>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{s.description}</p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="text-xs font-extrabold text-teal-400">₹{s.price}</span>
                    <span className="block text-[9px] text-slate-400 uppercase font-semibold">
                      {s.priceType === 'starts_at' ? 'Starts at' : 'Fixed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Month & Date Selection */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-slate-300 font-bold">2. Select Schedule Date</label>
              {isHighDemandBooked && isDateFullyBooked && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMonth('nov');
                    setScheduledDate(novDate1);
                    setScheduledTime('10:00 AM - 12:00 PM');
                  }}
                  className="text-teal-400 hover:text-teal-300 text-[11px] font-bold flex items-center gap-1"
                >
                  <span>Jump to November Availability</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Month Tabs for High-Demand Pro */}
            {isHighDemandBooked ? (
              <div className="space-y-2 mb-2">
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMonth('sep');
                      setScheduledDate(formatDateStr(today));
                      setScheduledTime('');
                    }}
                    className={`py-1.5 rounded-xl text-center text-[11px] font-bold transition ${
                      selectedMonth === 'sep'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Sep 2026 <span className="text-[9px] block text-rose-400 font-semibold">(Booked)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMonth('oct');
                      setScheduledDate('2026-10-15');
                      setScheduledTime('');
                    }}
                    className={`py-1.5 rounded-xl text-center text-[11px] font-bold transition ${
                      selectedMonth === 'oct'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Oct 2026 <span className="text-[9px] block text-rose-400 font-semibold">(Booked)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMonth('nov');
                      setScheduledDate(novDate1);
                      setScheduledTime('10:00 AM - 12:00 PM');
                    }}
                    className={`py-1.5 rounded-xl text-center text-[11px] font-bold transition ${
                      selectedMonth === 'nov'
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Nov 2026 <span className="text-[9px] block text-teal-400 font-semibold">(🟢 Available)</span>
                  </button>
                </div>

                {/* Date slots for selected month */}
                {selectedMonth === 'nov' ? (
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { date: novDate1, label: 'Mon, Nov 02' },
                      { date: novDate2, label: 'Tue, Nov 03' },
                      { date: novDate3, label: 'Wed, Nov 04' },
                    ].map((d) => (
                      <button
                        key={d.date}
                        type="button"
                        onClick={() => {
                          setScheduledDate(d.date);
                          setScheduledTime('10:00 AM - 12:00 PM');
                        }}
                        className={`p-2 rounded-2xl border text-center transition ${
                          scheduledDate === d.date
                            ? 'bg-teal-500/20 border-teal-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="font-bold text-[11px] text-white block">{d.label}</span>
                        <span className="text-[9px] text-teal-400 font-bold">🟢 Open Slots</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { date: formatDateStr(today), label: 'Today' },
                      { date: formatDateStr(tomorrow), label: 'Tomorrow' },
                      { date: formatDateStr(dayAfter), label: 'Upcoming' },
                    ].map((d) => (
                      <button
                        key={d.date}
                        type="button"
                        disabled
                        className="p-2 rounded-2xl border border-rose-900/40 bg-rose-950/20 text-center opacity-70 cursor-not-allowed"
                      >
                        <span className="font-bold text-[11px] text-rose-300 block">{d.label}</span>
                        <span className="text-[9px] text-rose-400 font-bold">🔴 Fully Booked</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Rapid Response Pro Date Grid */
              <div className="grid grid-cols-3 gap-2 mb-2">
                {[
                  { date: formatDateStr(today), label: 'Today', badge: 'Full', booked: true },
                  { date: formatDateStr(tomorrow), label: 'Tomorrow', badge: '🟢 Open Slots', booked: false },
                  { date: formatDateStr(dayAfter), label: 'Day After', badge: '🟢 Open Slots', booked: false },
                ].map((d) => (
                  <button
                    key={d.date}
                    type="button"
                    disabled={d.booked}
                    onClick={() => {
                      setScheduledDate(d.date);
                      setScheduledTime('01:00 PM - 03:00 PM');
                    }}
                    className={`p-2.5 rounded-2xl border text-center transition ${
                      scheduledDate === d.date
                        ? 'bg-teal-500/20 border-teal-400 text-white'
                        : d.booked
                        ? 'bg-slate-950/60 border-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold text-[11px] text-white block">{d.label}</span>
                    <span className="text-[9px] font-bold mt-0.5 block text-teal-400">{d.badge}</span>
                  </button>
                ))}
              </div>
            )}

            {/* High Demand Warning & Alternative Specialist Switcher */}
            {isHighDemandBooked && isDateFullyBooked && (
              <div className="space-y-2 mt-2">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-amber-200">September & October Fully Booked</strong>
                    This specialist is booked due to high seasonal volume. Earliest open slots begin in <strong>November 2026</strong>.
                  </div>
                </div>

                {alternativePro && (
                  <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-teal-300 text-xs flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                        Need faster service?
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40">
                        Available Tomorrow
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Verified partner specialist <strong>{alternativePro.businessName}</strong> ({alternativePro.rating} ★) in this category has open slots available tomorrow.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentPro(alternativePro);
                        setSelectedService(alternativePro.services?.[0] || selectedService);
                        setScheduledDate(formatDateStr(tomorrow));
                        setScheduledTime('01:00 PM - 03:00 PM');
                      }}
                      className="w-full py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-md shadow-teal-500/20"
                    >
                      <span>Switch to {alternativePro.businessName} (Available Tomorrow)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. Time Slots */}
          <div>
            <label className="block text-slate-300 font-bold mb-1.5">3. Select Time Slot</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentSlots.map((item, idx) => {
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
                      {isBooked ? 'Booked' : 'Available'}
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
                placeholder="Landmark (e.g. Near Metro)"
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
              placeholder="e.g. Please bring an extension cord or AC ladder"
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

            {isDateFullyBooked ? (
              <button
                type="button"
                onClick={() => {
                  setScheduledDate(formatDateStr(tomorrow));
                  setScheduledTime('01:00 PM - 03:00 PM');
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold transition shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
              >
                <span>Select Available Date</span>
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
                {loading ? 'Submitting...' : 'Confirm Booking Request'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
