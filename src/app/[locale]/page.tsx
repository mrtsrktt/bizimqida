import Hero from '@/components/sections/Hero';
import HoldingStrip from '@/components/sections/HoldingStrip';
import AboutSection from '@/components/sections/AboutSection';
import ServicesGrid from '@/components/sections/ServicesGrid';
import BrandsGrid from '@/components/sections/BrandsGrid';
import DistributionSection from '@/components/sections/DistributionSection';
import ApplySection from '@/components/sections/ApplySection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <HoldingStrip />
      <div id="about"><AboutSection /></div>
      <div id="services"><ServicesGrid /></div>
      <div id="brands"><BrandsGrid /></div>
      <div id="distribution"><DistributionSection /></div>
      <div id="apply"><ApplySection /></div>
      <div id="contact"><ContactSection /></div>
    </>
  );
}
