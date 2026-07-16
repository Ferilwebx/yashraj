import React from 'react';

const machines = [
  { metric: '900T / 400T / 300T', title: 'Pressure Die Casting', desc: '6 cold chamber pressure die casting machines from 120T to 900T capacity.' },
  { metric: '90T & 140T × 3', title: 'Hot Chamber Die Casting', desc: '3 hot chamber machines for zinc and light alloy components.' },
  { metric: '±0.007mm accuracy', title: 'VMC — JAEWOO ART 350S+', desc: 'CNC turning Ø290mm max, 50–3000 RPM, 8-station BTP-80 turret.' },
  { metric: '12,000 RPM spindle', title: 'CNC Milling — LK TC Series', desc: '3-axis, 1350×410mm table, 16–20 tool magazine, Mitsubishi M80 control.' },
  { metric: '200–500 KG', title: 'Melting & Holding Furnaces', desc: '5 melting/holding furnaces from 200 KG to 500 KG capacity, in-house alloy preparation.' },
  { metric: 'Mitutoyo Instruments', title: 'Inspection & Quality Lab', desc: 'Spectrometer, height gauge (0–800), Vernier calipers, micrometers, surface plate, comparator stand.' },
];

export default function MachineShowcaseSection() {
  return (
    <section className="bg-slate-950 py-20 md:py-28 px-6 md:px-12 border-t border-slate-900">
      <div className="max-w-[120rem] mx-auto">
        <p className="text-[10px] font-medium text-rose-600 tracking-[0.2em] uppercase mb-3">MACHINE SHOWCASE</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3 max-w-2xl">Equipment & Infrastructure</h2>
        <p className="text-slate-400 text-sm mb-12 max-w-2xl">A complete manufacturing setup — from casting to finished, inspected component — under one roof at our Chakan facility.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {machines.map((m, i) => (
            <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-rose-600/50 transition-all duration-300">
              <span className="text-sm font-bold text-rose-600 block mb-3">{m.metric}</span>
              <h3 className="text-base font-semibold text-white mb-2">{m.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}