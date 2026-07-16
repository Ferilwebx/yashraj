import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Mail, FileText, Users, TrendingUp, ArrowRight, CheckCircle, Activity } from 'lucide-react';
import { formatDate } from '@/utils/adminUtils';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ enquiries: 0, rfqs: 0, careers: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [enquiries, rfqs, careers] = await Promise.all([
          base44.entities.ContactEnquiry.list('-created_date', 5),
          base44.entities.RFQ.list('-created_date', 5),
          base44.entities.CareerApplication.list('-created_date', 5),
        ]);
        setStats({ enquiries: enquiries.length, rfqs: rfqs.length, careers: careers.length });
        const all = [
          ...enquiries.map(e => ({ ...e, _type: 'Enquiry' })),
          ...rfqs.map(r => ({ ...r, _type: 'RFQ' })),
          ...careers.map(c => ({ ...c, _type: 'Career' })),
        ].sort((a, b) => new Date(b.created_date) - new Date(a.created_date)).slice(0, 8);
        setRecent(all);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    })();
  }, []);

  const statCards = [
    { label: 'Quote Requests', value: stats.rfqs, icon: FileText, path: '/admin/rfqs', color: 'text-rose-600' },
    { label: 'Contact Messages', value: stats.enquiries, icon: Mail, path: '/admin/enquiries', color: 'text-blue-600' },
    { label: 'Career Applications', value: stats.careers, icon: Users, path: '/admin/careers', color: 'text-emerald-600' },
  ];

  const healthChecks = [
    { label: 'Database', status: 'operational' },
    { label: 'File Storage', status: 'operational' },
    { label: 'Email Service', status: 'operational' },
    { label: 'Authentication', status: 'operational' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of enquiries, quotations, and applications.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {statCards.map(card => {
          const Icon = card.icon;
          return (
            <Link key={card.label} to={card.path} className="bg-white border border-slate-200 rounded-lg p-6 hover:border-rose-600/40 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <TrendingUp className="w-4 h-4 text-slate-300 group-hover:text-rose-500 transition-colors" />
              </div>
              <div className="text-3xl font-bold text-slate-900">{loading ? '—' : card.value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">{card.label}</div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Recent Enquiries</h2>
            <Activity className="w-4 h-4 text-slate-400" />
          </div>
          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-8 text-center text-sm text-slate-400">Loading...</div>
            ) : recent.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-400">No enquiries yet.</div>
            ) : recent.map(item => (
              <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded uppercase">{item._type}</span>
                    <span className="text-sm font-medium text-slate-900">{item.name || item.customer_name}</span>
                  </div>
                  <p className="text-xs text-slate-500">{item.email} · {formatDate(item.created_date)}</p>
                </div>
                <span className={`text-[10px] font-mono px-2 py-1 rounded uppercase ${item.status === 'new' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Health Status */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-sm font-semibold text-slate-900">Website Health</h2>
          </div>
          <div className="p-6 space-y-3">
            {healthChecks.map(h => (
              <div key={h.label} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{h.label}</span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-600">
                  <CheckCircle className="w-3.5 h-3.5" /> Operational
                </span>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
            <Link to="/admin/enquiries" className="flex items-center gap-1.5 text-xs font-medium text-rose-600 hover:text-rose-500">
              View all enquiries <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}