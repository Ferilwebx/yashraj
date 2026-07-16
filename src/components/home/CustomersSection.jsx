import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const fallbackCustomers = [
  'Shree Ownings & Blinds',
  'Deeksha Exports Pvt Ltd',
  'Omega Systems Pvt Ltd',
  'Polotech Mfg Pvt Ltd',
  'Globaltech Engineering',
  'AGS Vision Pvt Ltd',
  'SWS Pvt Ltd Mumbai',
  'Almity Auto Ancilary',
  'J B M M Pvt Ltd',
  'Belries Industries',
];

export default function CustomersSection() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    base44.entities.HomepageSetting.list('-created_date', 1)
      .then(data => {
        if (data.length > 0 && data[0].clients_logos?.length) {
          setLogos(data[0].clients_logos);
        }
      })
      .catch(() => {});
  }, []);

  // Build display list: use CMS logos if available, otherwise fallback text entries
  const hasLogos = logos.filter(l => l.logo_url).length > 0;
  const displayList = hasLogos
    ? logos.filter(l => l.logo_url)
    : fallbackCustomers.map(name => ({ name, logo_url: '' }));

  return (
    <section className="py-20 md:py-28 bg-slate-950 border-t border-slate-900">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <span className="text-[10px] font-mono text-rose-500 tracking-[0.3em] uppercase block mb-3">TRUSTED BY</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase text-white">MANUFACTURERS ACROSS INDIA</h2>
          </div>
          <p className="text-slate-500 text-sm max-w-md">
            A growing network of quality-demanding manufacturers who rely on Yashraj Enterprises for consistent precision and on-time delivery.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {displayList.map((c, i) => (
            <div key={i} className="group p-4 bg-slate-950 border border-slate-900 hover:border-rose-600/50 transition-all duration-300 rounded-sm flex items-center justify-center min-h-[80px]">
              {c.logo_url ? (
                <img
                  src={c.logo_url}
                  alt={c.name}
                  className="max-h-16 max-w-full object-contain filter brightness-0 invert opacity-60 group-hover:filter-none group-hover:opacity-100 transition-all duration-300"
                />
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-900 border border-slate-800 group-hover:border-rose-600/50 rounded-sm flex items-center justify-center shrink-0 transition-colors duration-300">
                    <span className="text-[10px] font-mono text-slate-500 group-hover:text-rose-500 font-bold transition-colors duration-300">{c.name?.charAt(0)}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 group-hover:text-rose-500 transition-colors duration-300 leading-tight uppercase tracking-wider">{c.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}