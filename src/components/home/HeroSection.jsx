import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CmsImage from '@/components/CmsImage';

export default function HeroSection({ onInquiry }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 lg:pt-20 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <CmsImage
          imageKey="home_hero"
          fallback="https://media.base44.com/images/public/6a56844a4813d002cc377ca4/67eb2594f_image.png"
          alt="Yashraj Enterprises die casting factory floor — Chakan, Pune"
          className="w-full h-full object-cover"
          eager
        />
      </div>

      {/* Black-transparent gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 via-slate-950/50 to-slate-950/20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-slate-950/60"></div>

      {/* Text content */}
      <div className={`relative z-10 w-full max-w-2xl px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 py-12 lg:py-0 transition-all duration-700 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
        {/* Label */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-10 h-[2px] bg-rose-600 shrink-0"></span>
          <span className="text-[9px] sm:text-[10px] md:text-xs font-medium text-slate-300 tracking-[0.2em] uppercase whitespace-nowrap">
            Yashraj Enterprise — Chakan, Pune 410501
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-[-0.03em] leading-[1.08] text-white mb-6 lg:mb-8">
          Engineering Precision.
          <br />
          <span className="text-rose-600">Delivered Reliably.</span>
        </h1>

        {/* Body text */}
        <p className="text-slate-300 text-[13px] sm:text-sm md:text-base leading-[1.7] mb-8 lg:mb-10 max-w-xl font-light tracking-wide">
          We cast, machine, and inspect aluminium components — in-house, at Chakan. No sub-contracting. When your drawing comes in, one team handles it from first shot to final dispatch.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={onInquiry}
            className="flex items-center justify-center gap-2 px-7 py-3.5 bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-[13px] font-semibold tracking-[0.05em] rounded transition-all duration-300 shadow-lg shadow-rose-600/20"
          >
            Request a Quote <ArrowRight className="w-4 h-4" />
          </button>
          <Link
            to="/capabilities"
            className="flex items-center justify-center gap-2 px-7 py-3.5 border border-slate-500/60 hover:border-rose-600 text-white text-xs sm:text-[13px] font-semibold tracking-[0.05em] rounded backdrop-blur-sm bg-slate-950/30 transition-all duration-300"
          >
            View Capabilities
          </Link>
        </div>
      </div>
    </section>
  );
}