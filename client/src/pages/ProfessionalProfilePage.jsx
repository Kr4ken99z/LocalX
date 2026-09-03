import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
  Award,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  Briefcase,
  AlertTriangle,
} from 'lucide-react';
import TrustScoreBadge from '../components/TrustScoreBadge';
import BookingModal from '../components/BookingModal';
import { useAuth } from '../context/AuthContext';
import { FALLBACK_PROS } from '../utils/mockData';

export default function ProfessionalProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pro, setPro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeBookingService, setActiveBookingService] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const fetchPro = async () => {
      try {
        const res = await axios.get(`/api/professionals/${id}`);
        if (res.data.success && res.data.data) {
          setPro(res.data.data);
          setLoading(false);
          return;
        }
      } catch (err) {}
      const fallback = FALLBACK_PROS.find((p) => p._id === id) || FALLBACK_PROS[0];
      setPro(fallback);
      setLoading(false);
    };
    fetchPro();
  }, [id]);

  const handleStartChat = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Generate conversation room id
    const convId = `conv_${user.id}_${pro.userId?._id}`;
    navigate(`/messages?convId=${convId}&targetUserId=${pro.userId?._id}&targetName=${encodeURIComponent(pro.businessName)}`);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-xs text-slate-400">Loading specialist profile...</p>
      </div>
    );
  }

  if (!pro) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-lg font-bold text-white">Specialist Not Found</h2>
        <p className="text-xs text-slate-400">The requested professional profile could not be located.</p>
        <Link to="/explore" className="px-4 py-2 bg-teal-400 text-slate-950 text-xs font-bold rounded-xl inline-block">
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Link */}
      <Link to="/explore" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-400 transition">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Specialist Directory</span>
      </Link>

      {/* Header Profile Hero Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={pro.userId?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={pro.businessName}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-teal-500/40 shadow-xl shadow-teal-500/10"
            />
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{pro.businessName}</h1>
                {pro.verificationStatus === 'VERIFIED' && (
                  <span className="flex items-center gap-1 text-xs font-bold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Government ID & Trade Verified
                  </span>
                )}
              </div>

              {pro.ownerName && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Lead Specialist:</span>
                  <span className="text-white font-extrabold bg-slate-800/90 px-2.5 py-0.5 rounded-lg border border-slate-700">
                    {pro.ownerName}
                  </span>
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">{pro.tagline || pro.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1 font-bold text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {pro.rating || 4.8} ({pro.totalReviews || 0} reviews)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  {pro.location?.address || 'Bengaluru'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-teal-400" />
                  {pro.experienceYears || 5} Years In Business
                </span>
              </div>

              <div className="pt-2">
                <TrustScoreBadge score={pro.trustScore || 85} tier={pro.trustTier || 'Rising Pro'} />
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => {
                setActiveBookingService(pro.services?.[0] || null);
                setIsBookingOpen(true);
              }}
              className="flex-1 md:flex-initial px-6 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs transition shadow-lg shadow-teal-500/20 text-center"
            >
              Book Specialist
            </button>
            <button
              onClick={handleStartChat}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs transition"
            >
              <MessageSquare className="w-4 h-4 text-teal-400" />
              <span>Direct Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Services Menu & Booking Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Services & Experience */}
        <div className="lg:col-span-2 space-y-8">
          {/* Services Offered */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Services & Standard Pricing</span>
            </h3>
            <p className="text-xs text-slate-400">
              Clear, transparent upfront pricing with no surprise charges at the door.
            </p>

            <div className="space-y-3 pt-2">
              {pro.services?.map((service, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-white">{service.name}</h4>
                    <p className="text-xs text-slate-400">{service.description || 'Standard professional execution with safety audit.'}</p>
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-900 text-teal-400 text-[10px] font-semibold">
                      {service.priceType === 'fixed' ? 'Fixed Price' : 'Starts at'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                    <span className="text-base font-extrabold text-teal-400">₹{service.price}</span>
                    <button
                      onClick={() => {
                        setActiveBookingService(service);
                        setIsBookingOpen(true);
                      }}
                      className="px-4 py-1.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold transition shadow-sm"
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About & Skills */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-base font-extrabold text-white">About & Expertise</h3>
            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
              {pro.description}
            </p>

            <div className="pt-2">
              <span className="text-xs font-bold text-slate-400 block mb-2">Verified Skills & Tools</span>
              <div className="flex flex-wrap gap-2">
                {pro.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-slate-900 text-teal-300 border border-slate-800 text-xs font-medium"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Verified Customer Reviews ({pro.reviews?.length || 0})</span>
              </h3>
              <span className="text-xs font-bold text-amber-400">{pro.rating} Overall Rating</span>
            </div>

            {pro.reviews && pro.reviews.length > 0 ? (
              <div className="space-y-4 pt-2">
                {pro.reviews.map((rev) => (
                  <div key={rev._id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.customerId?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                          alt={rev.customerId?.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <p className="text-xs font-bold text-white">{rev.customerId?.name || 'Local Customer'}</p>
                          <p className="text-[10px] text-slate-500">{new Date(rev.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic py-2">No reviews recorded yet for this specialist.</p>
            )}
          </div>
        </div>

        {/* Right Sidebar: Availability & Credentials */}
        <div className="space-y-6">
          {/* Availability Card */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>Availability & Schedule</span>
            </h4>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Current Status:</span>
                <span className="text-teal-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                  Accepting Requests
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Working Hours:</span>
                <span className="text-white font-medium">{pro.availability?.workingHours || '08:00 AM - 08:30 PM'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Operating Days:</span>
                <span className="text-white font-medium">Mon - Sat</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Service Radius:</span>
                <span className="text-white font-medium">{pro.serviceRadius || 15} km</span>
              </div>
            </div>
          </div>

          {/* Verification Documents Summary */}
          <div className="glass-panel p-6 rounded-3xl space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Platform Governance Audit</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Government Issued Photo ID Verified</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Trade Certificate & Skill Tested</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Local Address Proof Confirmed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingModal
          professional={pro}
          initialService={activeBookingService}
          onClose={() => setIsBookingOpen(false)}
          onSuccess={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
}
