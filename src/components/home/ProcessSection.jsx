import React from 'react';

const steps = [
  { num: '01', title: 'RFQ & Technical Review', desc: 'Send us your drawing. Our engineers respond within 72 hours with a technical and commercial assessment — not a sales call.' },
  { num: '02', title: 'DFM & Die Design', desc: 'We review your geometry for manufacturability before the die is designed. Gate location, draft angles, wall thickness — caught at drawing stage.' },
  { num: '03', title: 'First Article Inspection', desc: 'Full dimensional and material report before any batch is released. Every critical dimension confirmed in writing.' },
  { num: '04', title: 'Production with In-Process Controls', desc: 'Process parameters monitored and logged at casting, machining, and inspection stages. You\'re informed of progress, not surprised.' },
  { num: '05', title: 'Final Inspection', desc: '100% visual and dimensional check. Certificate of Conformance issued with every shipment.' },
  { num: '06', title: 'Packed & Dispatched', desc: 'Packed in customer-specified dunnage, labelled, and dispatched on the agreed date. One contact throughout the entire process.' },
];

export default function ProcessSection({ onInquiry }) {
  return (
    <section className="bg-slate-950 py-20 md:py-28 px-6 md:px-12 border-t border-slate-900">
      <div className="max-w-[120rem] mx-auto">
        <p className="text-[10px] font-medium text-rose-600 tracking-[0.2em] uppercase mb-3">HOW WE WORK</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">From RFQ to Dispatch</h2>
        <p className="text-slate-400 text-sm mb-12 max-w-2xl">How an enquiry becomes a packed and dispatched component — stage by stage, with no surprises.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-lg">
              <span className="text-2xl font-bold text-slate-700 mb-3 block">{s.num}</span>
              <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        {onInquiry && (
          <div className="mt-12 text-center">
            <button onClick={onInquiry} className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold tracking-wide rounded transition-all duration-300">
              Start with a Quote Request
            </button>
          </div>
        )}
      </div>
    </section>
  );
}