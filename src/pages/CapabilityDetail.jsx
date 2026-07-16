import React from 'react';
import { useParams } from 'react-router-dom';
import DetailPage from '@/components/detail/DetailPage';
import { capabilityData } from '@/data/capabilities';

export default function CapabilityDetail() {
  const { slug } = useParams();
  const data = capabilityData[slug] || capabilityData['pressure-die-casting'];

  return (
    <DetailPage
      data={data}
      imageKey={`capability_${slug}`}
      breadcrumb={[{ label: 'Capabilities', path: '/capabilities' }, { label: data.title }]}
    />
  );
}