import React from 'react';
import { Link } from 'react-router-dom';
import CmsImage from '@/components/CmsImage';

const machines = [
  { name: 'PDC 900 TON', qty: '1', detail: 'Cold chamber aluminium' },
  { name: 'PDC 400 TON', qty: '1', detail: 'Cold chamber aluminium' },
  { name: 'PDC 300 TON', qty: '1', detail: 'Cold chamber aluminium' },
  { name: 'PDC 200 TON', qty: '1', detail: 'Cold chamber aluminium' },
  { name: 'PDC 180 TON', qty: '1', detail: 'Cold chamber aluminium' },
  { name: 'PDC 120 TON', qty: '1', detail: 'Cold chamber aluminium' },
  { name: 'HOT CHAMBER 90 & 140T', qty: '3', detail: 'Zinc die casting' },
  { name: 'VMC JAEWOO ART 350 S+', qty: '1', detail: '±0.007mm accuracy' },
  { name: 'CNC MILLING LK TC SERIES', qty: '1', detail: '12,000 RPM spindle' },
];

export default function InfrastructureSection() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-12 max-w-[120rem] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left: Factory Image */}
        <div className="lg:col-span-7 relative group rounded-sm overflow-hidden border border-slate-900">
          <CmsImage
            imageKey="home_facility"
            fallback="https://media.base44.com/images/public/6a56844a4813d002cc377ca4/2a22bc325_generated_90b9f85d.png"
            alt="Yashraj Enterprises manufacturing floor"
            className="w-full aspect-[16/10] object-cover filter brightness-[0.6] group-hover:brightness-[0.7] group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>

          {/* Overlay indicators */}
          <div className="absolute top-[28%] left-[22%] z-20 group/ind">
            <span className="absolute inline-flex h-4 w-4 rounded-full bg-rose-500 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-600 border border-white cursor-pointer"></span>
            <div className="absolute top-6 left-0 bg-slate-950/95 border border-slate-800 p-3 rounded-sm shadow-xl w-52 opacity-0 group-hover/ind:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="text-[10px] font-mono text-rose-400 block mb-1">STATION 01</span>
              <p className="text-xs text-white font-semibold">High-Pressure Die Casting Bay</p>
            </div>
          </div>

          <div className="absolute bottom-[38%] right-[28%] z-20 group/ind2">
            <span className="absolute inline-flex h-4 w-4 rounded-full bg-cyan-500 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-600 border border-white cursor-pointer"></span>
            <div className="absolute top-6 left-0 bg-slate-950/95 border border-slate-800 p-3 rounded-sm shadow-xl w-52 opacity-0 group-hover/ind2:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="text-[10px] font-mono text-cyan-400 block mb-1">STATION 02</span>
              <p className="text-xs text-white font-semibold">Melting & Holding Furnace Grid</p>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
              <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
              <span>FACILITY: PLOT NO. PAP-94, PHASE 3, CHAKAN INDUSTRIAL AREA, PUNE 410501</span>
            </div>
          </div>
        </div>

        {/* Right: Spec list */}
        <div className="lg:col-span-5 space-y-8">
          <span className="text-[10px] font-mono text-rose-500 tracking-[0.3em] uppercase block">THE INFRASTRUCTURE</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase text-white leading-tight">
            ADVANCED<br />FLOOR MATRIX.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Our 9,500 sq.ft. permanent factory at Chakan Industrial Area houses a complete manufacturing ecosystem — from melting furnaces to precision CNC machining and quality inspection labs.
          </p>

          <div className="space-y-0 border-t border-slate-900">
            {machines.map((m, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-slate-900/50 hover:bg-slate-900/20 px-0 transition-colors">
                <div>
                  <span className="text-sm font-semibold text-slate-300">{m.name}</span>
                  <span className="text-[11px] font-mono text-slate-600 block">{m.detail}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-white block">QTY: {m.qty}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-sm">
              <span className="text-lg font-bold text-white block">200 HP</span>
              <span className="text-[11px] font-mono text-slate-500 uppercase">MSEB Power</span>
            </div>
            <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-sm">
              <span className="text-lg font-bold text-white block">125 KvA</span>
              <span className="text-[11px] font-mono text-slate-500 uppercase">Generator Backup</span>
            </div>
          </div>

          <Link to="/infrastructure" className="inline-flex items-center gap-2 text-xs font-mono text-rose-500 hover:text-rose-400 tracking-widest uppercase transition-colors">
            View Full Infrastructure →
          </Link>
        </div>
      </div>
    </section>
  );
}