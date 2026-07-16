import React from 'react';
import { Link } from 'react-router-dom';

const industries = [
  { title: 'Automotive', desc: 'Pump housings, structural brackets, engine components', path: '/industries/automotive' },
  { title: 'Industrial Machinery', desc: 'Gearbox housings, bearing carriers, machine components', path: '/industries/industrial-machinery' },
  { title: 'HVAC & Air Movement', desc: 'Fan housings, motor components, blower casings', path: '/industries/hvac' },
  { title: 'Consumer Appliances', desc: 'Ceiling fan covers, motor housings, appliance bodies', path: '/industries/consumer-appliances' },
  { title: 'Pumps & Valves', desc: 'Impellers, pump housings, valve bodies', path: '/industries/pumps-valves' },
  { title: 'Electrical', desc: 'Enclosures, motor housings, terminal boxes', path: '/industries/electrical' },
  { title: 'Industrial Automation', desc: 'Solenoid housings, structural castings, machine parts', path: '/industries/industrial-automation' },
  { title: 'Medical', desc: 'Surgical instruments, precision device components', path: '/industries/medical' },
  { title: 'Electric Mobility', desc: 'Lightweight castings for EV drivetrains and power electronics', path: '/industries/electric-mobility' },
  { title: 'Agriculture & Off-Highway', desc: 'Tractor covers, pulleys, precision off-highway castings', path: '/industries/agriculture' },
  { title: 'Defence', desc: 'High-integrity structural and enclosure components', path: '/industries/defence' },
  { title: 'Renewable Energy', desc: 'Generator housings and energy equipment components', path: '/industries/renewable-energy' },
];

export default function IndustriesSection() {
  return (
    <section className="bg-white py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-[120rem] mx-auto">
        <p className="text-[10px] font-medium text-rose-600 tracking-[0.2em] uppercase mb-3">INDUSTRIES WE SERVE</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">Trusted Across Sectors</h2>
        <p className="text-slate-500 text-sm mb-12 max-w-2xl">Yashraj Enterprises supplies precision aluminium components to manufacturers across high-demand industrial sectors in India.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((ind, i) => (
            <Link to={ind.path} key={i} className="group p-6 bg-slate-50 border border-slate-200 rounded-lg hover:border-rose-600/40 transition-all duration-300">
              <h3 className="text-sm font-semibold text-slate-900 mb-2 group-hover:text-rose-600 transition-colors">{ind.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{ind.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}