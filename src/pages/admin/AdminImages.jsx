import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Search, Upload, X, RotateCcw, Save, Image as ImageIcon, Eye } from 'lucide-react';

const VALID_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
const VALID_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

const categories = ['all', 'hero', 'banner', 'gallery', 'facility', 'product', 'industry', 'capability', 'background', 'other'];

export default function AdminImages() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [pageFilter, setPageFilter] = useState('all');
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.WebsiteImage.list('sort_order', 500);
      setItems(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const pages = ['all', ...new Set(items.map(i => i.page).filter(Boolean))];

  const filtered = items.filter(i => {
    const matchSearch = !search || `${i.name} ${i.page} ${i.section} ${i.key}`.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || i.category === category;
    const matchPage = pageFilter === 'all' || i.page === pageFilter;
    return matchSearch && matchCat && matchPage;
  });

  const validateImage = (file) => {
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!VALID_TYPES.includes(file.type) && !VALID_EXTS.includes(ext)) {
      return { valid: false, error: 'Only JPG, PNG, WEBP, and SVG files are allowed.' };
    }
    if (file.size > MAX_SIZE) {
      return { valid: false, error: 'Maximum file size is 10 MB.' };
    }
    return { valid: true };
  };

  const handleReplace = async (file, item) => {
    const validation = validateImage(file);
    if (!validation.valid) { alert(validation.error); return; }
    setUploading(true);
    setUploadProgress(0);
    try {
      setUploadProgress(30);
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setUploadProgress(70);
      const updated = await base44.entities.WebsiteImage.update(item.id, {
        url: file_url,
        previous_url: item.url,
        file_size_kb: Math.round(file.size / 1024),
      });
      setItems(items.map(i => i.id === item.id ? { ...i, ...updated } : i));
      setEditing({ ...editing, ...updated, url: file_url, previous_url: item.url });
      setUploadProgress(100);
    } catch (err) { console.error(err); alert('Upload failed.'); } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleRestore = async (item) => {
    if (!item.previous_url) { alert('No previous version available.'); return; }
    try {
      const updated = await base44.entities.WebsiteImage.update(item.id, {
        url: item.previous_url,
        previous_url: item.url,
      });
      setItems(items.map(i => i.id === item.id ? { ...i, ...updated } : i));
      setEditing({ ...editing, ...updated });
    } catch (err) { console.error(err); alert('Restore failed.'); }
  };

  const handleSaveMeta = async () => {
    try {
      const updated = await base44.entities.WebsiteImage.update(editing.id, {
        name: editing.name,
        alt_text: editing.alt_text,
        title: editing.title,
        caption: editing.caption,
      });
      setItems(items.map(i => i.id === editing.id ? { ...i, ...updated } : i));
      setEditing(null);
    } catch (err) { console.error(err); alert('Error saving.'); }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Image Manager</h1>
        <p className="text-sm text-slate-500 mt-1">{filtered.length} images — replace any website image without touching code</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, page, or section..." className="w-full bg-white border border-slate-200 text-sm pl-10 pr-4 py-2.5 rounded-md focus:outline-none focus:border-rose-500" />
        </div>
        <select value={pageFilter} onChange={e => setPageFilter(e.target.value)} className="bg-white border border-slate-200 text-sm px-4 py-2.5 rounded-md focus:outline-none focus:border-rose-500">
          {pages.map(p => <option key={p} value={p}>{p === 'all' ? 'All Pages' : p}</option>)}
        </select>
        <select value={category} onChange={e => setCategory(e.target.value)} className="bg-white border border-slate-200 text-sm px-4 py-2.5 rounded-md focus:outline-none focus:border-rose-500">
          {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading images...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No images found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
                <img src={item.url} alt={item.alt_text || item.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditing(item)} className="p-2 bg-white/90 rounded-md hover:bg-white text-slate-700" title="Edit">
                    <Eye className="w-4 h-4" />
                  </button>
                  <label className="p-2 bg-white/90 rounded-md hover:bg-white text-rose-600 cursor-pointer" title="Replace">
                    <Upload className="w-4 h-4" />
                    <input type="file" accept={VALID_EXTS.join(',')} onChange={e => { if (e.target.files[0]) handleReplace(e.target.files[0], item); }} className="hidden" />
                  </label>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-slate-900 truncate">{item.name}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{item.page} · {item.section}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[9px] font-mono text-slate-400 uppercase">{item.category}</span>
                  {item.file_size_kb && <span className="text-[9px] text-slate-400">{item.file_size_kb} KB</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => !uploading && setEditing(null)}></div>
          <div className="relative z-10 w-full max-w-2xl bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">{editing.name}</h3>
                <p className="text-xs text-slate-500">{editing.page} · {editing.section} · <span className="font-mono">{editing.key}</span></p>
              </div>
              <button onClick={() => !uploading && setEditing(null)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-5 space-y-5">
              {/* Current Image Preview */}
              <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                <img src={editing.url} alt={editing.alt_text || editing.name} className="w-full max-h-64 object-contain" />
                {uploading && (
                  <div className="absolute inset-0 bg-slate-950/70 flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-xs text-white">Uploading... {uploadProgress}%</span>
                  </div>
                )}
              </div>

              {/* Upload progress bar */}
              {uploading && (
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-600 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              )}

              {/* Replace & Restore */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" /> Replace Image
                  <input ref={fileRef} type="file" accept={VALID_EXTS.join(',')} onChange={e => { if (e.target.files[0]) handleReplace(e.target.files[0], editing); }} className="hidden" />
                </label>
                {editing.previous_url && (
                  <button onClick={() => handleRestore(editing)} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-rose-500 text-slate-700 text-xs font-semibold rounded-md transition-colors">
                    <RotateCcw className="w-4 h-4" /> Restore Previous
                  </button>
                )}
              </div>

              {editing.previous_url && (
                <div>
                  <label className="text-xs text-slate-500 block mb-1.5 font-medium">Previous Version</label>
                  <div className="relative rounded-md overflow-hidden border border-slate-200 bg-slate-50">
                    <img src={editing.previous_url} alt="Previous" className="w-full max-h-32 object-contain opacity-70" />
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div>
                  <label className="text-xs text-slate-500 block mb-1.5 font-medium">Image Name</label>
                  <input value={editing.name || ''} onChange={e => setEditing({ ...editing, name: e.target.value })} className="w-full bg-white border border-slate-200 text-sm px-3 py-2 rounded-md focus:outline-none focus:border-rose-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1.5 font-medium">Alt Text (SEO)</label>
                  <input value={editing.alt_text || ''} onChange={e => setEditing({ ...editing, alt_text: e.target.value })} className="w-full bg-white border border-slate-200 text-sm px-3 py-2 rounded-md focus:outline-none focus:border-rose-500" placeholder="Describe the image for screen readers & SEO" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1.5 font-medium">Title</label>
                  <input value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value })} className="w-full bg-white border border-slate-200 text-sm px-3 py-2 rounded-md focus:outline-none focus:border-rose-500" placeholder="Image title (optional)" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1.5 font-medium">Caption (optional)</label>
                  <input value={editing.caption || ''} onChange={e => setEditing({ ...editing, caption: e.target.value })} className="w-full bg-white border border-slate-200 text-sm px-3 py-2 rounded-md focus:outline-none focus:border-rose-500" placeholder="Caption text" />
                </div>
              </div>

              {/* Save */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button onClick={() => setEditing(null)} className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700">Cancel</button>
                <button onClick={handleSaveMeta} className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md transition-colors">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}