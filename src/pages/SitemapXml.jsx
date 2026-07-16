import { useEffect } from 'react';
import { generateSitemapXml } from '@/lib/sitemap';

export default function SitemapXml() {
  useEffect(() => {
    const xml = generateSitemapXml(window.location.origin);
    document.open('text/xml');
    document.write(xml);
    document.close();
  }, []);

  return null;
}