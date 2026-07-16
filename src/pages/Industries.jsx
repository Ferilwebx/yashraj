import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquirySheet from '@/components/InquirySheet';

const industries = [
  { title: 'Automotive', slug: 'automotive', desc: 'Pump housings, structural brackets, and precision engine components for automotive OEMs.', icon: 'Car' },
  { title: 'Electric Mobility', slug: 'electric-mobility', desc: 'Lightweight aluminium castings for EV drivetrains and power electronics.', icon: 'BatteryCharging' },
  { title: 'HVAC & Air Movement', slug: 'hvac', desc: 'Fan housings, motor components, blower casings, and keyway hubs.', icon: 'Wind' },
  { title: 'Pumps & Valves', slug: 'pumps-valves', desc: 'Impellers, pump housings, and valve bodies for fluid handling applications.', icon: 'Droplets' },
  { title: 'Consumer Appliances', slug: 'consumer-appliances', desc: 'Ceiling fan covers, motor bodies, and mixer grinder housings for leading appliance OEMs.', icon: 'Home' },
  { title: 'Electrical', slug: 'electrical', desc: 'Aluminium enclosures, motor housings, and terminal boxes.', icon: 'Zap' },
  { title: 'Industrial Machinery', slug: 'industrial-machinery', desc: 'Gearbox housings, bearing carriers, and structural machine components.', icon: 'Cog' },
  { title: 'Industrial Automation', slug: 'industrial-automation', desc: 'Solenoid housings, structural castings, and precision machined components.', icon: 'Cpu' },
  { title: 'Agriculture & Off-Highway', slug: 'agriculture', desc: 'Tractor covers, pulleys, and precision castings for off-highway equipment.', icon: 'Tractor' },
  { title: 'Medical', slug: 'medical', desc: 'Surgical and medical device components manufactured to the highest precision.', icon: 'Stethoscope' },
  { title: 'Defence', slug: 'defence', desc: 'High-integrity structural and enclosure components with full traceability.', icon: 'Shield' },
  { title: 'Renewable Energy', slug: 'renewable-energy', desc: 'Generator housings and precision components for energy generation systems.', icon: 'Sun' },
];

const points = ['72-hour technical response', 'DFM review included', 'ISO 9001:2015 certified', 'STEP, IGES, DWG accepted'];

export default function Industries() {
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
            <span className="text-slate-300">Industries</span>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[2px] bg-rose-600"></span>
            <span className="text-xs font-medium text-rose-600 tracking-[0.2em] uppercase">Industries We Serve</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] max-w-4xl">
            Trusted Across<br /><span className="text-rose-600">Global Sectors.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl">
            Yashraj Enterprise supplies precision aluminium and zinc components to manufacturers across high-demand industrial sectors in India and internationally. From automotive to medical devices, our castings perform where reliability matters.
          </p>
        </div>
      </section>

      {/* Industry Cards */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((ind, i) => (
              <Link
                to={`/industries/${ind.slug}`}
                key={i}
                className="group relative bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-rose-600/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-slate-600 tracking-wider">0{i + 1 < 10 ? '0' + (i + 1) : i + 1}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Learn more</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-rose-500 transition-colors">{ind.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{ind.desc}</p>
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
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">Send Us Your Drawings</h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
              Our engineers review every enquiry technically — not a sales team. We'll confirm feasibility, flag any DFM concerns, and return a detailed quote within 72 hours.
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