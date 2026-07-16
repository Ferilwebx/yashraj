import React from 'react';
import { useParams } from 'react-router-dom';
import DetailPage from '@/components/detail/DetailPage';
import { productData } from '@/data/products';

export default function ProductDetail() {
  const { slug } = useParams();
  const data = productData[slug] || productData['fan-blade-hub'];

  return (
    <DetailPage
      data={data}
      imageKey={`product_${slug}`}
      breadcrumb={[{ label: 'Products', path: '/' }, { label: data.title }]}
    />
  );
}