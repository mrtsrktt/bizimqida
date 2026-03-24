import Hero from '@/components/sections/Hero';
import HoldingStrip from '@/components/sections/HoldingStrip';
import ServicesGrid from '@/components/sections/ServicesGrid';
import BrandsGrid from '@/components/sections/BrandsGrid';
import DistributionSection from '@/components/sections/DistributionSection';
import GallerySection from '@/components/sections/GallerySection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <HoldingStrip />
      <div id="services"><ServicesGrid /></div>
      <div id="brands"><BrandsGrid /></div>
      <div id="distribution"><DistributionSection /></div>
      <div id="gallery"><GallerySection /></div>
      <div id="contact"><ContactSection /></div>
    </>
  );
}
