import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Plus, Search, Trash2, Pencil, Eye } from 'lucide-react';
import { formatDate } from '@/utils/adminUtils';

export default function AdminBlogList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.BlogPost.list('-created_date', 200);
      setItems(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const filtered = items.filter(i => !search || `${i.title} ${i.slug}`.toLowerCase().includes(search.toLowerCase()));

  const toggleStatus = async (item) => {
    const newStatus = item.status === 'published' ? 'draft' : 'published';
    const updates = { status: newStatus };
    if (newStatus === 'published' && !item.published_date) updates.published_date = new Date().toISOString();
    await base44.entities.BlogPost.update(item.id, updates);
    setItems(items.map(i => i.id === item.id ? { ...i, ...updates } : i));
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    await base44.entities.BlogPost.delete(id);
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
          <p className="text-sm text-slate-500 mt-1">{filtered.length} posts</p>
        </div>
        <Link to="/admin/blog/new" className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-md transition-colors">
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="relative mb-5">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." className="w-full bg-white border border-slate-200 text-sm pl-10 pr-4 py-2.5 rounded-md focus:outline-none focus:border-rose-500" />
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-left text-xs text-slate-500 uppercase tracking-wider">
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold hidden md:table-cell">Date</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="4" className="px-5 py-8 text-center text-slate-400">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="4" className="px-5 py-8 text-center text-slate-400">No posts found. <Link to="/admin/blog/new" className="text-rose-600">Create one</Link></td></tr>
              ) : filtered.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-500">/{item.slug}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => toggleStatus(item)} className={`text-[10px] font-mono px-2 py-1 rounded uppercase transition-colors ${item.status === 'published' ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                      {item.status}
                    </button>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-xs text-slate-500">{formatDate(item.published_date || item.created_date)}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <Link to={`/admin/blog/${item.id}`} className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"><Pencil className="w-4 h-4" /></Link>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}