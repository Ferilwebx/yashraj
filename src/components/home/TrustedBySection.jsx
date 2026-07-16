import React from 'react';

const clients = [
  'Shree Ownings & Blinds', 'Deeksha Exports Pvt Ltd', 'Omega Systems Pvt Ltd', 'Polotech Mfg Pvt Ltd', 'Globaltech Engineering',
  'AGS Vision Pvt Ltd', 'SWS Pvt Ltd Mumbai', 'Almity Auto Ancilary', 'J B M M Pvt Ltd', 'Belries Industries'
];

export default function TrustedBySection() {
  return (
    <section className="bg-slate-50 py-12 md:py-16 px-6 border-b border-slate-200">
      <div className="max-w-[120rem] mx-auto">
        <p className="text-center text-[10px] font-medium text-slate-400 tracking-[0.2em] uppercase mb-8">TRUSTED BY MANUFACTURERS ACROSS INDIA</p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {clients.map((c, i) => (
            <span key={i} className="text-sm text-slate-400 font-medium hover:text-slate-600 transition-colors">{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}