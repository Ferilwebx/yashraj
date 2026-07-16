import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Upload, Search, Trash2, FolderPlus, Image as ImageIcon } from 'lucide-react';

export default function AdminMedia() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [folder, setFolder] = useState('all');
  const [newFolder, setNewFolder] = useState('');
  const fileRef = useRef(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.MediaItem.list('-created_date', 500);
      setItems(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const folders = ['all', ...new Set(items.map(i => i.folder || 'general').filter(Boolean))];

  const filtered = items.filter(i => {
    const matchSearch = !search || i.name.toLowerCase().includes(search.toLowerCase());
    const matchFolder = folder === 'all' || (i.folder || 'general') === folder;
    return matchSearch && matchFolder;
  });

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        await base44.entities.MediaItem.create({
          name: file.name,
          url: file_url,
          file_type: file.type || file.name.split('.').pop(),
          folder: folder === 'all' ? 'general' : folder,
          size_kb: Math.round(file.size / 1024),
        });
      }
      await load();
    } catch (err) { console.error(err); alert('Upload failed.'); } finally { setUploading(false); if (fileRef.current) fileRef.current.value = ''; }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this media item?')) return;
    await base44.entities.MediaItem.delete(id);
    setItems(items.filter(i => i.id !== id));
  };

  const addFolder = () => {
    if (newFolder && !folders.includes(newFolder)) {
      setFolder(newFolder);
      setNewFolder('');
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Media Library</h1>
          <p className="text-sm text-slate-500 mt-1">{filtered.length} items</p>
        </div>
        <label className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer">
          <Upload className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload'}
          <input ref={fileRef} type="file" multiple onChange={handleUpload} className="hidden" accept="image/*,application/pdf,.step,.stp,.iges,.dwg,.dxf,.zip" />
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search media..." className="w-full bg-white border border-slate-200 text-sm pl-10 pr-4 py-2.5 rounded-md focus:outline-none focus:border-rose-500" />
        </div>
        <select value={folder} onChange={e => setFolder(e.target.value)} className="bg-white border border-slate-200 text-sm px-4 py-2.5 rounded-md focus:outline-none focus:border-rose-500">
          {folders.map(f => <option key={f} value={f}>{f === 'all' ? 'All Folders' : f}</option>)}
        </select>
      </div>

      {/* New folder */}
      <div className="flex items-center gap-2 mb-5">
        <input value={newFolder} onChange={e => setNewFolder(e.target.value)} onKeyDown={e => e.key === 'Enter' && addFolder()} placeholder="New folder name..." className="bg-white border border-slate-200 text-sm px-3 py-2 rounded-md focus:outline-none focus:border-rose-500 w-48" />
        <button onClick={addFolder} className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 hover:text-rose-600 transition-colors"><FolderPlus className="w-4 h-4" /> Add</button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No media items. Upload files to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="group relative bg-white border border-slate-200 rounded-lg overflow-hidden">
              <div className="aspect-square bg-slate-50 flex items-center justify-center overflow-hidden">
                {item.file_type?.startsWith('image/') ? (
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-2">
                    <ImageIcon className="w-8 h-8 text-slate-300 mx-auto" />
                    <span className="text-[10px] text-slate-400 uppercase mt-1 block">{item.name.split('.').pop()}</span>
                  </div>
                )}
              </div>
              <div className="p-2">
                <p className="text-xs text-slate-700 truncate font-medium">{item.name}</p>
                <p className="text-[10px] text-slate-400">{item.size_kb ? `${item.size_kb} KB` : ''}</p>
              </div>
              <button onClick={() => handleDelete(item.id)} className="absolute top-2 right-2 w-7 h-7 bg-white/90 border border-slate-200 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-50 hover:border-rose-600/40">
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}