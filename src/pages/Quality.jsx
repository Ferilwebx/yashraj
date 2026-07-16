import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquirySheet from '@/components/InquirySheet';
import CmsImage from '@/components/CmsImage';
import { CheckCircle, Award, Search, FlaskConical, Ruler } from 'lucide-react';

const steps = [
  { step: '01', title: 'Incoming Raw Material Inspection', desc: 'All aluminium and zinc ingots verified via in-house spectrometer before entering production. Alloy composition logged against material test certificates.' },
  { step: '02', title: 'In-Process Dimensional Checks', desc: 'Critical dimensions verified at die casting stage using Mitutoyo vernier callipers, micrometers, and height gauges. First article inspection on every die setup.' },
  { step: '03', title: 'Casting Visual & Dimensional Inspection', desc: 'All castings inspected for porosity, cold shuts, shrinkage defects, and dimensional compliance against customer drawings in the standard room.' },
  { step: '04', title: 'Machining Tolerance Verification', desc: 'Post-CNC/VMC machining, components checked against ±0.007mm positional accuracy targets using surface plates, slip gauges, and v-blocks.' },
  { step: '05', title: 'Leak & Pressure Testing', desc: 'For pressure-tight components such as valve bodies and pump housings, dedicated leakage testing equipment verifies sealing integrity.' },
  { step: '06', title: 'Final Inspection & Documentation', desc: 'Full dimensional report issued with each lot. Customer-specific quality formats, material certifications, and dimensional inspection reports provided.' },
];

export default function Quality() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <Navbar onInquiry={() => setInquiryOpen(true)} />

      {/* Hero (DARK) */}
      <section className="bg-slate-950 text-slate-100 pt-24 pb-20 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <span className="text-[10px] font-mono text-rose-500 tracking-[0.3em] uppercase block mb-6">QUALITY COMPLIANCE</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-tight text-white mb-6">
            ZERO-DEFECT<br /><span className="text-rose-500">METROLOGY.</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-3xl">
            Our ISO 9001:2015 certified quality management system governs every stage of production — from raw material verification to final dispatch. Every component leaving our facility meets the dimensional, metallurgical, and functional requirements specified by our clients.
          </p>
        </div>
      </section>

      {/* Certification highlight (LIGHT) */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Award, label: 'Certification', value: 'ISO 9001:2015', sub: 'Quality Management System' },
            { icon: Ruler, label: 'CNC Accuracy', value: '±0.007 mm', sub: 'Positioning repeatability' },
            { icon: Search, label: 'Spectrometer', value: 'In-House', sub: 'Full alloy composition analysis' },
            { icon: FlaskConical, label: 'Leak Testing', value: 'Available', sub: 'Pressure component validation' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="p-8 bg-slate-50 border border-slate-200 rounded-lg hover:border-rose-600/40 transition-colors">
                <Icon className="w-8 h-8 text-rose-600 mb-4" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">{item.label}</span>
                <span className="text-2xl font-bold text-slate-900 block mb-1">{item.value}</span>
                <span className="text-xs text-slate-600">{item.sub}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* CMM Image (DARK) */}
      <section className="bg-slate-950 text-slate-100 py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative border border-slate-800 rounded-lg overflow-hidden">
            <CmsImage
              imageKey="quality_lab"
              fallback="https://media.base44.com/images/public/6a56844a4813d002cc377ca4/6e1ce5b86_generated_01725120.png"
              alt="Quality inspection and metrology at Yashraj Enterprises"
              className="w-full aspect-[4/3] object-cover filter brightness-[0.6]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest">[ STANDARD ROOM — QUALITY LAB ]</span>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold uppercase text-white">INSPECTION FACILITIES</h2>
            <div className="space-y-4">
              {[
                'Standard Room with profile projector and height gauges',
                'Mitutoyo vernier callipers (0–200mm and 0–300mm)',
                'Full micrometer set (0–100mm in three ranges)',
                'Precision surface plate (1000×600mm granite)',
                'In-house spectrometer for alloy analysis',
                'Leakage testing equipment for hydraulic/pneumatic parts',
                'Vibrofinishing for surface inspection preparation',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-400">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Process (LIGHT) */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <span className="text-[10px] font-mono text-rose-600 tracking-[0.3em] uppercase block mb-4">QUALITY FLOW</span>
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-slate-900 mb-12">SIX-STAGE QUALITY PROCESS</h2>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 md:gap-12 p-6 bg-slate-50 border border-slate-200 rounded-lg hover:border-rose-600/30 transition-colors">
                <div className="shrink-0">
                  <span className="text-4xl font-bold text-slate-200 font-mono">{step.step}</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 uppercase mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <InquirySheet open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}