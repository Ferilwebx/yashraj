import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useImages } from '@/contexts/ImageContext';

const fallbackImages = [
  { key: 'gallery_01', src: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/b57c1db34_generated_dda9aca1.png', title: 'Die Casting Facility', category: 'Facility' },
  { key: 'gallery_02', src: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/2a22bc325_generated_90b9f85d.png', title: 'Manufacturing Floor', category: 'Facility' },
  { key: 'gallery_03', src: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/41cc6744c_generated_e0cc3e0b.png', title: 'HPDC Machine', category: 'Process' },
  { key: 'gallery_04', src: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/ef08c848a_generated_de206829.png', title: 'Tool Development', category: 'Process' },
  { key: 'gallery_05', src: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/b011fa0cc_generated_a7d73a47.png', title: 'Surface Treatment', category: 'Process' },
  { key: 'gallery_06', src: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/6e1ce5b86_generated_01725120.png', title: 'Quality Inspection Lab', category: 'Quality' },
  { key: 'gallery_07', src: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/83caaf4bc_generated_767af8bc.png', title: 'Fan Blade Hub', category: 'Products' },
  { key: 'gallery_08', src: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/bfc787bcb_generated_2f85210e.png', title: 'Ceiling Fan Top Cover', category: 'Products' },
  { key: 'gallery_09', src: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/da7318d3f_generated_2fbe9a99.png', title: 'Mechanical Pump Housing', category: 'Products' },
  { key: 'gallery_10', src: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/7b414adea_generated_ab13b89e.png', title: 'Helical Gearbox Housing', category: 'Products' },
  { key: 'gallery_11', src: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/971654121_generated_91afb837.png', title: 'Tractor Cover', category: 'Products' },
  { key: 'gallery_12', src: 'https://media.base44.com/images/public/6a56844a4813d002cc377ca4/32e33225e_generated_19728e9a.png', title: 'Surgical Bone Cutter Handle', category: 'Products' },
];

const categories = ['All', 'Products', 'Facility', 'Process', 'Quality'];

export default function Gallery() {
  const { getImageUrl, getImageMeta } = useImages();
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const images = fallbackImages.map(img => {
    const meta = getImageMeta(img.key);
    return {
      ...img,
      src: getImageUrl(img.key, img.src),
      title: meta?.name || img.title,
      alt: meta?.alt_text || img.title,
    };
  });

  const filtered = filter === 'All' ? images : images.filter(i => i.category === filter);

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* Hero (DARK) */}
      <section className="bg-slate-950 text-slate-100 pt-24 pb-20 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-500 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300">Gallery</span>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[2px] bg-rose-600"></span>
            <span className="text-xs font-medium text-rose-600 tracking-[0.2em] uppercase">Gallery</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
            Precision in <span className="text-rose-600">Every Frame.</span>
          </h1>
          <p className="mt-6 text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
            A visual overview of our facility, manufacturing processes, quality lab, and precision components — all under one roof at Chakan, Pune.
          </p>
        </div>
      </section>

      {/* Filter + Grid (LIGHT) */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 text-xs font-semibold tracking-wide rounded-lg transition-all duration-300 ${filter === c ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200 hover:border-rose-600/40 hover:text-slate-900'}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox(img)}
                className="group relative aspect-[4/3] bg-slate-100 border border-slate-200 rounded-lg overflow-hidden hover:border-rose-600/40 transition-all duration-300"
              >
                <img src={img.src} alt={img.alt || img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <span className="text-[10px] text-rose-500 font-medium uppercase tracking-wider block mb-1">{img.category}</span>
                  <h3 className="text-sm font-semibold text-white">{img.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"></div>
          <div className="relative z-10 max-w-4xl w-full">
            <button onClick={() => setLightbox(null)} className="absolute -top-10 right-0 text-slate-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            <img src={lightbox.src} alt={lightbox.alt || lightbox.title} className="w-full rounded-lg border border-slate-800" />
            <div className="mt-4 text-center">
              <span className="text-[10px] text-rose-500 font-medium uppercase tracking-wider block mb-1">{lightbox.category}</span>
              <h3 className="text-sm font-semibold text-white">{lightbox.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}