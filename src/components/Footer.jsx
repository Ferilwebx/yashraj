import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-12 md:pt-16 pb-20 lg:pb-8 px-5 md:px-12">
      <div className="max-w-[120rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 mb-10">
        {/* Brand + Contact */}
        <div className="sm:col-span-2 lg:col-span-1 space-y-5">
          <div className="flex items-center gap-1">
            <span className="text-xl font-extrabold text-white tracking-tight">YE</span>
            <span className="w-3 h-3 bg-rose-600"></span>
          </div>
          <p className="text-[10px] text-slate-500 tracking-wide uppercase">YASHRAJ ENTERPRISES</p>
          <p className="text-xs text-slate-400 leading-relaxed">Precision aluminium die casting and CNC machining. ISO 9001:2015 certified. In-house from casting to dispatch — Chakan, Pune.</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
              <span>Plot No. PAP-94, Phase 3, Chakan Industrial Area, Pune 410501</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <a href="tel:+919923598986" className="text-blue-500 hover:text-blue-400 transition-colors">+91 99235 98986</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <a href="mailto:mallubarikai@zohomail.in" className="text-blue-500 hover:text-blue-400 transition-colors">mallubarikai@zohomail.in</a>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-[10px] text-slate-400 font-medium">ISO 9001:2015</span>
            <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-[10px] text-slate-400 font-medium">GST Registered</span>
          </div>
        </div>

        {/* Manufacturing Services */}
        <div>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-4">MANUFACTURING SERVICES</span>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link to="/capabilities/pressure-die-casting" className="hover:text-blue-500 transition-colors">High Pressure Die Casting</Link></li>
            <li><Link to="/capabilities/gravity-die-casting" className="hover:text-blue-500 transition-colors">Gravity Die Casting</Link></li>
            <li><Link to="/capabilities/cnc-vmc-machining" className="hover:text-blue-500 transition-colors">CNC & VMC Machining</Link></li>
            <li><Link to="/capabilities/powder-coating" className="hover:text-blue-500 transition-colors">Powder Coating</Link></li>
            <li><Link to="/capabilities/tool-development" className="hover:text-blue-500 transition-colors">Tool Development</Link></li>
            <li><Link to="/capabilities/surface-treatment" className="hover:text-blue-500 transition-colors">Shot Blasting & Treatment</Link></li>
            <li><Link to="/capabilities/contract-manufacturing" className="hover:text-blue-500 transition-colors">Contract Manufacturing</Link></li>
            <li><Link to="/capabilities/engineering-support" className="hover:text-blue-500 transition-colors">Engineering Support</Link></li>
          </ul>
          <Link to="/capabilities" className="text-xs text-blue-500 hover:text-blue-400 transition-colors mt-3 inline-block">View all →</Link>
        </div>

        {/* Industries */}
        <div>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-4">INDUSTRIES</span>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link to="/industries/hvac" className="hover:text-blue-500 transition-colors">HVAC & Air Movement</Link></li>
            <li><Link to="/industries/consumer-appliances" className="hover:text-blue-500 transition-colors">Consumer Appliances</Link></li>
            <li><Link to="/industries/automotive" className="hover:text-blue-500 transition-colors">Automotive</Link></li>
            <li><Link to="/industries/agriculture" className="hover:text-blue-500 transition-colors">Agriculture & Off-Highway</Link></li>
            <li><Link to="/industries/pumps-valves" className="hover:text-blue-500 transition-colors">Pumps & Valves</Link></li>
            <li><Link to="/industries/electrical" className="hover:text-blue-500 transition-colors">Electrical</Link></li>
            <li><Link to="/industries/industrial-machinery" className="hover:text-blue-500 transition-colors">Industrial Machinery</Link></li>
            <li><Link to="/industries/medical" className="hover:text-blue-500 transition-colors">Medical</Link></li>
            <li><Link to="/industries/electric-mobility" className="hover:text-blue-500 transition-colors">Electric Mobility</Link></li>
            <li><Link to="/industries/defence" className="hover:text-blue-500 transition-colors">Defence</Link></li>
            <li><Link to="/industries/renewable-energy" className="hover:text-blue-500 transition-colors">Renewable Energy</Link></li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-4">PRODUCTS</span>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link to="/products/ceiling-fan-top-cover" className="hover:text-blue-500 transition-colors">Ceiling Fan Top Cover</Link></li>
            <li><Link to="/products/fan-blade-hub" className="hover:text-blue-500 transition-colors">Fan Blade Hub</Link></li>
            <li><Link to="/products/mechanical-pump-housing" className="hover:text-blue-500 transition-colors">Mechanical Pump Housing</Link></li>
            <li><Link to="/products/tractor-cover" className="hover:text-blue-500 transition-colors">Tractor Cover</Link></li>
            <li><Link to="/products/aluminium-electrical-enclosure" className="hover:text-blue-500 transition-colors">Aluminium Electrical Enclosure</Link></li>
            <li><Link to="/products/solenoid-housing" className="hover:text-blue-500 transition-colors">Solenoid Housing</Link></li>
            <li><Link to="/products/surgical-bone-cutter-handle" className="hover:text-blue-500 transition-colors">Surgical Bone Cutter Handle</Link></li>
            <li><Link to="/products/helical-gearbox-housing" className="hover:text-blue-500 transition-colors">Helical Gearbox Housing</Link></li>
          </ul>
        </div>

        {/* Site Nav + Resources */}
        <div>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-4">COMPANY</span>
          <ul className="space-y-2.5 text-xs text-slate-400 mb-6">
            <li><Link to="/about" className="hover:text-blue-500 transition-colors">About Yashraj</Link></li>
            <li><Link to="/infrastructure" className="hover:text-blue-500 transition-colors">Infrastructure</Link></li>
            <li><Link to="/quality" className="hover:text-blue-500 transition-colors">Quality Assurance</Link></li>
            <li><Link to="/exports" className="hover:text-blue-500 transition-colors">Export Capability</Link></li>
            <li><Link to="/downloads" className="hover:text-blue-500 transition-colors">Downloads</Link></li>
            <li><Link to="/gallery" className="hover:text-blue-500 transition-colors">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-blue-500 transition-colors">Contact Us</Link></li>
            <li><Link to="/rfq" className="hover:text-blue-500 transition-colors">Request a Quote</Link></li>
          </ul>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-4">RESOURCES</span>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link to="/faq" className="hover:text-blue-500 transition-colors">FAQ</Link></li>
            <li><Link to="/capabilities" className="hover:text-blue-500 transition-colors">All Capabilities</Link></li>
            <li><Link to="/industries" className="hover:text-blue-500 transition-colors">All Industries</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[120rem] mx-auto pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[10px] text-slate-600">
        <span>© {new Date().getFullYear()} YASHRAJ ENTERPRISES. PROPRIETOR: ANANT A. KUMBHAR. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-6">
          <Link to="/contact" className="hover:text-slate-400 transition-colors">PRIVACY POLICY</Link>
          <Link to="/quality" className="hover:text-slate-400 transition-colors">QUALITY STANDARDS</Link>
        </div>
      </div>
    </footer>
  );
}