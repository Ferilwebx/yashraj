import React from 'react';

const reasons = [
  { title: 'We own the whole job', desc: 'Your casting. Your machining. Your inspection. One facility, one team — no handoffs to third parties, no quality gaps between processes.' },
  { title: "You don't lose time chasing suppliers", desc: 'With HPDC machines, CNC/VMC centres, and in-house capabilities, we move quickly between stages. Delays from external sub-contractors are not a problem we have.' },
  { title: 'We catch design problems before the die is cut', desc: 'DFM review is part of how we quote — not an add-on. Our engineers know what gates badly, what causes porosity, and what adds unnecessary machining time.' },
  { title: 'We run the volumes and we document it', desc: 'In-process controls at casting, machining, and inspection — not just a final check. Every batch is traceable from raw material heat to shipment.' },
];

export default function WhyPartnerSection() {
  return (
    <section className="bg-white py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-[120rem] mx-auto">
        <p className="text-[10px] font-medium text-rose-600 tracking-[0.2em] uppercase mb-3">WHY PARTNER WITH US</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-12 max-w-2xl">What working with us actually means</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div key={i} className="p-6 bg-slate-50 border border-slate-200 rounded-lg hover:border-rose-600/40 transition-all duration-300">
              <div className="w-8 h-8 flex items-center justify-center bg-rose-600/10 rounded mb-4">
                <span className="text-rose-600 font-bold text-sm">0{i + 1}</span>
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-3">{r.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}