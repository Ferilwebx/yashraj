import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquirySheet from '@/components/InquirySheet';

const capabilities = [
  {
    title: 'High Pressure Die Casting',
    slug: 'pressure-die-casting',
    desc: 'Cold chamber HPDC machines from 120T to 900T. ADC12, A380, LM24, LM6 alloys. High-volume production capacity.',
    spec: '120T – 900T',
    specLabel: 'Machine Range'
  },
  {
    title: 'Gravity Die Casting',
    slug: 'gravity-die-casting',
    desc: 'LM25 alloy. Superior mechanical properties for low-volume, high-integrity, and structurally demanding applications.',
    spec: 'LM25',
    specLabel: 'Primary Alloy'
  },
  {
    title: 'CNC & VMC Machining',
    slug: 'cnc-vmc-machining',
    desc: 'JAEWOO ART 350S+ VMC and LK TC Series CNC milling. Tolerances to ±0.02 mm. 100% dimensional inspection.',
    spec: '±0.02 mm',
    specLabel: 'Tolerance'
  },
  {
    title: 'Powder Coating',
    slug: 'powder-coating',
    desc: '5-tank nano-ceramic pre-treatment, dedicated coating booth, and 100% DFT inspection on every component.',
    spec: '100% DFT',
    specLabel: 'Inspection'
  },
  {
    title: 'Precision Tool Development',
    slug: 'tool-development',
    desc: 'DFM analysis, die design, first article inspection, and dedicated technical team for ongoing collaboration.',
    spec: 'DFM',
    specLabel: 'Review Included'
  },
  {
    title: 'Shot Blasting & Surface Treatment',
    slug: 'surface-treatment',
    desc: 'Shot blasting, vibrofinishing, leakage testing, and trimming — all under one roof.',
    spec: 'In-House',
    specLabel: 'Integrated'
  },
  {
    title: 'Contract Manufacturing',
    slug: 'contract-manufacturing',
    desc: 'End-to-end accountability from raw casting to finished, inspected, and packed component ready for your line.',
    spec: 'Full',
    specLabel: 'End-to-End'
  },
  {
    title: 'Engineering Support',
    slug: 'engineering-support',
    desc: 'DFM review, design optimisation, first article inspection, and ongoing technical collaboration with your team.',
    spec: '72 hrs',
    specLabel: 'Technical Response'
  },
];

const points = ['72-hour technical response', 'DFM review included', 'ISO 9001:2015 certified', 'STEP, IGES, DWG accepted'];

export default function Capabilities() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar onInquiry={() => setInquiryOpen(true)} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,29,62,0.06),transparent_60%)]"></div>
        <div className="relative max-w-[120rem] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-500 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300">Capabilities</span>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[2px] bg-rose-600"></span>
            <span className="text-xs font-medium text-rose-600 tracking-[0.2em] uppercase">Our Capabilities</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] max-w-4xl">
            Complete Aluminium Casting<br /><span className="text-rose-600">& Machining Solutions.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl">
            Eight integrated capabilities under one roof — built for OEMs that need precision, consistency, and a single point of accountability. From cold and hot chamber die casting to CNC/VMC machining and surface finishing.
          </p>
        </div>
      </section>

      {/* Capability Cards */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((cap, i) => (
              <Link
                to={`/capabilities/${cap.slug}`}
                key={i}
                className="group relative bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-rose-600/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[10px] font-mono text-slate-600 tracking-wider">0{i + 1}</span>
                  <div className="text-right">
                    <div className="text-lg font-bold text-rose-600 tracking-tight">{cap.spec}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">{cap.specLabel}</div>
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-rose-500 transition-colors">{cap.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{cap.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-6 md:px-12 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(200,29,62,0.06),transparent_60%)]"></div>
        <div className="relative max-w-[120rem] mx-auto">
          <div className="max-w-3xl">
            <p className="text-[10px] font-medium text-rose-600 tracking-[0.2em] uppercase mb-3">Get Started</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">Need a Custom Capability?</h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
              Tell us about your component requirements. Our engineering team will assess feasibility and recommend the optimal manufacturing process for your application.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-10">
              {points.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-600 rounded-full shrink-0"></span>
                  <span className="text-xs text-slate-400">{p}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setInquiryOpen(true)} className="flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold tracking-wide rounded transition-all duration-300">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </button>
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