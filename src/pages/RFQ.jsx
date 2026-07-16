import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Send, ChevronRight, Upload, X, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { base44 } from '@/api/base44Client';
import { validateFile } from '@/utils/adminUtils';

const steps = ['Process', 'Details', 'Volume', 'Contact'];

const processes = [
  { value: 'hpdc', label: 'High Pressure Die Casting' },
  { value: 'gdc', label: 'Gravity Die Casting' },
  { value: 'cnc', label: 'CNC / VMC Machining' },
  { value: 'tooling', label: 'Tool Development' },
  { value: 'powder', label: 'Powder Coating' },
  { value: 'multiple', label: 'Multiple Processes' },
];

const alloys = ['ADC12', 'A380', 'LM24', 'LM25', 'LM6', 'Zamak 3', 'Zamak 5', 'Other / Unsure'];

export default function RFQ() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    process: '', alloy: '',
    partName: '', application: '', desc: '',
    quantity: '', frequency: '', timeline: '',
    name: '', company: '', email: '', phone: '', country: '',
  });
  const [files, setFiles] = useState({ drawing: null, pdf: null, cad: null });
  const [fileErrors, setFileErrors] = useState({});

  const update = (k, v) => setForm({ ...form, [k]: v });
  const canProceed = () => {
    if (step === 0) return form.process;
    if (step === 1) return form.partName && form.desc;
    if (step === 2) return form.quantity;
    return form.name && form.email;
  };

  const handleFileSelect = (key, file) => {
    if (!file) return;
    const validation = validateFile(file);
    if (!validation.valid) {
      setFileErrors({ ...fileErrors, [key]: validation.error });
      return;
    }
    setFileErrors({ ...fileErrors, [key]: '' });
    setFiles({ ...files, [key]: file });
  };

  const removeFile = (key) => {
    setFiles({ ...files, [key]: null });
    setFileErrors({ ...fileErrors, [key]: '' });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let drawing_url = '', pdf_url = '', cad_url = '';
      if (files.drawing) {
        const res = await base44.integrations.Core.UploadFile({ file: files.drawing });
        drawing_url = res.file_url;
      }
      if (files.pdf) {
        const res = await base44.integrations.Core.UploadFile({ file: files.pdf });
        pdf_url = res.file_url;
      }
      if (files.cad) {
        const res = await base44.integrations.Core.UploadFile({ file: files.cad });
        cad_url = res.file_url;
      }

      await base44.entities.RFQ.create({
        customer_name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        country: form.country || 'India',
        product_required: form.partName,
        quantity: form.quantity,
        process: form.process,
        alloy: form.alloy,
        drawing_url, pdf_url, cad_url,
        message: `${form.desc || ''}${form.application ? `\nApplication: ${form.application}` : ''}${form.frequency ? `\nFrequency: ${form.frequency}` : ''}${form.timeline ? `\nTimeline: ${form.timeline}` : ''}`,
        status: 'new',
      });

      setSubmitted(true);
    } catch (err) {
      alert('Error submitting RFQ. Please try again or contact us directly.');
    } finally { setLoading(false); }
  };

  const inputClass = "w-full bg-white border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-rose-500 transition-colors placeholder:text-slate-400";
  const labelClass = "text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2";

  const FileInput = ({ label, fileKey, accept }) => (
    <div>
      <label className={labelClass}>{label}</label>
      {files[fileKey] ? (
        <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="text-xs text-slate-700 truncate">{files[fileKey].name}</span>
          </div>
          <button type="button" onClick={() => removeFile(fileKey)} className="text-slate-400 hover:text-rose-500"><X className="w-4 h-4" /></button>
        </div>
      ) : (
        <label className="flex items-center gap-2 p-3 bg-white border border-dashed border-slate-300 text-sm text-slate-500 rounded-lg cursor-pointer hover:border-rose-500 transition-colors">
          <Upload className="w-4 h-4" /> Choose file
          <input type="file" accept={accept} onChange={e => handleFileSelect(fileKey, e.target.files[0])} className="hidden" />
        </label>
      )}
      {fileErrors[fileKey] && <p className="text-xs text-rose-500 mt-1">{fileErrors[fileKey]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <section className="bg-slate-950 text-slate-100 relative pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-12 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,29,62,0.06),transparent_60%)]"></div>
        <div className="relative max-w-[120rem] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-500 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300">Request a Quote</span>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[2px] bg-rose-600"></span>
            <span className="text-xs font-medium text-rose-600 tracking-[0.2em] uppercase">Request for Quote</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
            Configure Your <span className="text-rose-600">Technical Quote.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl">
            Complete the steps below. Our engineers respond within 72 hours with a full technical and commercial assessment.
          </p>
          <div className="flex flex-wrap gap-6 mt-6">
            {['72-hour response', 'DFM review included', 'ISO 9001:2015 certified', 'STEP, IGES, DWG accepted'].map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-rose-600" />
                <span className="text-xs text-slate-400">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-16 space-y-6 bg-slate-50 border border-slate-200 rounded-lg">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
              <h2 className="text-2xl font-bold text-slate-900">RFQ Submitted Successfully</h2>
              <p className="text-slate-600 max-w-md mx-auto">Our engineering team will review your requirements and respond within 72 hours with a technical and commercial assessment.</p>
              <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 hover:border-rose-600 text-slate-900 text-xs font-semibold tracking-wide rounded transition-all">
                Back to Home <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 md:p-10">
              <div className="flex items-center gap-2 mb-8">
                {steps.map((s, i) => (
                  <React.Fragment key={s}>
                    <div className={`flex items-center gap-2 ${i <= step ? 'text-rose-600' : 'text-slate-600'}`}>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i < step ? 'bg-rose-600 text-white' : i === step ? 'border-2 border-rose-600 text-rose-600' : 'border border-slate-300 text-slate-400'}`}>
                        {i < step ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
                      </span>
                      <span className="text-xs font-semibold hidden sm:block">{s}</span>
                    </div>
                    {i < steps.length - 1 && <div className={`flex-1 h-[1px] ${i < step ? 'bg-rose-600' : 'bg-slate-200'}`}></div>}
                  </React.Fragment>
                ))}
              </div>

              {step === 0 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-slate-900">Select Manufacturing Process</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {processes.map(p => (
                      <button key={p.value} onClick={() => update('process', p.value)} className={`p-4 text-left text-sm font-medium rounded-lg transition-all ${form.process === p.value ? 'bg-rose-600/10 border-2 border-rose-600 text-slate-900' : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300'}`}>{p.label}</button>
                    ))}
                  </div>
                  <div>
                    <label className={labelClass}>Preferred Alloy</label>
                    <div className="flex flex-wrap gap-2">
                      {alloys.map(a => (
                        <button key={a} onClick={() => update('alloy', a)} className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${form.alloy === a ? 'bg-rose-600 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300'}`}>{a}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-bold text-slate-900">Component Details</h2>
                  <div>
                    <label className={labelClass}>Part Name / Description *</label>
                    <input value={form.partName} onChange={e => update('partName', e.target.value)} placeholder="e.g. Pump Housing, Gearbox Cover" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Application / Industry</label>
                    <input value={form.application} onChange={e => update('application', e.target.value)} placeholder="e.g. Automotive, HVAC, Medical" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Technical Requirements *</label>
                    <textarea value={form.desc} onChange={e => update('desc', e.target.value)} rows={4} placeholder="Describe tolerance, wall thickness, surface finish, pressure tightness..." className={`${inputClass} resize-none`} />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-bold text-slate-900">Volume & Attachments</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Quantity per Order *</label>
                      <input value={form.quantity} onChange={e => update('quantity', e.target.value)} placeholder="e.g. 500, 5000" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Order Frequency</label>
                      <select value={form.frequency} onChange={e => update('frequency', e.target.value)} className={inputClass}>
                        <option value="">Select frequency</option>
                        <option>One-time</option>
                        <option>Monthly</option>
                        <option>Quarterly</option>
                        <option>Annual</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Expected Timeline</label>
                    <select value={form.timeline} onChange={e => update('timeline', e.target.value)} className={inputClass}>
                      <option value="">Select timeline</option>
                      <option>ASAP (2-4 weeks)</option>
                      <option>1-2 months</option>
                      <option>3-6 months</option>
                      <option>Flexible</option>
                    </select>
                  </div>
                  <div className="space-y-3 pt-2 border-t border-slate-200">
                    <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Upload Drawings (Optional)</p>
                    <FileInput label="Drawing / Image" fileKey="drawing" accept="image/png,image/jpeg,.pdf,.zip" />
                    <FileInput label="PDF Specification" fileKey="pdf" accept=".pdf" />
                    <FileInput label="CAD File (STEP/IGES/DWG/DXF)" fileKey="cad" accept=".step,.stp,.iges,.dwg,.dxf" />
                    <p className="text-[10px] text-slate-500">Max 25 MB. Accepted: PDF, STEP, STP, IGES, DWG, DXF, PNG, JPG, ZIP</p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-bold text-slate-900">Contact Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Full Name *</label>
                      <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your Name" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Company</label>
                      <input value={form.company} onChange={e => update('company', e.target.value)} placeholder="Company Name" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="email@company.com" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Phone</label>
                      <input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Country</label>
                    <input value={form.country} onChange={e => update('country', e.target.value)} placeholder="India" className={inputClass} />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                {step > 0 ? (
                  <button onClick={() => setStep(step - 1)} className="px-5 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">← Back</button>
                ) : <span></span>}
                {step < 3 ? (
                  <button onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()} className="flex items-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-semibold tracking-wide rounded transition-all">
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={() => canProceed() && handleSubmit()} disabled={!canProceed() || loading} className="flex items-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-semibold tracking-wide rounded transition-all">
                    <Send className="w-3.5 h-3.5" /> {loading ? 'Submitting...' : 'Submit RFQ'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}