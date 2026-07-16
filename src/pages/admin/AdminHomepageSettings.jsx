import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Save, Upload, CheckCircle, Plus, Trash2 } from 'lucide-react';

export default function AdminHomepageSettings() {
  const [form, setForm] = useState({ hero_heading: '', hero_subheading: '', hero_image: '', statistics: [], clients_logos: [], certificates: [] });
  const [recordId, setRecordId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const data = await base44.entities.HomepageSetting.list('-created_date', 1);
      if (data.length > 0) {
        setRecordId(data[0].id);
        setForm({
          hero_heading: data[0].hero_heading || '',
          hero_subheading: data[0].hero_subheading || '',
          hero_image: data[0].hero_image || '',
          statistics: data[0].statistics || [],
          clients_logos: data[0].clients_logos || [],
          certificates: data[0].certificates || [],
        });
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

  // Statistics helpers
  const addStat = () => update('statistics', [...form.statistics, { value: '', label: '' }]);
  const updateStat = (i, k, v) => { const s = [...form.statistics]; s[i][k] = v; update('statistics', s); };
  const removeStat = (i) => update('statistics', form.statistics.filter((_, idx) => idx !== i));

  // Clients logos helpers
  const addLogo = () => update('clients_logos', [...form.clients_logos, { name: '', logo_url: '' }]);
  const updateLogo = (i, k, v) => { const l = [...form.clients_logos]; l[i][k] = v; update('clients_logos', l); };
  const removeLogo = (i) => update('clients_logos', form.clients_logos.filter((_, idx) => idx !== i));
  const handleLogoUpload = async (e, i) => {
    const file = e.target.files[0]; if (!file) return;
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    updateLogo(i, 'logo_url', file_url);
  };

  // Certificates helpers
  const addCert = () => update('certificates', [...form.certificates, { name: '', image_url: '' }]);
  const updateCert = (i, k, v) => { const c = [...form.certificates]; c[i][k] = v; update('certificates', c); };
  const removeCert = (i) => update('certificates', form.certificates.filter((_, idx) => idx !== i));
  const handleCertUpload = async (e, i) => {
    const file = e.target.files[0]; if (!file) return;
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    updateCert(i, 'image_url', file_url);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (recordId) {
        await base44.entities.HomepageSetting.update(recordId, form);
      } else {
        const created = await base44.entities.HomepageSetting.create(form);
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
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Homepage Settings</h1>
      <div className="space-y-5">
        {/* Hero Section */}
        <div className="pb-4 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Hero Section</h3>
          <div className="space-y-4">
            <div><label className={labelClass}>Hero Heading</label><input value={form.hero_heading || ''} onChange={e => update('hero_heading', e.target.value)} className={inputClass} placeholder="Precision Die Casting" /></div>
            <div><label className={labelClass}>Hero Subheading</label><textarea value={form.hero_subheading || ''} onChange={e => update('hero_subheading', e.target.value)} rows={2} className={`${inputClass} resize-none`} placeholder="Subheading text" /></div>
            <div>
              <label className={labelClass}>Hero Image</label>
              {form.hero_image && <img src={form.hero_image} alt="Hero" className="h-24 rounded-md border border-slate-200 mb-2" />}
              <label className="flex items-center gap-2 px-4 py-2.5 bg-white border border-dashed border-slate-300 text-sm text-slate-500 rounded-md cursor-pointer hover:border-rose-500 transition-colors w-fit">
                <Upload className="w-4 h-4" /> Upload Hero Image
                <input type="file" accept="image/*" onChange={e => handleUpload(e, 'hero_image')} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="pb-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Statistics</h3>
            <button onClick={addStat} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-md transition-colors"><Plus className="w-3.5 h-3.5" /> Add Stat</button>
          </div>
          <div className="space-y-3">
            {form.statistics.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={s.value || ''} onChange={e => updateStat(i, 'value', e.target.value)} className={`${inputClass} w-32`} placeholder="9" />
                <input value={s.label || ''} onChange={e => updateStat(i, 'label', e.target.value)} className={inputClass} placeholder="Die Casting Machines" />
                <button onClick={() => removeStat(i)} className="p-2 text-slate-400 hover:text-rose-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {form.statistics.length === 0 && <p className="text-xs text-slate-400">No statistics added.</p>}
          </div>
        </div>

        {/* Clients Logos */}
        <div className="pb-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Clients Logos</h3>
            <button onClick={addLogo} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-md transition-colors"><Plus className="w-3.5 h-3.5" /> Add Logo</button>
          </div>
          <div className="space-y-3">
            {form.clients_logos.map((l, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={l.name || ''} onChange={e => updateLogo(i, 'name', e.target.value)} className={`${inputClass} w-40`} placeholder="Client name" />
                {l.logo_url && <img src={l.logo_url} alt={l.name} className="h-8 rounded border border-slate-200" />}
                <label className="flex items-center gap-1 px-3 py-2 bg-white border border-slate-200 text-xs text-slate-500 rounded-md cursor-pointer hover:border-rose-500 transition-colors">
                  <Upload className="w-3.5 h-3.5" /> Upload
                  <input type="file" accept="image/*" onChange={e => handleLogoUpload(e, i)} className="hidden" />
                </label>
                <button onClick={() => removeLogo(i)} className="p-2 text-slate-400 hover:text-rose-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {form.clients_logos.length === 0 && <p className="text-xs text-slate-400">No logos added.</p>}
          </div>
        </div>

        {/* Certificates */}
        <div className="pb-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Certificates</h3>
            <button onClick={addCert} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-md transition-colors"><Plus className="w-3.5 h-3.5" /> Add Certificate</button>
          </div>
          <div className="space-y-3">
            {form.certificates.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={c.name || ''} onChange={e => updateCert(i, 'name', e.target.value)} className={`${inputClass} w-40`} placeholder="ISO 9001:2015" />
                {c.image_url && <img src={c.image_url} alt={c.name} className="h-10 rounded border border-slate-200" />}
                <label className="flex items-center gap-1 px-3 py-2 bg-white border border-slate-200 text-xs text-slate-500 rounded-md cursor-pointer hover:border-rose-500 transition-colors">
                  <Upload className="w-3.5 h-3.5" /> Upload
                  <input type="file" accept="image/*" onChange={e => handleCertUpload(e, i)} className="hidden" />
                </label>
                <button onClick={() => removeCert(i)} className="p-2 text-slate-400 hover:text-rose-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {form.certificates.length === 0 && <p className="text-xs text-slate-400">No certificates added.</p>}
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