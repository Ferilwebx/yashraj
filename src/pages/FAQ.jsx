import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const faqSections = [
  {
    title: 'Processes & Capabilities',
    items: [
      { q: 'What casting processes does Yashraj Enterprise offer?', a: 'We offer high pressure die casting (HPDC) with cold chamber machines from 120T to 900T for aluminium alloys, hot chamber machines for zinc alloys, and gravity die casting for structural and heavy-section components. All processes are under one roof at our Chakan facility.' },
      { q: 'What alloys do you cast?', a: 'Aluminium alloys: ADC12, A380, LM24, LM6, LM25. Zinc alloys: Zamak 3 and Zamak 5. Alloy selection is confirmed during DFM review based on your mechanical, corrosion, and surface finish requirements.' },
      { q: 'What is the maximum part weight you can cast?', a: 'Component weights range from 40 grams to 15 kilograms. Our 900T cold chamber machine handles the largest aluminium castings, while the hot chamber machines produce smaller zinc components.' },
      { q: 'Do you provide CNC machining?', a: 'Yes. We have a JAEWOO ART 350S+ VMC and LK TC Series CNC milling machine in-house. Tolerances to ±0.02 mm are achievable with 100% dimensional inspection. All machining is done without outsourcing.' },
    ],
  },
  {
    title: 'Quality & Inspection',
    items: [
      { q: 'Are you ISO certified?', a: 'Yes. Yashraj Enterprise is ISO 9001:2015 certified. Our quality management system governs every stage from raw material inspection to final dispatch, with full traceability.' },
      { q: 'What inspection equipment do you have?', a: 'Mitutoyo vernier callipers (0–200mm and 0–300mm), height gauge (0–800mm), micrometer set (0–100mm in three ranges), slip gauges, granite surface plate (1000×600mm), V-blocks, and an in-house spectrometer for alloy composition analysis.' },
      { q: 'Do you provide material test certificates?', a: 'Yes. Material test certificates with spectrometer chemistry are provided with every shipment. Full heat number traceability is maintained from raw ingot to final component.' },
    ],
  },
  {
    title: 'RFQ & Pricing',
    items: [
      { q: 'How long does it take to get a quote?', a: 'Our engineering team responds within 72 hours with a technical and commercial assessment. Every enquiry is reviewed technically — not by a sales team. DFM review is included in every quotation.' },
      { q: 'What file formats do you accept?', a: 'STEP, IGES, DWG, DXF, and PDF formats are all accepted. 3D CAD models are preferred for accurate DFM analysis. 2D drawings with tolerance callouts are sufficient for quotation.' },
      { q: 'What is the minimum order quantity?', a: 'Small-batch production is available from 20 units. This accommodates prototype runs and lower-volume programmes typical of specialised or medical device manufacturing.' },
      { q: 'Is tooling cost separate?', a: 'Tooling is quoted separately and is a one-time investment. We design and manufacture dies in-house, which reduces lead time and gives us full control over tool quality and maintenance.' },
    ],
  },
  {
    title: 'Exports & Logistics',
    items: [
      { q: 'Do you export components?', a: 'Yes. Our documentation, quality systems, and communication standards are built for international supply. We prepare commercial invoices, packing lists, certificates of origin, and material certificates to international standards.' },
      { q: 'How are components packed for shipping?', a: 'Components are packed in customer-specified dunnage with corrosion protection and labelling for transit. Export packaging meets international shipping requirements.' },
      { q: 'What is your production lead time?', a: 'Lead time depends on complexity, volume, and whether new tooling is required. For existing tools, typical lead time is 2–4 weeks. New tool development adds 4–8 weeks depending on die complexity. Exact timelines are confirmed at quotation.' },
    ],
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* Hero (DARK) */}
      <section className="bg-slate-950 text-slate-100 pt-24 pb-20 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-500 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300">FAQ</span>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[2px] bg-rose-600"></span>
            <span className="text-xs font-medium text-rose-600 tracking-[0.2em] uppercase">FAQ</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
            Frequently Asked <span className="text-rose-600">Questions.</span>
          </h1>
          <p className="mt-6 text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
            Answers to common questions about our processes, quality systems, pricing, and export capabilities. Can't find what you're looking for? Contact our engineering team directly.
          </p>
        </div>
      </section>

      {/* FAQ Sections (LIGHT) */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-12">
          {faqSections.map((section, si) => (
            <div key={si}>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight mb-6 pb-3 border-b border-slate-200">{section.title}</h2>
              <div className="space-y-3">
                {section.items.map((item, ii) => {
                  const idx = `${si}-${ii}`;
                  const isOpen = open === idx;
                  return (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setOpen(isOpen ? null : idx)}
                        className="flex items-center justify-between w-full p-5 text-left"
                      >
                        <span className="text-sm font-semibold text-slate-900 pr-4">{item.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-rose-600' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5">
                          <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA (DARK) */}
      <section className="bg-slate-950 text-slate-100 py-20 md:py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(200,29,62,0.06),transparent_60%)]"></div>
        <div className="relative max-w-[120rem] mx-auto">
          <div className="max-w-3xl">
            <p className="text-[10px] font-medium text-rose-600 tracking-[0.2em] uppercase mb-3">Get Started</p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-6">Still Have Questions?</h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
              Our engineering team is ready to help. Reach out with your technical questions and we'll provide a substantive response.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/rfq" className="flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold tracking-wide rounded transition-all duration-300">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-700 hover:border-rose-600 text-white text-xs font-semibold tracking-wide rounded transition-all duration-300">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}