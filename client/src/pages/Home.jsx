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
import FeaturedUpdate from '../components/home/FeaturedUpdate';
import LatestUpdates from '../components/home/LatestUpdates';
import FloatingActions from '../components/FloatingActions';
import { useCms } from '../context/CmsContext';

const Home = () => {
  const { content } = useCms();


  return (
    <div>
      {content?.showHero !== false && <HeroSection />}
      <FeaturedUpdate />
      {content?.showServices !== false && (
        <>
          <WhyChooseUs />
          <ServicesPreview />
        </>
      )}
      <LatestUpdates />
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
