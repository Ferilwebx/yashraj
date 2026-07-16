import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquirySheet from '@/components/InquirySheet';
import CmsImage from '@/components/CmsImage';
import { ArrowRight, CheckCircle, ChevronRight, ChevronDown } from 'lucide-react';

export default function DetailPage({ data, breadcrumb, imageKey }) {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const has = (v) => v && (Array.isArray(v) ? v.length > 0 : true);

  return (
    <div className="bg-white overflow-x-hidden">
      <Navbar onInquiry={() => setInquiryOpen(true)} />

      {/* ===== HERO (DARK) ===== */}
      <section className="bg-slate-950 text-slate-100">
        <div className="pt-24 pb-0 px-6 md:px-12 max-w-[120rem] mx-auto">
          {breadcrumb && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-8">
              <Link to="/" className="hover:text-rose-500 transition-colors">Home</Link>
              {breadcrumb.map((c, i) => (
                <React.Fragment key={i}>
                  <ChevronRight className="w-3 h-3" />
                  {c.path ? (
                    <Link to={c.path} className="hover:text-rose-500 transition-colors">{c.label}</Link>
                  ) : (
                    <span className="text-slate-300">{c.label}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {data.tag && <span className="text-[10px] font-mono text-rose-500 tracking-[0.3em] uppercase block mb-6">[ {data.tag} ]</span>}
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-tight text-white mb-4">{data.title}</h1>
          {data.subtitle && <p className="text-slate-400 font-mono text-sm mb-6">{data.subtitle}</p>}
          {data.description && <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-3xl mb-8">{data.description}</p>}
          {has(data.stats) && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-slate-800">
              {data.stats.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-bold text-rose-600 tracking-tight">{s.value}</div>
                  <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {data.heroImage && (
          <div className="px-6 md:px-12 max-w-[120rem] mx-auto pb-16 pt-8">
            <div className="relative border border-slate-800 rounded-lg overflow-hidden">
              <CmsImage imageKey={imageKey} fallback={data.heroImage} alt={data.title} className="w-full aspect-[21/8] object-cover filter brightness-[0.5]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
            </div>
          </div>
        )}
      </section>

      {/* ===== OVERVIEW (LIGHT) ===== */}
      {data.overview && (
        <section className="bg-white py-20">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-7">
                <span className="text-[10px] font-mono text-rose-600 tracking-widest uppercase block mb-4">OVERVIEW</span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">{data.overview.heading}</h2>
                {data.overview.paragraphs?.map((p, i) => (
                  <p key={i} className="text-slate-600 text-sm leading-relaxed mb-4">{p}</p>
                ))}
              </div>
              <div className="lg:col-span-5 space-y-4">
                {data.alloys && has(data.alloys) && (
                  <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] font-mono text-rose-600 uppercase tracking-widest block mb-4">MATERIALS / ALLOYS</span>
                    <div className="flex flex-wrap gap-2">
                      {data.alloys.map((a, i) => (
                        <span key={i} className="px-3 py-1 bg-white border border-slate-200 text-xs font-mono text-slate-600 rounded">{a}</span>
                      ))}
                    </div>
                  </div>
                )}
                <button onClick={() => setInquiryOpen(true)} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold tracking-widest uppercase rounded transition-all">
                  Request a Quote <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== PROCESS DESCRIPTION (DARK) ===== */}
      {data.processDescription && (
        <section className="bg-slate-950 text-slate-100 py-16">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <span className="text-[10px] font-mono text-rose-500 tracking-widest uppercase block mb-4">PROCESS DESCRIPTION</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{data.processDescription.heading}</h2>
            {data.processDescription.paragraphs?.map((p, i) => (
              <p key={i} className="text-slate-400 text-sm leading-relaxed mb-4 max-w-4xl">{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* ===== FEATURES (LIGHT) ===== */}
      {has(data.features) && (
        <section className="bg-white py-16">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <span className="text-[10px] font-mono text-rose-600 tracking-widest uppercase block mb-4">FEATURES</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.features.map((f, i) => (
                <div key={i} className="p-6 bg-slate-50 border border-slate-200 rounded-lg hover:border-rose-600/40 transition-all">
                  <h4 className="text-sm font-bold text-slate-900 mb-2">{f.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== ADVANTAGES (DARK) ===== */}
      {has(data.advantages) && (
        <section className="bg-slate-950 text-slate-100 py-16">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <span className="text-[10px] font-mono text-rose-500 tracking-widest uppercase block mb-4">ADVANTAGES</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Process Advantages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.advantages.map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-slate-900/30 border border-slate-800 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-white block mb-1">{a.title || a}</span>
                    {a.desc && <p className="text-xs text-slate-400 leading-relaxed">{a.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== MATERIALS (LIGHT) ===== */}
      {has(data.materials) && (
        <section className="bg-white py-16">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <span className="text-[10px] font-mono text-rose-600 tracking-widest uppercase block mb-4">MATERIALS</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Alloys & Materials Processed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.materials.map((m, i) => (
                <div key={i} className="p-6 bg-slate-50 border border-slate-200 rounded-lg hover:border-rose-600/40 transition-all">
                  <h4 className="text-sm font-bold text-rose-600 mb-2">{m.name}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== MANUFACTURING PROCESS (DARK) ===== */}
      {has(data.manufacturingProcess) && (
        <section className="bg-slate-950 text-slate-100 py-16">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <span className="text-[10px] font-mono text-rose-500 tracking-widest uppercase block mb-4">MANUFACTURING PROCESS</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.manufacturingProcess.map((s, i) => (
                <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-lg relative">
                  <span className="text-3xl font-bold text-slate-800 absolute top-4 right-4">{String(i + 1).padStart(2, '0')}</span>
                  <h4 className="text-sm font-bold text-white mb-2 pr-8">{s.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== APPLICATIONS (LIGHT) ===== */}
      {has(data.applications) && (
        <section className="bg-white py-16">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <span className="text-[10px] font-mono text-rose-600 tracking-widest uppercase block mb-4">APPLICATIONS</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Industries & Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.applications.map((a, i) => (
                <div key={i} className="p-5 bg-slate-50 border border-slate-200 rounded-lg hover:border-rose-600/40 transition-all">
                  <h4 className="text-sm font-bold text-slate-900 mb-2">{a.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== INDUSTRIES SERVED (DARK) ===== */}
      {has(data.industriesServed) && (
        <section className="bg-slate-950 text-slate-100 py-16">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <span className="text-[10px] font-mono text-rose-500 tracking-widest uppercase block mb-4">INDUSTRIES SERVED</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Sectors We Supply</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {data.industriesServed.map((ind, i) => (
                <div key={i}>
                  {ind.path ? (
                    <Link to={ind.path} className="flex items-center gap-3 p-4 bg-slate-900/30 border border-slate-800 rounded-lg hover:border-rose-600/40 transition-colors">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0"></span>
                      <span className="text-xs text-slate-300 hover:text-rose-500 transition-colors">{ind.name}</span>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3 p-4 bg-slate-900/30 border border-slate-800 rounded-lg">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0"></span>
                      <span className="text-xs text-slate-300">{typeof ind === 'string' ? ind : ind.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== TECHNICAL SPECIFICATIONS (LIGHT) ===== */}
      {has(data.specs) && (
        <section className="bg-white py-16">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <span className="text-[10px] font-mono text-rose-600 tracking-widest uppercase block mb-4">TECHNICAL SPECIFICATIONS</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Technical Specifications</h2>
            <div className="max-w-3xl">
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                {data.specs.map((s, i) => (
                  <div key={i} className={`flex justify-between items-start gap-4 px-6 py-3.5 ${i !== data.specs.length - 1 ? 'border-b border-slate-200' : ''} ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                    <span className="text-xs text-slate-500 shrink-0 uppercase tracking-wider">{s.label}</span>
                    <span className="text-xs font-medium text-slate-900 text-right">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== QUALITY ASSURANCE (DARK) ===== */}
      {has(data.qualityAssurance) && (
        <section className="bg-slate-950 text-slate-100 py-16">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <span className="text-[10px] font-mono text-rose-500 tracking-widest uppercase block mb-4">QUALITY ASSURANCE</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Quality Assurance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.qualityAssurance.map((q, i) => (
                <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-lg">
                  <h4 className="text-sm font-bold text-white mb-3">{q.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{q.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== WHY CHOOSE (LIGHT) ===== */}
      {has(data.whyChooseUs) && (
        <section className="bg-white py-16">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <span className="text-[10px] font-mono text-rose-600 tracking-widest uppercase block mb-4">WHY CHOOSE YASHRAJ ENTERPRISE</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Why Choose Yashraj Enterprise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.whyChooseUs.map((w, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="w-8 h-8 bg-rose-600/10 border border-rose-600/30 rounded flex items-center justify-center text-rose-600 font-bold text-sm shrink-0">{i + 1}</span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{w.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ (DARK) ===== */}
      {has(data.faqs) && (
        <section className="bg-slate-950 text-slate-100 py-16">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <span className="text-[10px] font-mono text-rose-500 tracking-widest uppercase block mb-4">FAQ</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl space-y-3">
              {data.faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex items-center justify-between w-full p-5 text-left">
                      <span className="text-sm font-semibold text-white pr-4">{f.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-rose-600' : ''}`} />
                    </button>
                    {isOpen && <div className="px-5 pb-5"><p className="text-sm text-slate-400 leading-relaxed">{f.a}</p></div>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== RELATED (LIGHT) ===== */}
      {has(data.related) && (
        <section className="bg-white py-16">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12">
            <span className="text-[10px] font-mono text-rose-600 tracking-widest uppercase block mb-4">RELATED</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">{data.relatedTitle || 'Related Resources'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.related.map((r, i) => (
                <Link key={i} to={`/${r.type}/${r.slug}`} className="group p-5 bg-slate-50 border border-slate-200 rounded-lg hover:border-rose-600/40 transition-colors">
                  <span className="text-sm font-semibold text-slate-900 group-hover:text-rose-600 transition-colors">{r.name}</span>
                  <span className="text-xs text-slate-500 block mt-1 capitalize">View {r.type} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA (DARK) ===== */}
      <section className="bg-slate-950 text-slate-100 py-20">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="p-8 md:p-12 bg-gradient-to-br from-slate-900 to-slate-900/30 border border-slate-800 rounded-lg text-center">
            <p className="text-[10px] font-medium text-rose-600 tracking-[0.2em] uppercase mb-3">Get Started</p>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">{data.ctaTitle || `Sourcing ${data.title}?`}</h2>
            <p className="text-slate-400 text-sm mb-8 max-w-xl mx-auto">{data.ctaDesc || 'Share your drawings — STEP, IGES, DXF, or PDF. We\'ll review manufacturability, confirm alloy and process, and respond with a technical and commercial proposal within 72 hours.'}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/rfq" className="flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold tracking-wide rounded transition-all">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-700 hover:border-rose-600 text-white text-xs font-semibold tracking-wide rounded transition-all">
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