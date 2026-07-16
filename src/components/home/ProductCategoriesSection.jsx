import React from 'react';

const categories = [
  { title: 'Automotive Components', desc: 'Engine brackets, pump housings, structural parts, gearbox covers.' },
  { title: 'Pump & Valve Bodies', desc: 'Impeller housings, valve bodies, pump casings for fluid handling.' },
  { title: 'Fan & Motor Housings', desc: 'Ceiling fan covers, motor housings, blower casings, blade hubs.' },
  { title: 'Electrical Enclosures', desc: 'Terminal boxes, motor enclosures, switchgear components.' },
  { title: 'Industrial Machinery Parts', desc: 'Gearbox housings, bearing carriers, end covers, machine components.' },
  { title: 'Agricultural Components', desc: 'Tractor covers, pulleys, precision off-highway castings.' },
];

export default function ProductCategoriesSection() {
  return (
    <section className="bg-slate-950 py-20 md:py-28 px-6 md:px-12 border-t border-slate-900">
      <div className="max-w-[120rem] mx-auto">
        <p className="text-[10px] font-medium text-rose-600 tracking-[0.2em] uppercase mb-3">PRODUCT CATEGORIES</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">Components We Manufacture</h2>
        <p className="text-slate-400 text-sm mb-12 max-w-2xl">Precision aluminium castings and machined components across diverse industrial applications.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="p-6 bg-slate-950 border border-slate-800 rounded-lg hover:border-rose-600/50 transition-all duration-300 group">
              <div className="w-10 h-10 flex items-center justify-center bg-rose-600/10 rounded-lg mb-4">
                <span className="text-rose-600 font-bold text-sm">0{i + 1}</span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2 group-hover:text-rose-500 transition-colors">{cat.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
