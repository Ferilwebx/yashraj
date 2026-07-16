import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { Download, FileText, ArrowRight, ShieldCheck, Factory, Wrench, FileCheck, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquirySheet from '@/components/InquirySheet';

const categoryConfig = {
  company: { label: 'Company', icon: Factory },
  capability: { label: 'Capability', icon: Wrench },
  certificate: { label: 'Certificate', icon: ShieldCheck },
  technical: { label: 'Technical', icon: FileText },
  quality: { label: 'Quality', icon: FileCheck },
  other: { label: 'Resource', icon: FileText },
};

const fileTypeColors = {
  pdf: 'text-rose-500 bg-rose-500/10',
  doc: 'text-blue-500 bg-blue-500/10',
  docx: 'text-blue-500 bg-blue-500/10',
  xls: 'text-emerald-500 bg-emerald-500/10',
  xlsx: 'text-emerald-500 bg-emerald-500/10',
  step: 'text-amber-500 bg-amber-500/10',
  stp: 'text-amber-500 bg-amber-500/10',
  iges: 'text-amber-500 bg-amber-500/10',
  dwg: 'text-amber-500 bg-amber-500/10',
  dxf: 'text-amber-500 bg-amber-500/10',
  zip: 'text-purple-500 bg-purple-500/10',
  other: 'text-slate-500 bg-slate-500/10',
};

export default function Downloads() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    base44.entities.Download.list('sort_order')
      .then(data => setDownloads(data.filter(d => d.is_active !== false)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...new Set(downloads.map(d => d.category))];
  const filtered = activeCategory === 'all' ? downloads : downloads.filter(d => d.category === activeCategory);

  return (
    <>
      <Navbar onInquiry={() => setInquiryOpen(true)} />
      <InquirySheet open={inquiryOpen} onClose={() => setInquiryOpen(false)} />

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-slate-950">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <nav className="flex items-center gap-2 text-[11px] font-mono text-slate-600 uppercase tracking-wider mb-8">
            <Link to="/" className="hover:text-rose-500 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-400">Downloads</span>
          </nav>
          <div className="max-w-3xl">
            <span className="text-[10px] font-mono text-rose-500 tracking-[0.3em] uppercase block mb-4">RESOURCE CENTRE</span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[1.05] mb-6">
              Download Technical Resources
            </h1>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl">
              Access our company profile, capability brochures, ISO certificates, and technical documentation. All resources are available for immediate download.
            </p>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-[11px] font-mono uppercase tracking-wider rounded-md transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Resources' : categoryConfig[cat]?.label || cat}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-slate-200 border-t-rose-500 rounded-full animate-spin"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-sm">No downloads available at this time. Please check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((doc, i) => {
                const CatIcon = categoryConfig[doc.category]?.icon || FileText;
                const ft = (doc.file_type || 'pdf').toLowerCase();
                const ftClass = fileTypeColors[ft] || fileTypeColors.other;
                return (
                  <div key={doc.id || i} className="group relative bg-slate-50 border border-slate-200 rounded-lg p-6 hover:border-rose-300 hover:shadow-lg transition-all duration-300 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-md flex items-center justify-center ${ftClass}`}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider px-2 py-1 bg-white border border-slate-200 rounded">
                        {ft}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <CatIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{categoryConfig[doc.category]?.label || 'Resource'}</span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2 leading-tight">{doc.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">{doc.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                      <span className="text-[11px] text-slate-400 font-mono">
                        {doc.file_size || '—'}
                      </span>
                      {doc.file_url ? (
                        <a
                          href={doc.file_url}
                          download
                          className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-500 transition-colors group/btn"
                        >
                          <Download className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform" />
                          Download
                        </a>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                          <FileText className="w-3.5 h-3.5" />
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-slate-950">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 text-center">
          <span className="text-[10px] font-mono text-rose-500 tracking-[0.3em] uppercase block mb-4">NEED SOMETHING SPECIFIC?</span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white uppercase mb-4">Can't find what you're looking for?</h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mb-8">
            Our engineering team can provide custom technical documentation, alloy data sheets, or capability reports tailored to your project requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/rfq" className="flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold tracking-widest uppercase rounded-md transition-all duration-300 shadow-lg shadow-rose-600/20">
              Start an RFQ <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-bold tracking-widest uppercase rounded-md transition-all duration-300">
              Contact Engineering
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}