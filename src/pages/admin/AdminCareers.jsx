import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Search, Trash2, X, ChevronDown, Download } from 'lucide-react';
import { formatDate } from '@/utils/adminUtils';

const STATUS_OPTIONS = ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'];

export default function AdminCareers() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.CareerApplication.list('-created_date', 500);
      setItems(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const filtered = items.filter(i => {
    const matchSearch = !search || `${i.name} ${i.email} ${i.position}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || i.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (id, status) => {
    await base44.entities.CareerApplication.update(id, { status });
    setItems(items.map(i => i.id === id ? { ...i, status } : i));
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this application?')) return;
    await base44.entities.CareerApplication.delete(id);
    setItems(items.filter(i => i.id !== id));
    setSelected(null);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Career Applications</h1>
          <p className="text-sm text-slate-500 mt-1">{filtered.length} {filtered.length === 1 ? 'application' : 'applications'}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, position..." className="w-full bg-white border border-slate-200 text-sm pl-10 pr-4 py-2.5 rounded-md focus:outline-none focus:border-rose-500" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-white border border-slate-200 text-sm px-4 py-2.5 rounded-md focus:outline-none focus:border-rose-500">
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-left text-xs text-slate-500 uppercase tracking-wider">
                <th className="px-5 py-3 font-semibold">Applicant</th>
                <th className="px-5 py-3 font-semibold hidden md:table-cell">Position</th>
                <th className="px-5 py-3 font-semibold hidden md:table-cell">Experience</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold hidden lg:table-cell">Date</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="6" className="px-5 py-8 text-center text-slate-400">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="6" className="px-5 py-8 text-center text-slate-400">No applications found.</td></tr>
              ) : filtered.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelected(item)}>
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-slate-900">{item.name}</div>
                    <div className="text-xs text-slate-500">{item.email}</div>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-slate-600">{item.position || '—'}</td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-slate-600">{item.experience || '—'}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-mono px-2 py-1 rounded uppercase ${item.status === 'new' ? 'bg-rose-50 text-rose-600' : item.status === 'shortlisted' ? 'bg-emerald-50 text-emerald-600' : item.status === 'rejected' ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>{item.status}</span>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell text-xs text-slate-500">{formatDate(item.created_date)}</td>
                  <td className="px-5 py-3.5 text-right"><ChevronDown className="w-4 h-4 text-slate-400 inline" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Application Detail</h3>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-xs text-slate-500 block">Name</span><span className="font-medium text-slate-900">{selected.name}</span></div>
                <div><span className="text-xs text-slate-500 block">Position</span><span className="font-medium text-slate-900">{selected.position || '—'}</span></div>
                <div><span className="text-xs text-slate-500 block">Email</span><span className="font-medium text-slate-900">{selected.email}</span></div>
                <div><span className="text-xs text-slate-500 block">Phone</span><span className="font-medium text-slate-900">{selected.phone || '—'}</span></div>
                <div><span className="text-xs text-slate-500 block">Experience</span><span className="font-medium text-slate-900">{selected.experience || '—'}</span></div>
                <div><span className="text-xs text-slate-500 block">Date</span><span className="font-medium text-slate-900">{formatDate(selected.created_date)}</span></div>
              </div>
              {selected.message && (
                <div><span className="text-xs text-slate-500 block mb-1">Message</span><p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-md">{selected.message}</p></div>
              )}
              {selected.resume_url && (
                <a href={selected.resume_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700 hover:border-rose-600/40 transition-colors">
                  <Download className="w-4 h-4 text-slate-400" /> Download Resume
                </a>
              )}
              <div>
                <label className="text-xs text-slate-500 block mb-1.5">Status</label>
                <select value={selected.status} onChange={e => updateStatus(selected.id, e.target.value)} className="w-full bg-white border border-slate-200 text-sm px-3 py-2.5 rounded-md focus:outline-none focus:border-rose-500">
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
              <button onClick={() => handleDelete(selected.id)} className="flex items-center gap-1.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-md transition-colors">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}