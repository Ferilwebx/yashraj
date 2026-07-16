import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ChevronDown, Menu, X, ArrowRight, Factory, Cpu, Wrench, Package, Building2 } from 'lucide-react';

const megaMenus = {
  Capabilities: {
    label: 'Capabilities',
    icon: Factory,
    viewAll: '/capabilities',
    viewAllText: 'Explore all capabilities',
    intro: 'Full-stack manufacturing from raw ingot to finished component — all under one roof in Chakan.',
    columns: [
      {
        header: 'Casting',
        items: [
          { title: 'High Pressure Die Casting', desc: '120T–900T HPDC. ADC12, A380, LM24 alloys. High-volume production.', path: '/capabilities/pressure-die-casting' },
          { title: 'Gravity Die Casting', desc: 'LM25 alloy. Superior mechanical properties for structural demands.', path: '/capabilities/gravity-die-casting' },
        ]
      },
      {
        header: 'Machining & Finishing',
        items: [
          { title: 'CNC & VMC Machining', desc: '4th-axis VMC. Tolerances to ±0.02 mm. 100% dimensional inspection.', path: '/capabilities/cnc-vmc-machining' },
          { title: 'Powder Coating', desc: '5-tank nano-ceramic pre-treatment. Two booths. DFT on every batch.', path: '/capabilities/powder-coating' },
        ]
      },
      {
        header: 'Tooling & Treatment',
        items: [
          { title: 'Precision Tool Development', desc: 'DFM analysis, die design, first article inspection, and collaboration.', path: '/capabilities/tool-development' },
          { title: 'Shot Blasting & Surface Treatment', desc: 'Shot blasting, vibrofinishing, leakage testing, and trimming.', path: '/capabilities/surface-treatment' },
        ]
      },
      {
        header: 'Integrated Services',
        items: [
          { title: 'Contract Manufacturing', desc: 'End-to-end production from raw ingot to assembly-ready components.', path: '/capabilities/contract-manufacturing' },
          { title: 'Engineering Support', desc: 'DFM, design optimisation, FAI, and a dedicated technical team.', path: '/capabilities/engineering-support' },
        ]
      },
    ]
  },
  Industries: {
    label: 'Industries',
    icon: Building2,
    viewAll: '/industries',
    viewAllText: 'Explore all industries',
    intro: 'Trusted by OEMs across twelve high-demand sectors — from automotive to medical to defence.',
    columns: [
      {
        header: 'Mobility & Transport',
        items: [
          { title: 'Automotive', desc: 'Pump housings, structural brackets, precision engine components.', path: '/industries/automotive' },
          { title: 'Electric Mobility', desc: 'Lightweight aluminium castings for EV drivetrains and power electronics.', path: '/industries/electric-mobility' },
          { title: 'Agriculture & Off-Highway', desc: 'Tractor covers, pulleys, and precision castings for heavy equipment.', path: '/industries/agriculture' },
        ]
      },
      {
        header: 'Fluid & Air Systems',
        items: [
          { title: 'HVAC & Air Movement', desc: 'Fan housings, motor components, blower casings, keyway hubs.', path: '/industries/hvac' },
          { title: 'Pumps & Valves', desc: 'Impellers, pump housings, and valve bodies for fluid handling.', path: '/industries/pumps-valves' },
        ]
      },
      {
        header: 'Industrial & Electrical',
        items: [
          { title: 'Industrial Machinery', desc: 'Gearbox housings, bearing carriers, structural machine components.', path: '/industries/industrial-machinery' },
          { title: 'Industrial Automation', desc: 'Solenoid housings, structural castings, precision machined parts.', path: '/industries/industrial-automation' },
          { title: 'Electrical', desc: 'Aluminium enclosures, motor housings, terminal boxes.', path: '/industries/electrical' },
          { title: 'Consumer Appliances', desc: 'Ceiling fan covers, motor bodies, mixer grinder housings.', path: '/industries/consumer-appliances' },
        ]
      },
      {
        header: 'Specialised Sectors',
        items: [
          { title: 'Medical', desc: 'Surgical and medical device components to highest precision.', path: '/industries/medical' },
          { title: 'Defence', desc: 'High-integrity structural and enclosure components with traceability.', path: '/industries/defence' },
          { title: 'Renewable Energy', desc: 'Generator housings and precision components for energy systems.', path: '/industries/renewable-energy' },
        ]
      },
    ]
  },
  Products: {
    label: 'Products',
    icon: Package,
    viewAll: null,
    viewAllText: '',
    intro: 'Representative components — each with full specifications, alloy data, and quality documentation.',
    columns: [
      {
        header: 'HVAC & Appliances',
        items: [
          { title: 'Ceiling Fan Top Cover', desc: 'ADC12 HPDC. Draft ≤1.5°, 0.8 µm Ra finish.', path: '/products/ceiling-fan-top-cover' },
          { title: 'Fan Blade Hub', desc: 'DIN 6885 keyway. Balanced for vibration-free operation.', path: '/products/fan-blade-hub' },
        ]
      },
      {
        header: 'Automotive & Fluid Power',
        items: [
          { title: 'Mechanical Pump Housing', desc: 'ADC12. Pressure-tight. 100% hydrostatic tested.', path: '/products/mechanical-pump-housing' },
          { title: 'Solenoid Housing', desc: '±0.02 mm bore tolerance. High-pressure tight. Leak tested.', path: '/products/solenoid-housing' },
        ]
      },
      {
        header: 'Industrial Machinery',
        items: [
          { title: 'Helical Gearbox Housing', desc: 'Bearing bores to H7. Bore parallelism 0.02 mm.', path: '/products/helical-gearbox-housing' },
          { title: 'Magnetic Drill Body & Gearbox', desc: 'Motor bore H7. Concentricity 0.03 mm TIR.', path: '/products/magnetic-drill-body-gearbox-housing' },
          { title: 'Tractor Cover', desc: 'A380 HPDC. Powder coated for 10+ year corrosion resistance.', path: '/products/tractor-cover' },
        ]
      },
      {
        header: 'Electrical & Medical',
        items: [
          { title: 'Aluminium Electrical Enclosure', desc: 'IP54-ready. Machined seating face. Powder coated optional.', path: '/products/aluminium-electrical-enclosure' },
          { title: 'Surgical Bone Cutter Handle', desc: 'LM25 gravity cast. Ra ≤0.4 µm. Medical grade.', path: '/products/surgical-bone-cutter-handle' },
        ]
      },
    ]
  },
  Company: {
    label: 'Company',
    icon: Cpu,
    viewAll: '/about',
    viewAllText: 'Learn about Yashraj',
    intro: 'Precision die casting and CNC machining under one roof — built on engineering rigour.',
    columns: [
      {
        header: 'About',
        items: [
          { title: 'About Yashraj', desc: 'Founded in Chakan, Pune. Die casting and CNC machining under one roof.', path: '/about' },
          { title: 'Infrastructure', desc: '9,500 Sq.Ft. facility. 200 HP power. Complete in-house capabilities.', path: '/infrastructure' },
          { title: 'Quality Assurance', desc: 'ISO 9001:2015 certified. Full traceability from heat to shipment.', path: '/quality' },
        ]
      },
      {
        header: 'Resources',
        items: [
          { title: 'Exports', desc: 'Documentation, quality systems, and packaging built for international supply.', path: '/exports' },
          { title: 'Downloads', desc: 'Company profile, capability brochures, certificates, and technical docs.', path: '/downloads' },
          { title: 'Gallery', desc: 'Visual tour of our facility, processes, and precision components.', path: '/gallery' },
          { title: 'FAQ', desc: 'Common questions about our capabilities, processes, and standards.', path: '/faq' },
          { title: 'Contact Us', desc: 'Direct line to our engineering team in Chakan, Pune.', path: '/contact' },
        ]
      },
    ]
  },
};

const standaloneLinks = [
  { label: 'Contact', path: '/contact' },
];

export default function Navbar({ onInquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [logoUrl, setLogoUrl] = useState('');
  const closeTimer = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    base44.entities.SiteSetting.list('-created_date', 1)
      .then(data => { if (data.length > 0 && data[0].website_logo) setLogoUrl(data[0].website_logo); })
      .catch(() => {});
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleEnter = (key) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(key);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const menuKeys = Object.keys(megaMenus);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)]' : 'bg-white/95 backdrop-blur-md border-b border-slate-200/60'}`}>
        <div className="max-w-[120rem] mx-auto px-4 md:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              {logoUrl ? (
                <img src={logoUrl} alt="Yashraj Enterprise" className="h-9 w-auto object-contain" />
              ) : (
                <>
                  <div className="relative">
                    <span className="text-lg font-extrabold text-slate-900 tracking-tight font-heading leading-none">YE</span>
                    <span className="absolute -right-1.5 -bottom-0.5 w-2 h-2 bg-rose-600 rounded-full"></span>
                  </div>
                  <div className="hidden sm:block leading-none">
                    <span className="block text-[11px] font-bold text-slate-900 tracking-[0.08em] uppercase font-heading">Yashraj Enterprise</span>
                    <span className="block text-[9px] text-slate-400 tracking-[0.15em] uppercase mt-0.5">Precision Die Casting</span>
                  </div>
                </>
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" onMouseLeave={handleLeave}>
              {menuKeys.map(key => {
                const Icon = megaMenus[key].icon;
                return (
                  <div key={key} className="relative" onMouseEnter={() => handleEnter(key)}>
                    <button className={`flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium tracking-wide transition-all duration-200 rounded-md relative ${activeMenu === key ? 'text-rose-600' : 'text-slate-600 hover:text-slate-900'}`}>
                      {key}
                      <ChevronDown className={`w-3.5 h-3.5 transition-all duration-200 ${activeMenu === key ? 'rotate-180 text-rose-600' : 'text-slate-300'}`} />
                      {activeMenu === key && (
                        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-rose-600 rounded-full"></span>
                      )}
                    </button>
                  </div>
                );
              })}
              {standaloneLinks.map(link => (
                <Link key={link.label} to={link.path} className="px-3.5 py-2 text-[13px] font-medium tracking-wide text-slate-600 hover:text-slate-900 rounded-md transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-2.5 shrink-0">
              <Link to="/rfq" className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold tracking-[0.05em] rounded-md transition-all duration-300 shadow-sm hover:shadow-md">
                Request a Quote
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/rfq" className="sm:hidden flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 text-white text-[11px] font-semibold tracking-wide rounded-md">
                <ArrowRight className="w-3 h-3" />
                RFQ
              </Link>
              <button className="lg:hidden text-slate-700 p-1" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Panel */}
        {activeMenu && megaMenus[activeMenu] && (
          <div
            className="hidden lg:block absolute top-full left-0 w-full bg-white border-t border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            onMouseEnter={() => handleEnter(activeMenu)}
            onMouseLeave={handleLeave}
          >
            <div className="max-w-[120rem] mx-auto px-8 py-7">
              {/* Header row */}
              <div className="flex items-start justify-between mb-7 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = megaMenus[activeMenu].icon;
                    return <Icon className="w-5 h-5 text-rose-600" />;
                  })()}
                  <div>
                    <span className="text-[11px] font-medium text-rose-600 tracking-[0.18em] uppercase block font-heading">{megaMenus[activeMenu].label}</span>
                    <p className="text-xs text-slate-500 mt-1 max-w-md">{megaMenus[activeMenu].intro}</p>
                  </div>
                </div>
                {megaMenus[activeMenu].viewAll && (
                  <Link to={megaMenus[activeMenu].viewAll} className="flex items-center gap-1.5 text-sm font-medium text-slate-900 hover:text-rose-600 transition-colors group">
                    {megaMenus[activeMenu].viewAllText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                )}
              </div>
              {/* Content grid with column headers */}
              <div className={`grid gap-x-8 gap-y-2 ${megaMenus[activeMenu].columns.length === 4 ? 'grid-cols-4' : 'grid-cols-2'}`}>
                {megaMenus[activeMenu].columns.map((col, ci) => (
                  <div key={ci} className="space-y-1">
                    <h5 className="text-[10px] font-bold text-slate-400 tracking-[0.15em] uppercase pb-2 mb-1 border-b border-slate-100 font-heading">{col.header}</h5>
                    {col.items.map((item, ii) => (
                      <Link key={ii} to={item.path} className="group block p-2.5 -mx-2.5 rounded-md hover:bg-slate-50 transition-colors">
                        <h4 className="text-sm font-semibold text-slate-900 group-hover:text-rose-600 transition-colors mb-0.5">{item.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Slide-in Drawer */}
      <div className={`lg:hidden fixed inset-0 z-[60] transition-all duration-300 ${mobileOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)}
        ></div>

        {/* Drawer Panel */}
        <div className={`absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 shrink-0">
            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
              {logoUrl ? (
                <img src={logoUrl} alt="Yashraj Enterprise" className="h-9 w-auto object-contain" />
              ) : (
                <>
                  <div className="relative">
                    <span className="text-lg font-extrabold text-slate-900 tracking-tight font-heading leading-none">YE</span>
                    <span className="absolute -right-1.5 -bottom-0.5 w-2 h-2 bg-rose-600 rounded-full"></span>
                  </div>
                  <span className="block text-[11px] font-bold text-slate-900 tracking-[0.08em] uppercase font-heading">Yashraj Enterprise</span>
                </>
              )}
            </Link>
            <button onClick={() => setMobileOpen(false)} className="p-1.5 -mr-1 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto px-5 py-3">
            {menuKeys.map((key, ki) => {
              const Icon = megaMenus[key].icon;
              const isExpanded = mobileExpanded === key;
              return (
                <div key={key} className="border-b border-slate-100">
                  <button
                    onClick={() => setMobileExpanded(isExpanded ? null : key)}
                    className="flex items-center justify-between w-full py-3.5 group"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 transition-colors ${isExpanded ? 'text-rose-600' : 'text-slate-400'}`} />
                      <span className={`text-[14px] font-semibold font-heading transition-colors ${isExpanded ? 'text-rose-600' : 'text-slate-900'}`}>{key}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-all duration-300 ${isExpanded ? 'rotate-180 text-rose-600' : 'text-slate-300'}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${isExpanded ? 'max-h-[800px]' : 'max-h-0'}`}>
                    <div className="pb-4 pl-6 border-l-2 border-rose-100 ml-2 space-y-3">
                      {megaMenus[key].columns.map((col, ci) => (
                        <div key={ci}>
                          <span className="text-[9px] font-bold text-slate-300 tracking-[0.15em] uppercase block mb-1.5 font-heading">{col.header}</span>
                          <div className="space-y-0.5">
                            {col.items.map((item, ii) => (
                              <Link
                                key={ii}
                                to={item.path}
                                onClick={() => setMobileOpen(false)}
                                className="block px-2 py-1.5 rounded-md hover:bg-slate-50 transition-colors"
                              >
                                <span className="text-[13px] font-semibold text-slate-800 block leading-tight">{item.title}</span>
                                <span className="text-[11px] text-slate-400 leading-relaxed block mt-0.5">{item.desc}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                      {megaMenus[key].viewAll && (
                        <Link
                          to={megaMenus[key].viewAll}
                          onClick={() => setMobileOpen(false)}
                          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-rose-600 mt-1 ml-2"
                        >
                          {megaMenus[key].viewAllText}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {standaloneLinks.map(link => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 py-3.5 text-[14px] font-semibold text-slate-900 border-b border-slate-100 font-heading"
              >
                <span className="w-4 h-4 bg-slate-200 rounded-sm"></span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Drawer Footer CTA */}
          <div className="shrink-0 px-5 py-4 border-t border-slate-100 bg-slate-50">
            <Link
              to="/rfq"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-semibold tracking-wide rounded-md transition-all shadow-sm"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}