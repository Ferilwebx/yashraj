import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, ChevronRight } from 'lucide-react';
import InquirySheet from '@/components/InquirySheet';
import { base44 } from '@/api/base44Client';

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await base44.entities.ContactEnquiry.create({
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        message: form.subject ? `[${form.subject}] ${form.message}` : form.message,
        inquiry_type: 'general',
        status: 'new',
      });
      setSubmitted(true);
    } catch (err) {
      alert('Error submitting form. Please try again or contact us directly.');
    } finally { setLoading(false); }
  };

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <Navbar onInquiry={() => setInquiryOpen(true)} />

      {/* Hero (DARK) */}
      <section className="bg-slate-950 text-slate-100 pt-24 pb-20 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-500 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300">Contact</span>
          </div>
          <span className="text-[10px] font-mono text-rose-500 tracking-[0.3em] uppercase block mb-6">CONTACT MATRIX</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-tight text-white mb-6">
            LET'S BUILD<br /><span className="text-rose-500">SOMETHING</span><br />TOGETHER.
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
            Reach our engineering team for quotations, technical inquiries, factory visits, or partnership discussions.
          </p>
        </div>
      </section>

      {/* Contact + Form (LIGHT) */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact cards */}
          <div className="lg:col-span-4 space-y-4">
            {[
              { icon: Phone, label: 'Phone', value: '+91 99235 98986', sub: 'Mon–Sat, 9am–6pm IST', href: 'tel:+919923598986', cta: 'Call Now' },
              { icon: Mail, label: 'Email', value: 'mallubarikai@zohomail.in', sub: 'Technical inquiries & quotations', href: 'mailto:mallubarikai@zohomail.in', cta: 'Send Email' },
              { icon: MessageCircle, label: 'WhatsApp', value: '+91 99235 98986', sub: 'Quick inquiries welcome', href: 'https://wa.me/919923598986', cta: 'Chat on WhatsApp' },
              { icon: MapPin, label: 'Factory Address', value: 'Plot No. PAP-94, Phase No. 3', sub: 'Chakan Industrial Area, Village Kuruli, Tah. Khed, Pune 410501, Maharashtra', href: 'https://maps.google.com', cta: 'Get Directions' },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="p-6 bg-slate-50 border border-slate-200 hover:border-rose-600/40 transition-all duration-300 rounded-lg group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-rose-600/10 border border-rose-600/30 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-rose-600" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">{c.label}</span>
                      <p className="text-sm font-semibold text-slate-900 mb-1">{c.value}</p>
                      <p className="text-[11px] text-slate-600 leading-relaxed mb-3">{c.sub}</p>
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono text-rose-600 hover:text-rose-500 uppercase tracking-wider transition-colors">
                        {c.cta} →
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-3">BUSINESS DETAILS</span>
              <div className="space-y-2 text-xs font-mono text-slate-500">
                <div className="flex justify-between"><span>PROPRIETOR</span><span className="text-slate-900">Anant A. Kumbhar</span></div>
                <div className="flex justify-between"><span>GST NO.</span><span className="text-slate-900">27GYNPK7251Q1ZD</span></div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[500px] space-y-6 border border-slate-200 rounded-lg bg-slate-50">
                <CheckCircle className="w-16 h-16 text-emerald-500" />
                <h3 className="text-2xl font-bold text-slate-900 uppercase">Message Sent Successfully</h3>
                <p className="text-slate-600 text-center max-w-md">Our engineering team will review your inquiry and respond within 1–2 business days.</p>
                <button onClick={() => setSubmitted(false)} className="px-6 py-3 border border-slate-300 text-xs font-mono tracking-widest uppercase text-slate-900 hover:border-rose-500 transition-colors rounded-lg">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 bg-slate-50 border border-slate-200 rounded-lg space-y-5">
                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight mb-6">Technical Inquiry Form</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { key: 'name', label: 'Full Name *', placeholder: 'Your Name', required: true },
                    { key: 'company', label: 'Company Name', placeholder: 'Your Company', required: false },
                    { key: 'email', label: 'Email Address *', placeholder: 'email@company.com', required: true, type: 'email' },
                    { key: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', required: false },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">{f.label}</label>
                      <input
                        type={f.type || 'text'}
                        value={form[f.key]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        required={f.required}
                        placeholder={f.placeholder}
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-rose-500 transition-colors placeholder:text-slate-400"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Subject</label>
                  <input
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    placeholder="Inquiry subject"
                    className="w-full bg-white border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-rose-500 transition-colors placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                    rows={6}
                    placeholder="Describe your requirements, component specifications, quantities, and any special manufacturing considerations..."
                    className="w-full bg-white border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-rose-500 transition-colors placeholder:text-slate-400 resize-none"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-2">
                  <p className="text-[11px] text-slate-500">All inquiries are treated with strict confidentiality.</p>
                  <button type="submit" disabled={loading} className="flex items-center gap-3 px-8 py-3 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-300 disabled:text-slate-500 text-white text-xs font-bold tracking-widest uppercase rounded-lg transition-all shadow-lg shadow-rose-600/20 whitespace-nowrap">
                    <Send className="w-4 h-4" /> {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}

            {/* Map embed */}
            <div className="mt-6 border border-slate-200 rounded-lg overflow-hidden aspect-[16/7] bg-slate-50 flex items-center justify-center">
              <div className="text-center space-y-3">
                <MapPin className="w-8 h-8 text-rose-600 mx-auto" />
                <p className="text-sm text-slate-700">Plot No. PAP-94, Phase 3, Chakan Industrial Area</p>
                <p className="text-xs text-slate-500">Village Kuruli, Tah. Khed, Pune 410501</p>
                <a href="https://maps.google.com/search?q=Chakan+Industrial+Area+Pune+410501" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 border border-slate-300 hover:border-rose-500 text-xs font-mono text-slate-600 hover:text-rose-600 uppercase tracking-wider transition-colors rounded-lg mt-2">
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <InquirySheet open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}