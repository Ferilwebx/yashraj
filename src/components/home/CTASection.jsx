import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const points = ['72-hour technical response', 'DFM review included', 'ISO 9001:2015 certified', 'STEP, IGES, DWG accepted'];

export default function CTASection({ onInquiry }) {
  return (
    <section className="bg-slate-900/30 py-20 md:py-32 px-6 md:px-12 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(225,29,72,0.06),transparent_60%)]"></div>
      <div className="relative z-10 max-w-[120rem] mx-auto">
        <div className="max-w-3xl">
          <p className="text-[10px] font-medium text-rose-600 tracking-[0.2em] uppercase mb-3">GET STARTED</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">Send Us Your Drawings</h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">Our engineers review every enquiry technically — not a sales team. We'll confirm feasibility, flag any DFM concerns, and return a detailed quote within 72 hours.</p>
          <div className="grid grid-cols-2 gap-3 mb-10">
            {points.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-rose-600 rounded-full shrink-0"></span>
                <span className="text-xs text-slate-400">{p}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={onInquiry} className="flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold tracking-wide rounded transition-all duration-300">
              Request a Quote <ArrowRight className="w-4 h-4" />
            </button>
            <Link to="/contact" className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-700 hover:border-rose-600 text-white text-xs font-semibold tracking-wide rounded transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}