import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquirySheet from '@/components/InquirySheet';
import { useState } from 'react';
import { Target, Eye, Heart, Zap, Shield, Star, Users } from 'lucide-react';

const values = [
  { icon: Zap, title: 'Innovation', desc: 'Continuously improving processes, tooling, and manufacturing techniques to deliver superior component quality.' },
  { icon: Star, title: 'Professionalism', desc: 'Every interaction, delivery, and document reflects the highest standard of professional excellence.' },
  { icon: Target, title: 'Dream', desc: 'Pursuing an ambitious vision of becoming a globally recognized precision manufacturer from Pune.' },
  { icon: Users, title: 'Win-Win', desc: 'Building partnerships where both client success and our growth move forward together.' },
  { icon: Heart, title: 'Responsibility', desc: 'Accountable for every component we produce — to our clients, our team, and our community.' },
  { icon: Shield, title: 'Passion', desc: 'Genuine love for the craft of manufacturing drives quality in everything we produce.' },
];

const timeline = [
  { year: '2005', event: 'Founded', desc: 'Yashraj Enterprises established at Chakan Industrial Area, Pune, with a focus on aluminium die casting.' },
  { year: '2010', event: 'Expansion', desc: 'Extended machine capacity with 400T and 900T pressure die casting machines.' },
  { year: '2015', event: 'ISO Certified', desc: 'Achieved ISO 9001:2015 certification, formalizing quality management systems.' },
  { year: '2018', event: 'CNC Integration', desc: 'Added JAEWOO ART 350 S+ CNC and LK TC Series VMC for in-house precision machining.' },
  { year: '2023', event: 'Growth', desc: 'Annual turnover reached ₹6.5 Cr with an expanded customer base across 12+ industry verticals.' },
];

const team = [
  { role: 'Proprietor', name: 'Anant A. Kumbhar', dept: 'Leadership' },
  { role: 'Q.A. Engineer', name: 'Quality Department', dept: 'Quality Assurance' },
  { role: 'Mechanical Engineer', name: 'R&D Department', dept: 'Engineering' },
  { role: 'Design Engineer', name: 'Design Department', dept: 'Product Development' },
  { role: 'Purchase Officer', name: 'Purchase Department', dept: 'Procurement' },
  { role: 'Works Supervisor', name: 'Production Department', dept: 'Operations' },
];

export default function About() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <Navbar onInquiry={() => setInquiryOpen(true)} />

      {/* Hero (DARK) */}
      <section className="bg-slate-950 text-slate-100 pt-24 pb-20 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
            <div className="lg:col-span-7">
              <span className="text-[10px] font-mono text-rose-500 tracking-[0.3em] uppercase block mb-6">ABOUT YASHRAJ ENTERPRISES</span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-tight text-white mb-6">
                BUILT ON<br /><span className="text-rose-500">PRECISION,</span><br />DRIVEN BY PASSION.
              </h1>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
                Founded by Anant A. Kumbhar, Yashraj Enterprises has grown from a focused die casting operation to a comprehensive precision manufacturing partner serving critical industries across India and beyond.
              </p>
            </div>
            <div className="lg:col-span-5 space-y-4 font-mono text-xs">
              {[
                { label: 'Proprietor', value: 'Anant A. Kumbhar' },
                { label: 'GST Registration', value: '27GYNPK7251Q1ZD' },
                { label: 'Certification', value: 'ISO 9001:2015' },
                { label: 'Factory Area', value: '9,500 Sq.Ft.' },
                { label: 'Power Supply', value: '200 HP MSEB + 150 KvA Generator' },
                { label: 'Annual Turnover', value: '₹6.5 Crore' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between gap-4 py-2 border-b border-slate-800">
                  <span className="text-slate-500 uppercase tracking-wider shrink-0">{item.label}</span>
                  <span className="text-white text-right break-words min-w-0">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission (LIGHT) */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 md:p-12 bg-slate-50 border border-slate-200 rounded-lg">
            <Eye className="w-8 h-8 text-rose-600 mb-6" />
            <span className="text-[10px] font-mono text-rose-600 tracking-widest uppercase block mb-3">OUR VISION</span>
            <h3 className="text-xl md:text-2xl font-bold uppercase text-slate-900 mb-4">To Be India's Most Trusted Precision Die Casting Partner</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To become a globally recognized precision manufacturing company from Pune — known for zero-defect components, on-time delivery, and unwavering quality across all industrial sectors we serve.
            </p>
          </div>
          <div className="p-8 md:p-12 bg-slate-50 border border-slate-200 rounded-lg">
            <Target className="w-8 h-8 text-rose-600 mb-6" />
            <span className="text-[10px] font-mono text-rose-600 tracking-widest uppercase block mb-3">OUR MISSION</span>
            <h3 className="text-xl md:text-2xl font-bold uppercase text-slate-900 mb-4">Engineering Excellence Through Every Component</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To deliver precision-engineered aluminium and zinc die casting components that exceed client specifications — leveraging in-house tooling, advanced CNC machining, and a rigorous quality system to ensure consistent performance.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline (DARK) */}
      <section className="bg-slate-950 text-slate-100 py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <span className="text-[10px] font-mono text-rose-500 tracking-[0.3em] uppercase block mb-4">OUR JOURNEY</span>
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-white mb-16">COMPANY TIMELINE</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-slate-800"></div>
            <div className="space-y-10 pl-16">
              {timeline.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-10 top-1 w-4 h-4 rounded-full border-2 border-rose-500 bg-slate-950"></div>
                  <span className="text-xs font-mono text-rose-500 uppercase tracking-widest block mb-1">{item.year}</span>
                  <h4 className="text-lg font-bold text-white uppercase mb-2">{item.event}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xl">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values (LIGHT) */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <span className="text-[10px] font-mono text-rose-600 tracking-[0.3em] uppercase block mb-4">OUR PRINCIPLES</span>
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-slate-900 mb-16">THE VALUES WE WORK BY</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="p-8 bg-slate-50 border border-slate-200 hover:border-rose-600/40 transition-all duration-300 rounded-lg group">
                  <Icon className="w-8 h-8 text-rose-600 mb-4 group-hover:text-rose-500 transition-colors" />
                  <h4 className="text-lg font-bold text-slate-900 uppercase mb-3">{v.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team (DARK) */}
      <section className="bg-slate-950 text-slate-100 py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <span className="text-[10px] font-mono text-rose-500 tracking-[0.3em] uppercase block mb-4">ORGANIZATIONAL STRUCTURE</span>
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-white mb-16">LEADERSHIP & TEAMS</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {team.map((member, i) => (
              <div key={i} className={`p-6 border rounded-lg text-center ${i === 0 ? 'bg-rose-950/30 border-rose-700' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${i === 0 ? 'bg-rose-600' : 'bg-slate-800'}`}>
                  <span className="text-white font-bold text-lg">{member.name.charAt(0)}</span>
                </div>
                <span className="text-[10px] font-mono text-rose-500 uppercase tracking-wider block mb-1">{member.dept}</span>
                <h4 className="text-xs font-bold text-white uppercase">{member.role}</h4>
                <p className="text-[10px] text-slate-500 mt-1">{member.name}</p>
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