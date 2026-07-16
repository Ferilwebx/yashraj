import React, { useState } from 'react';
import { useImages } from '@/contexts/ImageContext';

export default function CmsImage({ imageKey, fallback, alt = '', title, className, style, loading = 'lazy', eager = false }) {
  const { getImageUrl, getImageMeta } = useImages();
  const url = getImageUrl(imageKey, fallback);
  const meta = getImageMeta(imageKey);
  const finalAlt = meta?.alt_text || alt;
  const finalTitle = title || meta?.title || '';
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={url}
      alt={finalAlt}
      title={finalTitle || undefined}
      className={`${className || ''} ${eager && !loaded ? 'scale-105 blur-md' : 'scale-100 blur-0'} transition-all duration-700 ease-out`}
      style={style}
      loading={eager ? 'eager' : loading}
      fetchPriority={eager ? 'high' : undefined}
      onLoad={() => setLoaded(true)}
    />
  );
}