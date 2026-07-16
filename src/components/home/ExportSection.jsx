import React from 'react';
import CmsImage from '@/components/CmsImage';

export default function ExportSection() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-12 max-w-[120rem] mx-auto border-t border-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* World map visual */}
        <div className="lg:col-span-7 bg-slate-900/20 border border-slate-900 rounded-sm overflow-hidden relative aspect-[16/10]">
          <CmsImage
            imageKey="home_export_worldmap"
            fallback="https://media.base44.com/images/public/6a56844a4813d002cc377ca4/cebb2bc10_generated_d1c69509.png"
            alt="Global supply and export matrix"
            className="w-full h-full object-cover opacity-50 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 p-8">
              <span className="text-[10px] font-mono text-rose-500 uppercase tracking-widest block">[ GLOBAL SUPPLY MATRIX ]</span>
              <h3 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tight">SERVING CLIENTS<br />NATIONWIDE & BEYOND</h3>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                Supply chains spanning automotive, medical, and electrical sectors across India and international markets.
              </p>
            </div>
          </div>
          {/* Pulse dots */}
          <div className="absolute top-[45%] left-[62%]">
            <span className="absolute inline-flex h-3 w-3 rounded-full bg-rose-500 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
          </div>
          <div className="absolute top-[35%] left-[45%]">
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-cyan-400 opacity-75 animate-ping" style={{ animationDelay: '0.5s' }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-5 space-y-8">
          <span className="text-[10px] font-mono text-rose-500 tracking-[0.3em] uppercase block">CLIENT NETWORK</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase text-white leading-tight">
            TRUSTED BY<br />INDIA'S LEADING<br />MANUFACTURERS.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Yashraj Enterprises supplies precision cast and machined components to established manufacturers across automotive, industrial, and consumer sectors — building long-term quality partnerships.
          </p>

          <div className="space-y-5">
            {[
              { tag: '[ AUTOMOTIVE ]', desc: 'Structural die cast components for automotive ancillary manufacturers.' },
              { tag: '[ INDUSTRIAL ]', desc: 'Gearbox housings and valve bodies for industrial machinery OEMs.' },
              { tag: '[ MEDICAL ]', desc: 'Precision surgical instrument components for healthcare device manufacturers.' },
              { tag: '[ ELECTRICAL ]', desc: 'LED lighting bodies and motor starter housings for electrical product companies.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start py-3 border-b border-slate-900/50 last:border-0">
                <span className="text-rose-500 font-mono text-xs shrink-0 mt-0.5">{item.tag}</span>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}