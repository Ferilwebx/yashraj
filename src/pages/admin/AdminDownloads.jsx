import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Save, Upload, Trash2, Plus, FileText, ArrowUp, ArrowDown } from 'lucide-react';

export default function AdminDownloads() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const data = await base44.entities.Download.list('sort_order');
      setItems(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const addNew = async () => {
    try {
      const created = await base44.entities.Download.create({
        title: 'New Document',
        description: '',
        file_url: '',
        file_type: 'pdf',
        file_size: '',
        category: 'other',
        sort_order: items.length,
        is_active: true,
      });
      setItems([...items, created]);
    } catch (err) { console.error(err); alert('Error creating download.'); }
  };

  const update = async (id, field, value) => {
    setItems(items.map(it => it.id === id ? { ...it, [field]: value } : it));
    try {
      await base44.entities.Download.update(id, { [field]: value });
    } catch (err) { console.error(err); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this download?')) return;
    try {
      await base44.entities.Download.delete(id);
      setItems(items.filter(it => it.id !== id));
    } catch (err) { console.error(err); alert('Error deleting.'); }
  };

  const handleUpload = async (e, id) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(id);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      const sizeKB = Math.round(file.size / 1024);
      const sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
      const ext = file.name.split('.').pop()?.toLowerCase() || 'other';
      update(id, 'file_url', file_url);
      update(id, 'file_size', sizeStr);
      if (ext) update(id, 'file_type', ext);
    } catch (err) { console.error(err); alert('Upload failed.'); } finally { setUploading(null); }
  };

  const move = async (id, dir) => {
    const idx = items.findIndex(it => it.id === id);
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= items.length) return;
    const a = items[idx];
    const b = items[swapIdx];
    const newOrder = [...items];
    newOrder[idx] = b;
    newOrder[swapIdx] = a;
    setItems(newOrder);
    try {
      await base44.entities.Download.update(a.id, { sort_order: swapIdx });
      await base44.entities.Download.update(b.id, { sort_order: idx });
    } catch (err) { console.error(err); }
  };

  if (loading) return <div className="p-8 text-slate-400">Loading...</div>;

  const inputClass = "w-full bg-white border border-slate-200 text-sm px-3 py-2.5 rounded-md focus:outline-none focus:border-rose-500";
  const labelClass = "text-xs text-slate-500 block mb-1.5 font-medium";

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Downloads</h1>
          <p className="text-sm text-slate-500 mt-1">Manage downloadable technical resources shown on the Downloads page.</p>
        </div>
        <button onClick={addNew} className="flex items-center gap-1.5 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-md transition-colors">
          <Plus className="w-4 h-4" /> Add Document
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="flex items-start gap-4">
              {/* Order controls */}
              <div className="flex flex-col gap-1 pt-8">
                <button onClick={() => move(item.id, -1)} disabled={i === 0} className="p-1 text-slate-400 hover:text-rose-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button onClick={() => move(item.id, 1)} disabled={i === items.length - 1} className="p-1 text-slate-400 hover:text-rose-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className={labelClass}>Title</label>
                  <input value={item.title || ''} onChange={e => update(item.id, 'title', e.target.value)} className={inputClass} placeholder="Company Profile" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea value={item.description || ''} onChange={e => update(item.id, 'description', e.target.value)} rows={2} className={`${inputClass} resize-none`} placeholder="Brief description of the document" />
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <select value={item.category || 'other'} onChange={e => update(item.id, 'category', e.target.value)} className={inputClass}>
                    <option value="company">Company</option>
                    <option value="capability">Capability</option>
                    <option value="certificate">Certificate</option>
                    <option value="technical">Technical</option>
                    <option value="quality">Quality</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>File Type</label>
                  <select value={item.file_type || 'pdf'} onChange={e => update(item.id, 'file_type', e.target.value)} className={inputClass}>
                    <option value="pdf">PDF</option>
                    <option value="doc">DOC</option>
                    <option value="docx">DOCX</option>
                    <option value="xls">XLS</option>
                    <option value="xlsx">XLSX</option>
                    <option value="step">STEP</option>
                    <option value="stp">STP</option>
                    <option value="iges">IGES</option>
                    <option value="dwg">DWG</option>
                    <option value="dxf">DXF</option>
                    <option value="zip">ZIP</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>File Size (display)</label>
                  <input value={item.file_size || ''} onChange={e => update(item.id, 'file_size', e.target.value)} className={inputClass} placeholder="4.2 MB" />
                </div>
                <div>
                  <label className={labelClass}>Active</label>
                  <label className="flex items-center gap-2 mt-2">
                    <input type="checkbox" checked={item.is_active !== false} onChange={e => update(item.id, 'is_active', e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500" />
                    <span className="text-sm text-slate-600">Show on website</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>File Upload</label>
                  <div className="flex items-center gap-3">
                    {item.file_url ? (
                      <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 rounded-md hover:bg-emerald-100 transition-colors">
                        <FileText className="w-3.5 h-3.5" /> View Current File
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 px-3 py-2">No file uploaded</span>
                    )}
                    <label className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-xs text-slate-600 rounded-md cursor-pointer hover:border-rose-500 transition-colors">
                      <Upload className="w-3.5 h-3.5" /> {uploading === item.id ? 'Uploading...' : 'Upload File'}
                      <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.step,.stp,.iges,.dwg,.dxf,.zip" onChange={e => handleUpload(e, item.id)} className="hidden" disabled={uploading === item.id} />
                    </label>
                  </div>
                </div>
              </div>

              <button onClick={() => remove(item.id)} className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">No downloads yet. Click "Add Document" to create one.</div>
        )}
      </div>
    </div>
  );
}