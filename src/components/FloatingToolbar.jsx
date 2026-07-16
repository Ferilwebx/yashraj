import React from 'react';
import { Link } from 'react-router-dom';
import { Download, MessageCircle, ClipboardList } from 'lucide-react';

export default function FloatingToolbar({ onInquiry }) {
  return (
    <div className="fixed right-4 bottom-16 md:bottom-24 z-40 flex flex-col gap-2">
      <Link to="/downloads" className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center hover:border-rose-600 transition-colors group" title="Download Company Profile">
        <Download className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors" />
      </Link>
      <a href="https://wa.me/919923598986" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center hover:border-rose-600 transition-colors group" title="WhatsApp Engineering">
        <MessageCircle className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors" />
      </a>
      <Link to="/rfq" className="w-10 h-10 bg-rose-600 rounded-lg flex items-center justify-center hover:bg-rose-500 transition-colors" title="Start RFQ">
        <ClipboardList className="w-4 h-4 text-white" />
      </Link>
    </div>
  );
}
