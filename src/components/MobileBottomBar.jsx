import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Factory, Building2, ClipboardList, Phone } from 'lucide-react';

const items = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Capabilities', path: '/capabilities', icon: Factory },
  { label: 'Industries', path: '/industries', icon: Building2 },
  { label: 'RFQ', path: '/rfq', icon: ClipboardList },
  { label: 'Contact', path: '/contact', icon: Phone },
];

export default function MobileBottomBar() {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-40 bg-white border-t border-slate-200 shadow-[0_-2px_12px_rgba(0,0,0,0.04)]">
      <div className="flex items-stretch">
        {items.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-colors ${active ? 'text-rose-600' : 'text-slate-400 hover:text-slate-700'}`}
            >
              <Icon className={`w-[18px] h-[18px] ${active ? 'text-rose-600' : ''}`} />
              <span className="text-[9px] font-medium tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}