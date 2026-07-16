import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Save, CheckCircle, Upload, Trash2 } from 'lucide-react';

export default function AdminSiteSettings() {
  const [form, setForm] = useState({ company_name: '', website_logo: '', address: '', phone: '', email: '', google_map_embed: '', social_facebook: '', social_twitter: '', social_linkedin: '', social_instagram: '', working_hours: '' });
  const [recordId, setRecordId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const data = await base44.entities.SiteSetting.list('-created_date', 1);
      if (data.length > 0) {
        setRecordId(data[0].id);
        setForm(data[0]);
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const update = (k, v) => setForm({ ...form, [k]: v });

  const handleLogoUpload = async (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { alert('File too large. Max 10MB.'); return; }
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!allowed.includes(file.type)) { alert('Only JPG, PNG, WEBP, SVG files allowed.'); return; }
    setUploadingLogo(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      update('website_logo', file_url);
    } catch (err) { console.error(err); alert('Error uploading logo.'); } finally { setUploadingLogo(false); }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (recordId) {
        await base44.entities.SiteSetting.update(recordId, form);
      } else {
        const created = await base44.entities.SiteSetting.create(form);
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
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Site Settings</h1>
      <div className="space-y-5">
        <div>
          <label className={labelClass}>Company Name</label>
          <input value={form.company_name || ''} onChange={e => update('company_name', e.target.value)} className={inputClass} placeholder="Yashraj Enterprise" />
        </div>

        <div>
          <label className={labelClass}>Website Logo</label>
          <p className="text-xs text-slate-400 mb-3">Upload a logo image (JPG, PNG, WEBP, SVG — max 10MB). Replaces the "YE" text in the navbar. Recommended: transparent background, height ~36px.</p>
          <div className="flex items-center gap-4">
            <div className="w-32 h-16 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-center overflow-hidden shrink-0">
              {form.website_logo ? (
                <img src={form.website_logo} alt="Logo preview" className="max-h-12 max-w-full object-contain" />
              ) : (
                <span className="text-xs text-slate-400">No logo</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                {uploadingLogo ? 'Uploading...' : (form.website_logo ? 'Replace Logo' : 'Upload Logo')}
                <input type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" className="hidden" onChange={e => handleLogoUpload(e.target.files[0])} disabled={uploadingLogo} />
              </label>
              {form.website_logo && (
                <button onClick={() => update('website_logo', '')} className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-300 text-xs font-medium rounded-md transition-colors">
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              )}
            </div>
          </div>
        </div>
        <div>
          <label className={labelClass}>Address</label>
          <textarea value={form.address || ''} onChange={e => update('address', e.target.value)} rows={2} className={`${inputClass} resize-none`} placeholder="Plot No. PAP-94, Phase 3, Chakan Industrial Area, Pune 410501" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Phone</label>
            <input value={form.phone || ''} onChange={e => update('phone', e.target.value)} className={inputClass} placeholder="+91 99235 98986" />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input value={form.email || ''} onChange={e => update('email', e.target.value)} className={inputClass} placeholder="mallubarikai@zohomail.in" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Google Map Embed URL</label>
          <input value={form.google_map_embed || ''} onChange={e => update('google_map_embed', e.target.value)} className={inputClass} placeholder="https://maps.google.com/maps?..." />
        </div>
        <div>
          <label className={labelClass}>Working Hours</label>
          <input value={form.working_hours || ''} onChange={e => update('working_hours', e.target.value)} className={inputClass} placeholder="Mon–Sat, 9am–6pm IST" />
        </div>

        <div className="pt-4 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Social Links</h3>
          <div className="space-y-4">
            <div><label className={labelClass}>Facebook</label><input value={form.social_facebook || ''} onChange={e => update('social_facebook', e.target.value)} className={inputClass} placeholder="https://facebook.com/..." /></div>
            <div><label className={labelClass}>Twitter / X</label><input value={form.social_twitter || ''} onChange={e => update('social_twitter', e.target.value)} className={inputClass} placeholder="https://twitter.com/..." /></div>
            <div><label className={labelClass}>LinkedIn</label><input value={form.social_linkedin || ''} onChange={e => update('social_linkedin', e.target.value)} className={inputClass} placeholder="https://linkedin.com/..." /></div>
            <div><label className={labelClass}>Instagram</label><input value={form.social_instagram || ''} onChange={e => update('social_instagram', e.target.value)} className={inputClass} placeholder="https://instagram.com/..." /></div>
          </div>
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