import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useImages } from '@/contexts/ImageContext';

const products = [
  { name: 'Fan Blade Hub', slug: 'fan-blade-hub', category: 'HVAC & Air Movement', alloy: 'ADC12', img: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/83caaf4bc_generated_767af8bc.png', desc: 'Precision central bore with DIN 6885 keyway. Balanced for vibration-free operation.' },
  { name: 'Ceiling Fan Top Cover', slug: 'ceiling-fan-top-cover', category: 'Consumer Appliances', alloy: 'ADC12', img: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/bfc787bcb_generated_2f85210e.png', desc: 'Decorative HPDC cover with ≤1.5° draft angles and 0.8 µm Ra finish.' },
  { name: 'Mechanical Pump Housing', slug: 'mechanical-pump-housing', category: 'Automotive', alloy: 'ADC12', img: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/da7318d3f_generated_2fbe9a99.png', desc: 'Pressure-tight housing. 100% hydrostatic tested. Bore to H7 tolerance.' },
  { name: 'Helical Gearbox Housing', slug: 'helical-gearbox-housing', category: 'Industrial Machinery', alloy: 'ADC12', img: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/7b414adea_generated_ab13b89e.png', desc: 'Bearing bores to H7, bore-to-bore parallelism 0.02 mm. Single VMC setup.' },
  { name: 'Solenoid Housing', slug: 'solenoid-housing', category: 'Industrial Automation', alloy: 'ADC12', img: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/da7318d3f_generated_2fbe9a99.png', desc: 'High-pressure tight bore. ±0.02 mm tolerance. 100% leak tested.' },
  { name: 'Tractor Cover', slug: 'tractor-cover', category: 'Agriculture', alloy: 'A380', img: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/971654121_generated_91afb837.png', desc: 'Robust HPDC for field durability. Powder coated for 10+ year corrosion resistance.' },
  { name: 'Surgical Bone Cutter Handle', slug: 'surgical-bone-cutter-handle', category: 'Medical', alloy: 'LM25', img: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/32e33225e_generated_19728e9a.png', desc: 'Gravity die cast. Ergonomic profile with Ra ≤0.4 µm. Medical grade.' },
  { name: 'Aluminium Electrical Enclosure', slug: 'aluminium-electrical-enclosure', category: 'Electrical', alloy: 'ADC12', img: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/bfc787bcb_generated_2f85210e.png', desc: 'IP54-ready enclosure with machined seating face. Powder coated optional.' },
  { name: 'Magnetic Drill Body & Gearbox', slug: 'magnetic-drill-body-gearbox-housing', category: 'Industrial Machinery', alloy: 'ADC12', img: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/7b414adea_generated_ab13b89e.png', desc: 'Integrated HPDC body. Motor bore H7, concentricity 0.03 mm TIR.' },
];

export default function ProductsSection() {
  const { getImageUrl } = useImages();
  return (
    <section className="bg-white py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-[120rem] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-[10px] font-medium text-rose-600 tracking-[0.2em] uppercase mb-3">PRODUCTS</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Components We Manufacture</h2>
          </div>
          <p className="text-slate-500 text-sm max-w-md mt-4 md:mt-0">Precision aluminium castings and machined components — each with full specifications, alloy data, and quality documentation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <Link to={`/products/${p.slug}`} key={i} className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden hover:border-rose-600/40 transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-square bg-white relative overflow-hidden flex items-center justify-center p-8">
                <img src={getImageUrl(`product_${p.slug}`, p.img)} alt={`${p.name} — ${p.alloy} die casting by Yashraj Enterprise`} className="max-h-[70%] max-w-[70%] object-contain group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-slate-200 px-3 py-1 rounded-full">
                  <span className="text-[10px] font-medium text-rose-600">{p.alloy}</span>
                </div>
              </div>
              <div className="p-5 border-t border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{p.category}</span>
                <h3 className="text-sm font-semibold text-slate-900 mt-1 mb-2 group-hover:text-rose-600 transition-colors">{p.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{p.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs text-rose-600 mt-3 group-hover:gap-2 transition-all">
                  View product <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}