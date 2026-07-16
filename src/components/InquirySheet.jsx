import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';

export default function InquirySheet({ open, onClose }) {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', product: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', company: '', email: '', phone: '', product: '', message: '' });
      onClose();
    }, 3000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-t-2xl md:rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-900">
          <div>
            <span className="text-[10px] font-mono text-rose-500 tracking-widest uppercase block">TECHNICAL INQUIRY</span>
            <h3 className="text-lg font-bold text-white uppercase tracking-tight mt-0.5">Request a Quotation</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-12 text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4 className="text-xl font-bold text-white uppercase">Inquiry Submitted</h4>
            <p className="text-slate-400 text-sm">Our team will contact you within 1–2 business days.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'name', label: 'Full Name *', placeholder: 'Anant Kumbhar', required: true },
                { key: 'company', label: 'Company Name', placeholder: 'XYZ Manufacturing Pvt Ltd', required: false },
                { key: 'email', label: 'Email Address *', placeholder: 'email@company.com', required: true, type: 'email' },
                { key: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210', required: false },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">{f.label}</label>
                  <input
                    type={f.type || 'text'}
                    value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    required={f.required}
                    placeholder={f.placeholder}
                    className="w-full bg-slate-900 border border-slate-800 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-rose-500 transition-colors placeholder:text-slate-600"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Product / Component Type</label>
              <select
                value={form.product}
                onChange={e => setForm({ ...form, product: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-rose-500 transition-colors"
              >
                <option value="">Select product type</option>
                <option>Pressure Die Casting (Aluminium)</option>
                <option>Pressure Die Casting (Zinc)</option>
                <option>CNC / VMC Machining</option>
                <option>Tool Development / Die Manufacturing</option>
                <option>Shot Blasting / Surface Treatment</option>
                <option>Contract Manufacturing</option>
                <option>Other / Custom Component</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Technical Requirements / Message *</label>
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                required
                rows={4}
                placeholder="Describe your component requirements, quantity, tolerance, alloy preference, and any special notes..."
                className="w-full bg-slate-900 border border-slate-800 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-rose-500 transition-colors placeholder:text-slate-600 resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <p className="text-[11px] text-slate-600">
                By submitting you agree to be contacted by our engineering team.
              </p>
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-300 shadow-lg shadow-rose-600/20 whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                Send Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}