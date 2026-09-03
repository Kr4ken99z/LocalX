import React, { useState } from 'react';
import { ShieldCheck, Info, X, Award, CheckCircle2, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

export default function TrustScoreBadge({ score = 85, tier = 'Rising Pro', breakdown = null, showDetailsButton = true }) {
  const [isOpen, setIsOpen] = useState(false);

  // Compute color scheme based on score
  let badgeColor = 'bg-teal-500/10 text-teal-400 border-teal-500/30';
  let badgeGlow = 'glow-teal';
  if (score >= 90) {
    badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40';
  } else if (score >= 75) {
    badgeColor = 'bg-teal-500/10 text-teal-300 border-teal-500/30';
  } else if (score >= 60) {
    badgeColor = 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
  } else {
    badgeColor = 'bg-amber-500/10 text-amber-300 border-amber-500/30';
  }

  const defaultBreakdown = breakdown || {
    verification: 25,
    rating: Math.round((score * 0.35)),
    completedJobs: 16,
    responseRate: 10,
    cancellationRate: 9,
  };

  return (
    <>
      <div className="inline-flex items-center gap-1.5">
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeColor} transition-all`}
          title={`Trust Score: ${score}/100 (${tier})`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Trust: <strong className="font-bold">{score}</strong>/100</span>
          <span className="hidden sm:inline-block text-[11px] opacity-80">• {tier}</span>
        </div>

        {showDetailsButton && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="p-1 text-slate-400 hover:text-teal-400 transition-colors"
            title="How is Trust Score calculated?"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Trust Score Breakdown Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md p-6 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/30">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">LocalX Deterministic Trust Score</h3>
                <p className="text-xs text-slate-400">Algorithmic safety & quality rating ({score}/100)</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Every professional on LocalX has a transparent, objective Trust Score computed deterministically by our governance engine:
            </p>

            <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  Government & License Verification
                </span>
                <span className="font-semibold text-teal-400">+{defaultBreakdown.verification} / 25 pts</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-300">
                  <Award className="w-4 h-4 text-amber-400" />
                  Verified Customer Ratings (5★ Scale)
                </span>
                <span className="font-semibold text-amber-400">+{defaultBreakdown.rating} / 35 pts</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-300">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  Completed Jobs Track Record
                </span>
                <span className="font-semibold text-cyan-400">+{defaultBreakdown.completedJobs} / 20 pts</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  Response Speed & Availability
                </span>
                <span className="font-semibold text-indigo-400">+{defaultBreakdown.responseRate} / 10 pts</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-300">
                  <AlertTriangle className="w-4 h-4 text-emerald-400" />
                  Reliability & Low Cancellation
                </span>
                <span className="font-semibold text-emerald-400">+{defaultBreakdown.cancellationRate} / 10 pts</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Current Status Tier:</span>
              <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30">
                {tier}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
