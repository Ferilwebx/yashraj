import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, ShieldCheck, Clock, Package, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquirySheet from '@/components/InquirySheet';

const stats = [
  { value: 'ISO 9001', label: 'Certified QMS' },
  { value: '72 hrs', label: 'RFQ Response' },
  { value: '100%', label: 'Traceability' },
  { value: 'Global', label: 'Supply Ready' },
];

const capabilities = [
  { icon: FileText, title: 'Documentation Ready', desc: 'Commercial invoices, packing lists, COO, and material certificates prepared to international standards.' },
  { icon: ShieldCheck, title: 'Quality Systems', desc: 'ISO 9001:2015 certified QMS with full traceability from raw material heat number to final shipment.' },
  { icon: Clock, title: '72-Hour Response', desc: 'Engineering team responds to enquiries within 72 hours with technical and commercial assessment.' },
  { icon: Package, title: 'Export Packaging', desc: 'Customer-specified dunnage, corrosion protection, and labelling for international transit.' },
];

const regions = [
  { flag: '🇮🇳', title: 'India', desc: 'Established supplier to 10+ OEM customers across automotive, appliances, and industrial sectors.' },
  { flag: '🇪🇺', title: 'Europe (Ready)', desc: 'Documentation, quality systems, and processes prepared for European OEM supply with full traceability.' },
];

export default function Exports() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <Navbar onInquiry={() => setInquiryOpen(true)} />

      {/* Hero (DARK) */}
      <section className="bg-slate-950 text-slate-100 pt-24 pb-20 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-500 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300">Exports</span>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[2px] bg-rose-600"></span>
            <span className="text-xs font-medium text-rose-600 tracking-[0.2em] uppercase">Export Capability</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] max-w-4xl">
            Built for <span className="text-rose-600">International Supply.</span>
          </h1>
          <p className="mt-6 text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
            Yashraj Enterprise supplies precision aluminium components to manufacturers across India. Our documentation, quality systems, and communication standards are built for international supply chains.
          </p>
        </div>
      </section>

      {/* Stats (LIGHT) */}
      <section className="bg-white py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-rose-600 tracking-tight">{s.value}</div>
              <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities (DARK) */}
      <section className="bg-slate-950 text-slate-100 py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <p className="text-[10px] font-medium text-rose-600 tracking-[0.2em] uppercase mb-3">EXPORT READY</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-12">Built for International Supply</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-rose-600/40 transition-all duration-300">
                  <Icon className="w-6 h-6 text-rose-600 mb-4" />
                  <h3 className="text-base font-semibold text-white mb-2">{c.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regions (LIGHT) */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <p className="text-[10px] font-medium text-rose-600 tracking-[0.2em] uppercase mb-3">GLOBAL REACH</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-12">Where We Supply</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regions.map((r, i) => (
              <div key={i} className="p-8 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-5">
                <span className="text-3xl shrink-0">{r.flag}</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{r.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (DARK) */}
      <section className="bg-slate-950 text-slate-100 py-20 md:py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(200,29,62,0.06),transparent_60%)]"></div>
        <div className="relative max-w-[120rem] mx-auto">
          <div className="max-w-3xl">
            <p className="text-[10px] font-medium text-rose-600 tracking-[0.2em] uppercase mb-3">Get Started</p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-6">Ready to Supply Your Global Operation?</h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
              Share your component requirements and target destination. We will assess export feasibility and provide a comprehensive quotation.
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
      <InquirySheet open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}