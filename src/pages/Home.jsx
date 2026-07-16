import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingToolbar from '@/components/FloatingToolbar';

import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import CustomersSection from '@/components/home/CustomersSection';
import WhyPartnerSection from '@/components/home/WhyPartnerSection';
import CapabilitiesSection from '@/components/home/CapabilitiesSection';
import FacilitySection from '@/components/home/FacilitySection';
import ProductCategoriesSection from '@/components/home/ProductCategoriesSection';
import ProductsSection from '@/components/home/ProductsSection';
import MachineShowcaseSection from '@/components/home/MachineShowcaseSection';
import IndustriesSection from '@/components/home/IndustriesSection';
import ProcessSection from '@/components/home/ProcessSection';
import TimelineSection from '@/components/home/TimelineSection';
import QualitySection from '@/components/home/QualitySection';
import CTASection from '@/components/home/CTASection';
import InquirySheet from '@/components/InquirySheet';

export default function Home() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <div className="bg-slate-950 text-slate-100 overflow-x-hidden">
      <Navbar onInquiry={() => setInquiryOpen(true)} />
      <HeroSection onInquiry={() => setInquiryOpen(true)} />
      <StatsSection />
      <CustomersSection />
      <WhyPartnerSection />
      <CapabilitiesSection />
      <FacilitySection />
      <ProductCategoriesSection />
      <ProductsSection />
      <MachineShowcaseSection />
      <IndustriesSection />
      <ProcessSection />
      <TimelineSection />
      <QualitySection />
      <CTASection onInquiry={() => setInquiryOpen(true)} />
      <Footer />
      <FloatingToolbar onInquiry={() => setInquiryOpen(true)} />
      <InquirySheet open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}