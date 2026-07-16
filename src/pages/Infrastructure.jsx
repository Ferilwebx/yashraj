import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquirySheet from '@/components/InquirySheet';
import CmsImage from '@/components/CmsImage';

const machines = [
  { no: 1, machine: 'Pressure Die Casting', capacity: '900 TON', qty: 1, type: 'Cold Chamber Aluminium' },
  { no: 2, machine: 'Pressure Die Casting', capacity: '400 TON', qty: 1, type: 'Cold Chamber Aluminium' },
  { no: 3, machine: 'Pressure Die Casting', capacity: '300 TON', qty: 1, type: 'Cold Chamber Aluminium' },
  { no: 4, machine: 'Pressure Die Casting', capacity: '200 TON', qty: 1, type: 'Cold Chamber Aluminium' },
  { no: 5, machine: 'Pressure Die Casting', capacity: '180 TON', qty: 1, type: 'Cold Chamber Aluminium' },
  { no: 6, machine: 'Pressure Die Casting', capacity: '120 TON', qty: 1, type: 'Cold Chamber Aluminium' },
  { no: 7, machine: 'Hot Chamber Die Casting', capacity: '90 & 140 TON', qty: 3, type: 'Zinc Die Casting' },
  { no: 8, machine: 'Drilling Machine Auto Feed', capacity: '16"', qty: 4, type: 'Post-Casting Drilling' },
  { no: 9, machine: 'Shot Blasting', capacity: '100 KG', qty: 1, type: 'Surface Treatment' },
  { no: 10, machine: 'Sandering Machine', capacity: '3 HP', qty: 4, type: 'Surface Finishing' },
  { no: 11, machine: 'Compressor', capacity: '15 HP', qty: 2, type: 'Utility / Air Supply' },
  { no: 12, machine: 'Trimming Press Machine', capacity: '8 TON', qty: 1, type: 'Runner Trim Operations' },
  { no: 13, machine: 'Vibro Machine', capacity: '—', qty: 1, type: 'Vibrofinishing' },
  { no: 14, machine: 'Dryer', capacity: '—', qty: 1, type: 'Component Drying' },
  { no: 15, machine: 'Melting Furnace', capacity: '500 KG', qty: 1, type: 'Aluminium Melting' },
  { no: 16, machine: 'Melting Cum Holding Furnace', capacity: '500 KG', qty: 1, type: 'Aluminium Holding' },
  { no: 17, machine: 'Melting Cum Holding Furnace', capacity: '300 KG', qty: 2, type: 'Aluminium Holding' },
  { no: 18, machine: 'Melting Cum Holding Furnace', capacity: '200 KG', qty: 2, type: 'Aluminium Holding' },
  { no: 19, machine: 'VMC – JAEWOO ART 350 S+', capacity: '2090×1590×1960 mm', qty: 1, type: 'CNC Turning' },
  { no: 20, machine: 'CNC Milling – LK TC Series', capacity: '1350×410 mm', qty: 1, type: 'VMC Milling' },
];

const instruments = [
  { desc: 'Vernier Calliper', range: '0–200 mm', lc: '0.02 mm', qty: 1, make: 'Mitutoyo' },
  { desc: 'Vernier Calliper', range: '0–300 mm', lc: '0.02 mm', qty: 1, make: 'Mitutoyo' },
  { desc: 'Height Gauge', range: '0–800 mm', lc: '0.02 mm', qty: 1, make: 'Mitutoyo' },
  { desc: 'Micrometer I', range: '0–25 mm', lc: '0.01 mm', qty: 1, make: 'Mitutoyo' },
  { desc: 'Micrometer II', range: '25–50 mm', lc: '0.01 mm', qty: 1, make: 'Mitutoyo' },
  { desc: 'Micrometer III', range: '50–100 mm', lc: '0.01 mm', qty: 2, make: 'Mitutoyo' },
  { desc: 'Slip Gauges', range: '0.01 mm', lc: '—', qty: 4, make: 'Precision Grade' },
  { desc: 'Surface Plate', range: '1000×600 mm', lc: '—', qty: 1, make: 'Granite' },
  { desc: 'V Block', range: '—', lc: '—', qty: 4, make: 'Steel' },
  { desc: 'Spectrometer', range: 'Full Spectrum', lc: '—', qty: 1, make: 'In-House' },
];

export default function Infrastructure() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <Navbar onInquiry={() => setInquiryOpen(true)} />

      {/* Hero (DARK) */}
      <section className="bg-slate-950 text-slate-100 pt-24 pb-20 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <span className="text-[10px] font-mono text-rose-500 tracking-[0.3em] uppercase block mb-6">PLANT & EQUIPMENT</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-tight text-white mb-6">
            ADVANCED<br /><span className="text-rose-500">FLOOR</span><br />MATRIX.
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-3xl">
            Our 9,500 sq.ft. permanent facility at Chakan Industrial Area, Pune houses 20 production and auxiliary machines — forming a complete aluminium die casting and precision machining ecosystem.
          </p>
        </div>
      </section>

      {/* Factory Image (DARK) */}
      <section className="bg-slate-950 px-6 md:px-12 pb-16">
        <div className="max-w-[120rem] mx-auto">
          <div className="relative rounded-lg overflow-hidden border border-slate-800 group">
            <CmsImage
              imageKey="infrastructure_factory"
              fallback="https://media.base44.com/images/public/6a56844a4813d002cc377ca4/2a22bc325_generated_90b9f85d.png"
              alt="Yashraj Enterprises manufacturing floor overview"
              className="w-full aspect-[21/9] object-cover filter brightness-[0.6] group-hover:brightness-[0.7] transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row justify-between items-end gap-4">
              <div>
                <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest block">YASHRAJ ENTERPRISES — PRIMARY PRODUCTION FACILITY</span>
                <span className="text-sm font-bold text-white uppercase">PLOT NO. PAP-94, PHASE 3, CHAKAN INDUSTRIAL AREA, PUNE 410501</span>
              </div>
              <div className="flex gap-6 text-xs font-mono text-slate-400">
                <span>200 HP MSEB</span>
                <span>9,500 SQ.FT.</span>
                <span>PERMANENT STRUCTURE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Machine List (LIGHT) */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <span className="text-[10px] font-mono text-rose-600 tracking-[0.3em] uppercase block mb-4">MACHINE INVENTORY</span>
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-slate-900 mb-12">COMPLETE EQUIPMENT LIST</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  {['SR. NO.', 'MACHINE', 'CAPACITY', 'QTY', 'TYPE'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-[10px] font-mono text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {machines.map((m, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-xs font-mono text-slate-400">{String(m.no).padStart(2, '0')}</td>
                    <td className="py-3 px-4 text-sm text-slate-900 font-medium">{m.machine}</td>
                    <td className="py-3 px-4 text-xs font-mono text-rose-600">{m.capacity}</td>
                    <td className="py-3 px-4 text-xs font-mono text-slate-900 font-bold">{m.qty}</td>
                    <td className="py-3 px-4 text-xs text-slate-600">{m.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Measuring Instruments (DARK) */}
      <section className="bg-slate-950 text-slate-100 py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <span className="text-[10px] font-mono text-rose-500 tracking-[0.3em] uppercase block mb-4">QUALITY INSTRUMENTS</span>
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-white mb-12">MEASURING INSTRUMENTS</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  {['DESCRIPTION', 'RANGE', 'L.C.', 'QTY', 'MAKE'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-[10px] font-mono text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {instruments.map((inst, i) => (
                  <tr key={i} className="border-b border-slate-900/50 hover:bg-slate-900/30 transition-colors">
                    <td className="py-3 px-4 text-sm text-slate-200 font-medium">{inst.desc}</td>
                    <td className="py-3 px-4 text-xs font-mono text-slate-400">{inst.range}</td>
                    <td className="py-3 px-4 text-xs font-mono text-rose-400 font-bold">{inst.lc}</td>
                    <td className="py-3 px-4 text-xs font-mono text-white font-bold">{inst.qty}</td>
                    <td className="py-3 px-4 text-xs text-slate-500">{inst.make}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Power & Utilities (LIGHT) */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Power Supply', value: '200 HP', sub: 'MSEB Connected — Uninterrupted Industrial Supply' },
            { label: 'Generator Backup', value: '125 + 25 KvA', sub: '2 Generator Units — 24/7 Production Continuity' },
            { label: 'Factory Structure', value: 'Permanent', sub: '9,500 Sq.Ft. Built-Up Area — Owned Facility' },
          ].map((item, i) => (
            <div key={i} className="p-8 bg-slate-50 border border-slate-200 rounded-lg hover:border-rose-600/40 transition-colors">
              <span className="text-[10px] font-mono text-rose-600 uppercase tracking-widest block mb-3">{item.label}</span>
              <span className="text-3xl font-bold text-slate-900 block mb-2">{item.value}</span>
              <p className="text-xs text-slate-600 leading-relaxed">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <InquirySheet open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}