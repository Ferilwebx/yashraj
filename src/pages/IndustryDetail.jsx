import React from 'react';
import { useParams } from 'react-router-dom';
import DetailPage from '@/components/detail/DetailPage';
import { industryData } from '@/data/industries';

export default function IndustryDetail() {
  const { slug } = useParams();
  const data = industryData[slug] || industryData['automotive'];

  return (
    <DetailPage
      data={data}
      imageKey={`industry_${slug}`}
      breadcrumb={[{ label: 'Industries', path: '/industries' }, { label: data.title }]}
    />
  );
}