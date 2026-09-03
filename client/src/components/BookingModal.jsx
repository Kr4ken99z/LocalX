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
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BookingModal({ professional, initialService = null, onClose, onSuccess }) {
  const navigate = useNavigate();

  // Selected Service
  const [selectedService, setSelectedService] = useState(
    initialService || professional?.services?.[0] || { name: 'Standard Service Consultation', price: 299 }
  );

  // Helper dates (Today, Tomorrow, Day +2, Day +3, Day +4)
  const today = new Date();
  const tomorrow = new Date(Date.now() + 86400000);
  const dayAfter = new Date(Date.now() + 86400000 * 2);
  const day3 = new Date(Date.now() + 86400000 * 3);

  const formatDateStr = (d) => d.toISOString().split('T')[0];
  const formatDayName = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  // Date selection (Defaults to Tomorrow since Today is booked up)
  const [scheduledDate, setScheduledDate] = useState(formatDateStr(today)); // Initially today to demonstrate "Not available" behavior
  const [scheduledTime, setScheduledTime] = useState('');

  // Address & Notes
  const [addressLine, setAddressLine] = useState('#402, Sunshine Heights, 12th Main, Salt Lake');
  const [city, setCity] = useState(professional?.location?.city || 'Kolkata');
  const [landmark, setLandmark] = useState('Near Metro Station');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Date availability configuration
  const dateAvailability = {
    [formatDateStr(today)]: {
      label: 'Today',
      status: 'booked',
      badge: 'Fully Booked',
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      message: 'This specialist is fully booked for today. Please select tomorrow or a later date.',
    },
    [formatDateStr(tomorrow)]: {
      label: 'Tomorrow',
      status: 'limited',
      badge: '2 Slots Left',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      message: 'Filling fast! Only afternoon slots remaining.',
    },
    [formatDateStr(dayAfter)]: {
      label: formatDayName(dayAfter),
      status: 'available',
      badge: 'Available',
      badgeColor: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
      message: 'Multiple slots available throughout the day.',
    },
    [formatDateStr(day3)]: {
      label: formatDayName(day3),
      status: 'available',
      badge: 'Available',
      badgeColor: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
      message: 'Full schedule open.',
    },
  };

  // Time slot configurations per date
  const getTimeSlotsForDate = (dateStr) => {
    if (dateStr === formatDateStr(today)) {
      return [
        { slot: '08:00 AM - 10:00 AM', status: 'booked', reason: 'Booked by neighbor' },
        { slot: '10:00 AM - 12:00 PM', status: 'booked', reason: 'On active job' },
        { slot: '01:00 PM - 03:00 PM', status: 'booked', reason: 'Scheduled appointment' },
        { slot: '03:00 PM - 05:00 PM', status: 'booked', reason: 'In transit' },
        { slot: '05:00 PM - 07:00 PM', status: 'booked', reason: 'Evening emergency roster' },
      ];
    } else if (dateStr === formatDateStr(tomorrow)) {
      return [
        { slot: '08:00 AM - 10:00 AM', status: 'booked', reason: 'Booked' },
        { slot: '10:00 AM - 12:00 PM', status: 'booked', reason: 'Booked' },
        { slot: '01:00 PM - 03:00 PM', status: 'available', reason: 'Open' },
        { slot: '03:00 PM - 05:00 PM', status: 'available', reason: 'Open' },
        { slot: '05:00 PM - 07:00 PM', status: 'booked', reason: 'Booked' },
      ];
    } else {
      return [
        { slot: '08:00 AM - 10:00 AM', status: 'available', reason: 'Open' },
        { slot: '10:00 AM - 12:00 PM', status: 'available', reason: 'Open' },
        { slot: '01:00 PM - 03:00 PM', status: 'available', reason: 'Open' },
        { slot: '03:00 PM - 05:00 PM', status: 'available', reason: 'Open' },
        { slot: '05:00 PM - 07:00 PM', status: 'available', reason: 'Open' },
      ];
    }
  };

  const currentSlots = getTimeSlotsForDate(scheduledDate);
  const isDateFullyBooked = dateAvailability[scheduledDate]?.status === 'booked';

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
        professionalId: professional._id,
        serviceId: selectedService.serviceId || professional._id,
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
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-800">
          <img
            src={professional.userId?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
            alt={professional.businessName}
            className="w-12 h-12 rounded-2xl object-cover border-2 border-teal-500/40 shrink-0"
          />
          <div>
            <span className="text-[10px] font-extrabold text-teal-400 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Local Specialist
            </span>
            <h3 className="text-base font-extrabold text-white">{professional.businessName}</h3>
            <p className="text-[11px] text-slate-400">{professional.location?.address || professional.location?.city}</p>
          </div>
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
            <div className="grid grid-cols-1 gap-2 max-h-36 overflow-y-auto pr-1">
              {professional.services?.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedService(s)}
                  className={`p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
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

          {/* 2. Date Selection (With nearest date unavailable banner) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-slate-300 font-bold">2. Select Date</label>
              {isDateFullyBooked && (
                <button
                  type="button"
                  onClick={() => {
                    setScheduledDate(formatDateStr(tomorrow));
                    setScheduledTime('01:00 PM - 03:00 PM');
                  }}
                  className="text-teal-400 hover:text-teal-300 text-[11px] font-bold flex items-center gap-1"
                >
                  <span>Jump to Tomorrow</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {Object.entries(dateAvailability).map(([dStr, info]) => (
                <button
                  key={dStr}
                  type="button"
                  onClick={() => {
                    setScheduledDate(dStr);
                    setScheduledTime('');
                  }}
                  className={`p-2 rounded-2xl border flex flex-col items-center text-center transition ${
                    scheduledDate === dStr
                      ? 'bg-teal-500/20 border-teal-400 text-white shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold text-[11px] text-white">{info.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 mt-1 rounded-md border font-bold ${info.badgeColor}`}>
                    {info.badge}
                  </span>
                </button>
              ))}
            </div>

            {/* Nearest Date Unavailable Banner */}
            {isDateFullyBooked ? (
              <div className="mt-2.5 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <div>
                  <strong className="block font-bold text-amber-200">Nearest Date Fully Booked</strong>
                  This specialist has no open slots remaining for today. Please click <strong>Tomorrow</strong> or a later date above to choose an open slot.
                </div>
              </div>
            ) : (
              <div className="mt-2 p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-[11px] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>{dateAvailability[scheduledDate]?.message}</span>
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
