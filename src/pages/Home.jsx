import HeroSection from '../components/home/HeroSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ServicesPreview from '../components/home/ServicesPreview';
import InsuranceBanner from '../components/home/InsuranceBanner';
import HowWeWork from '../components/home/HowWeWork';
import StatsSection from '../components/home/StatsSection';
import GalleryPreview from '../components/home/GalleryPreview';
import Testimonials from '../components/home/Testimonials';
import CtaSection from '../components/home/CtaSection';
import LocationPreview from '../components/home/LocationPreview';
import FloatingActions from '../components/FloatingActions';
import { useCms } from '../context/CmsContext';

const Home = () => {
  const { content, loading } = useCms();

  if (loading) return null; // or a loader

  return (
    <div>
      {content?.showHero !== false && <HeroSection />}
      {content?.showServices !== false && (
        <>
          <WhyChooseUs />
          <ServicesPreview />
        </>
      )}
      <InsuranceBanner />
      <HowWeWork />
      {content?.showStats !== false && <StatsSection />}
      {content?.showGallery !== false && <GalleryPreview />}
      {content?.showTestimonials !== false && <Testimonials />}
      <CtaSection />
      <LocationPreview />
      <FloatingActions />
    </div>
  );
};

export default Home;
