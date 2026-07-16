import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What aluminium alloys do you process in your die casting cells?',
    a: 'We primarily process aluminium alloys including ADC12, LM24, LM6, and AlSi9Cu3 for cold chamber pressure die casting. For zinc alloys, we use Zamak 3 and Zamak 5 in our hot chamber machines. All alloy chemistry is verified in-house via our spectrograph analysis before pouring.'
  },
  {
    q: 'What is your die casting machine capacity range?',
    a: 'Our pressure die casting fleet spans from 120 tonnes to 900 tonnes (cold chamber aluminium), plus three hot chamber machines at 90T and 140T for zinc components. This allows us to handle components from 40 grams up to 15 kilograms.'
  },
  {
    q: 'Do you offer CNC and VMC machining after casting?',
    a: 'Yes. We have a JAEWOO ART 350 S+ CNC turning center (±0.007mm positioning accuracy) and an LK TC Series VMC (12,000 RPM, BT-30 spindle). We can perform complete post-casting machining in-house, including small-batch production of as few as 20 units.'
  },
  {
    q: 'What quality certifications does Yashraj Enterprises hold?',
    a: 'Yashraj Enterprises is ISO 9001:2015 certified. Our quality lab is equipped with Mitutoyo measuring instruments including vernier callipers, micrometers, height gauges, slip gauges, a surface plate, and an in-house spectrometer for alloy verification.'
  },
  {
    q: 'Can you handle prototype development and tooling manufacture?',
    a: 'Absolutely. We have strong in-house capability for prototype development, production die tools, machining fixtures, and job works with 2D drawings and 3D CAD models. This allows us to take a component from concept to production under one roof.'
  },
  {
    q: 'What surface treatment and finishing services do you offer?',
    a: 'We offer shot blasting (100 KG capacity), vibrofinishing for smooth surface finish, leakage testing for pressure components, and trimming press operations. For heat treatment, we work with established authorized supplier tie-ups.'
  },
  {
    q: 'What industries does Yashraj Enterprises serve?',
    a: 'We serve a wide range of industries including automotive, medical devices, LED lighting, electrical enclosures, hydraulic and pneumatic systems, furniture hardware, motor and starter components, cookware, home appliances, and defence components.'
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-24 md:py-36 bg-slate-900/10 border-t border-slate-900">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-mono text-rose-500 tracking-[0.3em] uppercase block mb-4">TECHNICAL RESOLUTIONS</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase text-white">ENGINEERING FAQs</h2>
          <p className="text-slate-400 text-sm mt-4">Common questions about our manufacturing capabilities, processes, and quality standards.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-900 bg-slate-950 rounded-sm overflow-hidden hover:border-slate-800 transition-colors">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center text-left p-6 text-white hover:text-rose-400 transition-colors"
              >
                <span className="font-semibold text-sm md:text-base pr-4">{faq.q}</span>
                {open === i ? (
                  <Minus className="w-5 h-5 text-rose-500 shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </button>
              {open === i && (
                <div className="px-6 pb-6 pt-0 border-t border-slate-900">
                  <p className="text-sm text-slate-400 leading-relaxed pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}