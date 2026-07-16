import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { LayoutDashboard, Mail, FileText, Users, Newspaper, Image, Images, Search, Settings, Home, LogOut, FolderOpen, Download } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Images', path: '/admin/images', icon: Images },
  { label: 'Enquiries', path: '/admin/enquiries', icon: Mail },
  { label: 'RFQs', path: '/admin/rfqs', icon: FileText },
  { label: 'Careers', path: '/admin/careers', icon: Users },
  { label: 'Blog', path: '/admin/blog', icon: Newspaper },
  { label: 'Media', path: '/admin/media', icon: Image },
  { label: 'Downloads', path: '/admin/downloads', icon: Download },
  { label: 'SEO Settings', path: '/admin/seo', icon: Search },
  { label: 'Site Settings', path: '/admin/settings', icon: Settings },
  { label: 'Homepage', path: '/admin/homepage', icon: FolderOpen },
];

export default function AdminRoute() {
  const { isAuthenticated, isLoadingAuth, authChecked, user, logout } = useAuth();
  const location = useLocation();

  if (isLoadingAuth || !authChecked) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-950">
        <div className="w-8 h-8 border-2 border-slate-800 border-t-rose-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (user?.role !== 'admin' && user?.role !== 'super_admin') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-950 text-center px-6">
        <div>
          <p className="text-rose-500 text-sm font-mono tracking-widest uppercase mb-3">Access Denied</p>
          <h1 className="text-2xl font-bold text-white mb-2">Admin access required</h1>
          <p className="text-slate-400 text-sm mb-6">Your account does not have admin privileges.</p>
          <Link to="/" className="text-rose-500 hover:text-rose-400 text-sm">← Back to website</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-slate-300 fixed inset-y-0 left-0 flex flex-col z-50">
        <div className="px-6 py-5 border-b border-slate-800">
          <Link to="/admin" className="flex items-center gap-2.5">
            <span className="text-lg font-extrabold text-white tracking-tight">YE</span>
            <span className="w-2 h-2 bg-rose-600 rounded-full"></span>
            <span className="text-xs text-slate-500 uppercase tracking-widest ml-1">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${active ? 'bg-rose-600/10 text-rose-500 font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}>
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-slate-800 space-y-0.5">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-slate-400 hover:text-white hover:bg-slate-900 transition-colors">
            <Home className="w-4 h-4" /> View Website
          </Link>
          <button onClick={() => logout('/admin/login')} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-slate-400 hover:text-rose-500 hover:bg-slate-900 transition-colors w-full">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-64">
        <Outlet />
      </div>
    </div>
  );
}