import React from 'react';

const stats = [
  { value: '900T', label: 'MAX MACHINE CAPACITY' },
  { value: '9,500', unit: 'Sq.Ft.', label: 'BUILT-UP FACTORY AREA' },
  { value: '40g–15kg', label: 'COMPONENT RANGE' },
  { value: 'ISO 9001:2015', label: 'CERTIFIED' },
];

export default function StatsSection() {
  return (
    <section className="bg-white py-10 md:py-14 px-6">
      <div className="max-w-[120rem] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-200">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center text-center px-4">
            <span className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
              {s.value}{s.unit && <span className="text-lg md:text-2xl font-medium text-slate-500 ml-1">{s.unit}</span>}
            </span>
            <span className="text-[9px] md:text-[10px] font-medium text-slate-500 tracking-[0.15em] uppercase mt-2">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}