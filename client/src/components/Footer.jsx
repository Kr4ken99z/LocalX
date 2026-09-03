import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050b14] border-t border-slate-800/80 text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center">
                <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
              </div>
              <span className="font-extrabold text-xl text-white">Local<span className="text-teal-400">X</span></span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Nearby help, thoughtfully connected. Discover verified local professionals with clarity from the first click.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-teal-500/40 text-teal-300 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              <span>Built for your neighborhood</span>
            </div>
          </div>

          {/* ABOUT LOCALX */}
          <div className="space-y-3">
            <h4 className="text-amber-500 font-extrabold text-[11px] uppercase tracking-wider">About LocalX</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              LocalX is a hyperlocal service marketplace built around trust, transparent details, and location-aware discovery.
            </p>
            <p className="text-slate-300 font-semibold text-xs">
              Trust first. Local always.
            </p>
          </div>

          {/* EXPLORE */}
          <div className="space-y-3">
            <h4 className="text-amber-500 font-extrabold text-[11px] uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-slate-300 text-xs font-medium">
              <li>
                <Link to="/explore" className="hover:text-teal-400 transition">Find professionals</Link>
              </li>
              <li>
                <Link to="/register?role=professional" className="hover:text-teal-400 transition">Join as a professional</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-teal-400 transition">Sign in</Link>
              </li>
            </ul>
          </div>

          {/* POPULAR HELP */}
          <div className="space-y-3">
            <h4 className="text-amber-500 font-extrabold text-[11px] uppercase tracking-wider">Popular Help</h4>
            <ul className="space-y-2 text-slate-300 text-xs font-medium">
              <li>
                <Link to="/explore?service=electrician" className="hover:text-teal-400 transition">Electricians</Link>
              </li>
              <li>
                <Link to="/explore?service=plumber" className="hover:text-teal-400 transition">Plumbers</Link>
              </li>
              <li>
                <Link to="/explore?service=ac-repair" className="hover:text-teal-400 transition">AC technicians</Link>
              </li>
              <li>
                <Link to="/explore?service=cleaning" className="hover:text-teal-400 transition">Home cleaners</Link>
              </li>
            </ul>
          </div>

          {/* CONNECT */}
          <div className="space-y-3">
            <h4 className="text-amber-500 font-extrabold text-[11px] uppercase tracking-wider">Connect</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Follow the build, the ideas, and the person behind LocalX.
            </p>
            <div className="flex items-center gap-4 text-xs font-bold text-white pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-400 flex items-center gap-1 transition"
              >
                <span>GitHub</span>
                <span className="text-[10px]">↗</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-400 flex items-center gap-1 transition"
              >
                <span>LinkedIn</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching Screenshot 1 */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© 2026 LocalX. Nearby help, thoughtfully connected.</p>
          <p className="flex items-center gap-1.5 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
            <span>Designed for calmer service discovery.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
