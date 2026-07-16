import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileSearch, ClipboardCheck, FileText } from 'lucide-react';

const features = [
  { icon: ShieldCheck, title: 'Zero Defect Mindset', desc: 'In-process controls to prevent defects at source, not catch them at the end.' },
  { icon: FileSearch, title: 'Full Traceability', desc: 'Every component traced from raw alloy heat number to final shipment.' },
  { icon: ClipboardCheck, title: 'First Article Inspection', desc: 'Full dimensional and material report before batch release.' },
  { icon: FileText, title: 'Customer Quality Plans', desc: 'Tailored control plans for each customer\'s critical parameters.' },
];

export default function QualitySection() {
  return (
    <section className="bg-slate-950 py-20 md:py-28 px-6 md:px-12 border-t border-slate-900">
      <div className="max-w-[120rem] mx-auto">
        <p className="text-[10px] font-medium text-rose-600 tracking-[0.2em] uppercase mb-3">QUALITY ASSURANCE</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">ISO 9001:2015 Certified</h2>
        <p className="text-slate-400 text-sm mb-12 max-w-2xl">Every component traceable from raw material heat number to final shipment. In-process controls and first-article inspection at every production stage.</p>
        <div className="mb-12 p-6 md:p-8 bg-rose-600/10 border border-rose-600/30 rounded-lg flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-600 rounded-lg flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-white">ISO 9001:2015</span>
            <p className="text-sm text-slate-400">Certified Quality Management System</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-rose-600/50 transition-all duration-300">
                <Icon className="w-6 h-6 text-rose-600 mb-4" />
                <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-8">
          <Link to="/quality" className="inline-flex items-center gap-2 text-sm font-medium text-rose-600 hover:text-rose-500 transition-colors">
            View Quality Systems →
          </Link>
        </div>
      </div>
    </section>
  );
}