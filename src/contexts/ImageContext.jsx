import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

const ImageContext = createContext(null);

export function ImageProvider({ children }) {
  const [images, setImages] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    base44.entities.WebsiteImage.list('-created_date', 500)
      .then(data => {
        if (!mounted) return;
        const map = {};
        data.forEach(img => {
          if (!map[img.key]) map[img.key] = [];
          map[img.key].push(img);
        });
        setImages(map);
      })
      .catch(() => {})
      .finally(() => { if (mounted) setLoaded(true); });
    return () => { mounted = false; };
  }, []);

  const getImageUrl = useCallback((key, fallback = '') => {
    const items = images[key];
    if (items && items.length > 0) return items[0].url;
    return fallback;
  }, [images]);

  const getImageMeta = useCallback((key) => {
    const items = images[key];
    if (items && items.length > 0) return items[0];
    return null;
  }, [images]);

  const getGalleryImages = useCallback((key) => {
    const items = images[key];
    if (!items) return [];
    return items.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  }, [images]);

  return (
    <ImageContext.Provider value={{ images, loaded, getImageUrl, getImageMeta, getGalleryImages }}>
      {children}
    </ImageContext.Provider>
  );
}

export function useImages() {
  const ctx = useContext(ImageContext);
  if (!ctx) return { images: {}, loaded: false, getImageUrl: (k, f) => f, getImageMeta: () => null, getGalleryImages: () => [] };
  return ctx;
}