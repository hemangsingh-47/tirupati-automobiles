import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import CtaSection from '../components/home/CtaSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCms } from '../context/CmsContext';

const Services = () => {
  const { services } = useCms();
  return (
    <main>
      <PageHero 
        title="Our Services" 
        description="Explore our comprehensive range of professional car care services, designed to meet the highest standards of the automobile industry."
        image="https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="What We Offer" title="Comprehensive Car Care Solutions" centered />
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {services?.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                className="bg-surface rounded-2xl overflow-hidden border border-white/5 group hover:border-primary/50 transition-colors"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={service.imageUrl ? `http://localhost:5000/uploads/${service.imageUrl}` : 'https://images.unsplash.com/photo-1632823462996-e251a34005aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold font-heading text-white mb-3">{service.title}</h3>
                  <p className="text-gray leading-relaxed mb-6 line-clamp-3">
                    {service.shortDescription}
                  </p>
                  <Link to="/contact" className="text-primary font-semibold hover:text-white transition-colors flex items-center">
                    Book This Service
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  );
};

export default Services;
