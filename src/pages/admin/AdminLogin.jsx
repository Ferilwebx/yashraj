import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';
import { ArrowRight, Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const { isAuthenticated, user, authChecked } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (authChecked && isAuthenticated && (user?.role === 'admin' || user?.role === 'super_admin')) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = '/admin';
    } catch (err) {
      setError(err?.message || 'Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,29,62,0.05),transparent_60%)]"></div>
      <div className="relative w-full max-w-md">
        <Link to="/" className="flex items-center gap-2.5 justify-center mb-10">
          <span className="text-2xl font-extrabold text-white tracking-tight">YE</span>
          <span className="w-2.5 h-2.5 bg-rose-600 rounded-full"></span>
        </Link>

        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex w-12 h-12 items-center justify-center bg-rose-600/10 border border-rose-600/30 rounded-lg mb-4">
              <Lock className="w-5 h-5 text-rose-500" />
            </div>
            <h1 className="text-xl font-bold text-white">Admin Portal</h1>
            <p className="text-sm text-slate-500 mt-1">Yashraj Enterprise — Secure Access</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 bg-rose-600/10 border border-rose-600/30 rounded-md text-sm text-rose-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="admin@yashraj.com"
                  className="w-full bg-slate-900 border border-slate-800 text-white text-sm pl-10 pr-4 py-3 rounded-md focus:outline-none focus:border-rose-500 transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-800 text-white text-sm pl-10 pr-10 py-3 rounded-md focus:outline-none focus:border-rose-500 transition-colors placeholder:text-slate-600"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-bold tracking-widest uppercase rounded-md transition-all"
            >
              {loading ? 'Signing in...' : 'Sign In'} {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Authorized personnel only. <Link to="/" className="text-slate-500 hover:text-rose-500">← Back to website</Link>
        </p>
      </div>
    </div>
  );
}