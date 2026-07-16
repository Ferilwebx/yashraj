import React from 'react';

const timeline = [
  { num: 1, year: '2008', title: 'Company Established', desc: 'Founded in Chakan Industrial Area, Pune by Anant A Kumbhar.' },
  { num: 2, year: '2012', title: 'HPDC Capacity Expanded', desc: 'Additional die casting machines commissioned for higher volumes.' },
  { num: 3, year: '2015', title: 'CNC & VMC Centre Added', desc: 'Precision machining capabilities brought in-house.' },
  { num: 4, year: '2019', title: 'ISO 9001:2015 Certified', desc: 'Quality management system certified.' },
  { num: 5, year: '2024', title: 'Facility Expansion', desc: '9,500 Sq.Ft. permanent facility with 200 HP power capacity.' },
];

export default function TimelineSection() {
  return (
    <section className="bg-white py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-[120rem] mx-auto">
        <p className="text-[10px] font-medium text-rose-600 tracking-[0.2em] uppercase mb-3">OUR JOURNEY</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-12">Years of Disciplined Growth</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {timeline.map((t, i) => (
            <div key={i} className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 flex items-center justify-center bg-rose-600 text-white text-sm font-bold rounded">{t.num}</span>
                <span className="text-lg font-bold text-slate-900">{t.year}</span>
              </div>
              <div className="pl-11">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{t.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}