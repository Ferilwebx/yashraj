import React from 'react';
import { Link } from 'react-router-dom';
import CmsImage from '@/components/CmsImage';

const facilityStats = [
  { value: '9,500', unit: 'Sq.Ft.', label: 'Built-up Area' },
  { value: '200', unit: 'HP', label: 'MSEB Power' },
  { value: '125', unit: 'kVA', label: 'Generator Backup' },
];

export default function FacilitySection() {
  return (
    <section className="bg-white py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-[120rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-lg overflow-hidden border border-slate-200">
            <CmsImage imageKey="home_facility" fallback="https://media.base44.com/images/public/6a56844a4813d002cc377ca4/2a22bc325_generated_90b9f85d.png" alt="Yashraj Enterprise manufacturing facility — Chakan Industrial Area, Pune" className="w-full aspect-[4/3] object-cover" />
          </div>
          <div>
            <p className="text-[10px] font-medium text-rose-600 tracking-[0.2em] uppercase mb-3">OUR FACILITY</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">9,500 Sq.Ft. of Integrated Manufacturing</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">Permanent building infrastructure in Chakan Industrial Area with 200 HP power supply, generator backup, and complete in-house capabilities from casting to finished component.</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {facilityStats.map((s, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-xl font-bold text-slate-900">{s.value}<span className="text-sm text-slate-500 ml-1">{s.unit}</span></span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-1">{s.label}</span>
                </div>
              ))}
            </div>
            <Link to="/infrastructure" className="inline-flex items-center gap-2 text-sm font-medium text-rose-600 hover:text-rose-500 transition-colors">
              Explore Our Facility →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}