import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const caps = [
  { title: 'High Pressure Die Casting', desc: 'HPDC machines from 120T to 900T. ADC12, A380, LM24 alloys. High-volume production capacity.', metric: '120T – 900T', metricLabel: 'Machine Range', path: '/capabilities/pressure-die-casting' },
  { title: 'Gravity Die Casting', desc: 'LM25 alloy. Superior mechanical properties for low-volume, high-integrity, and structurally demanding applications.', metric: 'LM25', metricLabel: 'Primary Alloy', path: '/capabilities/gravity-die-casting' },
  { title: 'CNC & VMC Machining', desc: 'CNC and VMC machines including 4th-axis capability. Tolerances to ±0.02 mm. 100% dimensional inspection.', metric: '±0.02 mm', metricLabel: 'Tolerance', path: '/capabilities/cnc-vmc-machining' },
  { title: 'Powder Coating', desc: 'In-house 5-tank nano-ceramic pre-treatment, two dedicated booths, 100% DFT inspection on every batch.', metric: '100% DFT', metricLabel: 'Inspection', path: '/capabilities/powder-coating' },
  { title: 'Tool Development', desc: 'In-house die design with DFM review and simulation. Rapid tool qualification and prototype-to-production.', metric: 'DFM', metricLabel: 'Review Included', path: '/capabilities/tool-development' },
  { title: 'Contract Manufacturing', desc: 'End-to-end accountability from raw casting to finished, inspected, and packed component ready for your line.', metric: 'End-to-End', metricLabel: 'Production', path: '/capabilities/contract-manufacturing' },
  { title: 'Engineering Support', desc: 'DFM analysis, design optimisation, first article inspection, and dedicated technical team for collaboration.', metric: '72 hrs', metricLabel: 'RFQ Response', path: '/capabilities/engineering-support' },
  { title: 'Shot Blasting & Treatment', desc: 'Shot blasting, vibrofinishing, leakage testing, and trimming — all surface operations under one roof.', metric: 'In-House', metricLabel: 'Surface Treatment', path: '/capabilities/surface-treatment' },
];

export default function CapabilitiesSection() {
  return (
    <section className="bg-slate-950 py-20 md:py-28 px-6 md:px-12 border-t border-slate-900">
      <div className="max-w-[120rem] mx-auto">
        <p className="text-[10px] font-medium text-rose-600 tracking-[0.2em] uppercase mb-3">OUR CAPABILITIES</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3 max-w-2xl">Complete Aluminium Casting Solutions</h2>
        <p className="text-slate-400 text-sm mb-12 max-w-2xl">Integrated capabilities under one roof — built for OEMs that need precision, consistency, and a single point of accountability.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {caps.map((cap, i) => (
            <Link to={cap.path} key={i} className="group p-6 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-rose-600/50 transition-all duration-300 flex flex-col">
              <h3 className="text-base font-semibold text-white mb-3 group-hover:text-rose-500 transition-colors">{cap.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">{cap.desc}</p>
              <div className="pt-4 border-t border-slate-800">
                <span className="text-lg font-bold text-rose-600">{cap.metric}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-0.5">{cap.metricLabel}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}