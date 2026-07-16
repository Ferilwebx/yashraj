import { capabilityData } from '@/data/capabilities';
import { industryData } from '@/data/industries';
import { productData } from '@/data/products';

const STATIC_PAGES = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: 'about', priority: '0.8', changefreq: 'monthly' },
  { path: 'capabilities', priority: '0.9', changefreq: 'monthly' },
  { path: 'industries', priority: '0.9', changefreq: 'monthly' },
  { path: 'quality', priority: '0.7', changefreq: 'monthly' },
  { path: 'infrastructure', priority: '0.7', changefreq: 'monthly' },
  { path: 'exports', priority: '0.7', changefreq: 'monthly' },
  { path: 'gallery', priority: '0.7', changefreq: 'monthly' },
  { path: 'faq', priority: '0.75', changefreq: 'monthly' },
  { path: 'downloads', priority: '0.7', changefreq: 'monthly' },
  { path: 'contact', priority: '0.6', changefreq: 'yearly' },
  { path: 'rfq', priority: '0.8', changefreq: 'yearly' },
];

export function generateSitemapXml(baseUrl = '') {
  const today = new Date().toISOString().split('T')[0];
  const urls = [];

  const makeUrl = (path, priority, changefreq) => {
    const loc = `${baseUrl}/${path}`.replace(/\/+$/, '') || baseUrl;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  };

  STATIC_PAGES.forEach(page => {
    urls.push(makeUrl(page.path, page.priority, page.changefreq));
  });

  Object.keys(capabilityData).forEach(slug => {
    urls.push(makeUrl(`capabilities/${slug}`, '0.8', 'monthly'));
  });

  Object.keys(industryData).forEach(slug => {
    urls.push(makeUrl(`industries/${slug}`, '0.75', 'monthly'));
  });

  Object.keys(productData).forEach(slug => {
    urls.push(makeUrl(`products/${slug}`, '0.75', 'monthly'));
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
}