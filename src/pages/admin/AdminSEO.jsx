import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Save, Upload, CheckCircle } from 'lucide-react';

export default function AdminSEO() {
  const [form, setForm] = useState({ website_title: '', meta_description: '', og_image: '', google_verification: '', robots: '', favicon: '' });
  const [recordId, setRecordId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const data = await base44.entities.SEOSetting.list('-created_date', 1);
      if (data.length > 0) {
        setRecordId(data[0].id);
        setForm(data[0]);
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const update = (k, v) => setForm({ ...form, [k]: v });

  const handleUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    update(field, file_url);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (recordId) {
        await base44.entities.SEOSetting.update(recordId, form);
      } else {
        const created = await base44.entities.SEOSetting.create(form);
        setRecordId(created.id);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) { console.error(err); alert('Error saving settings.'); } finally { setSaving(false); }
  };

  if (loading) return <div className="p-8 text-slate-400">Loading...</div>;

  const inputClass = "w-full bg-white border border-slate-200 text-sm px-3 py-2.5 rounded-md focus:outline-none focus:border-rose-500";
  const labelClass = "text-xs text-slate-500 block mb-1.5 font-medium";

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">SEO Settings</h1>
      <div className="space-y-5">
        <div>
          <label className={labelClass}>Website Title</label>
          <input value={form.website_title || ''} onChange={e => update('website_title', e.target.value)} className={inputClass} placeholder="Yashraj Enterprise — Precision Die Casting" />
        </div>
        <div>
          <label className={labelClass}>Meta Description</label>
          <textarea value={form.meta_description || ''} onChange={e => update('meta_description', e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Meta description for search engines" />
        </div>
        <div>
          <label className={labelClass}>OG Image (Social Share Image)</label>
          {form.og_image && <img src={form.og_image} alt="OG" className="h-20 rounded-md border border-slate-200 mb-2" />}
          <label className="flex items-center gap-2 px-4 py-2.5 bg-white border border-dashed border-slate-300 text-sm text-slate-500 rounded-md cursor-pointer hover:border-rose-500 transition-colors w-fit">
            <Upload className="w-4 h-4" /> Upload OG Image
            <input type="file" accept="image/*" onChange={e => handleUpload(e, 'og_image')} className="hidden" />
          </label>
        </div>
        <div>
          <label className={labelClass}>Google Verification Code</label>
          <input value={form.google_verification || ''} onChange={e => update('google_verification', e.target.value)} className={inputClass} placeholder="google-site-verification content value" />
        </div>
        <div>
          <label className={labelClass}>Robots (robots.txt content)</label>
          <textarea value={form.robots || ''} onChange={e => update('robots', e.target.value)} rows={4} className={`${inputClass} resize-none font-mono text-xs`} placeholder="User-agent: *&#10;Allow: /" />
        </div>
        <div>
          <label className={labelClass}>Favicon URL</label>
          {form.favicon && <img src={form.favicon} alt="Favicon" className="w-8 h-8 rounded border border-slate-200 mb-2" />}
          <label className="flex items-center gap-2 px-4 py-2.5 bg-white border border-dashed border-slate-300 text-sm text-slate-500 rounded-md cursor-pointer hover:border-rose-500 transition-colors w-fit">
            <Upload className="w-4 h-4" /> Upload Favicon
            <input type="file" accept="image/*" onChange={e => handleUpload(e, 'favicon')} className="hidden" />
          </label>
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-md transition-colors">
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Settings'}
          </button>
          {saved && <span className="flex items-center gap-1.5 text-sm text-emerald-600"><CheckCircle className="w-4 h-4" /> Saved</span>}
        </div>
      </div>
    </div>
  );
}