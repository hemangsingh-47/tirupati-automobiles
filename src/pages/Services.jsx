import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import CtaSection from '../components/home/CtaSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const allServices = [
  { title: 'General Service', description: 'Comprehensive regular maintenance including oil changes, filter replacements, and checkups.', image: 'https://images.unsplash.com/photo-1632823462996-e251a34005aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { title: 'Engine Repair', description: 'Advanced engine diagnostics, tuning, rebuilding, and performance optimization.', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { title: 'Suspension', description: 'Shocks, struts, and suspension system repairs for a smooth, stable, and safe ride.', image: 'https://images.unsplash.com/photo-1503375894314-46765ff0a8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { title: 'Brake Service', description: 'Brake pad replacements, rotor resurfacing, and brake fluid flushes for maximum safety.', image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { title: 'Battery', description: 'Battery testing, jump-starts, and replacements with authentic OEM warranties.', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { title: 'Electrical Repair', description: 'Diagnostics and repair of wiring, sensors, lighting, and modern infotainment units.', image: 'https://images.unsplash.com/photo-1549643276-fdf2fab574f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { title: 'Denting', description: 'Expert dent removals using advanced tools for a flawless, factory-grade finish.', image: 'https://images.unsplash.com/photo-1600661653561-629509216228?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { title: 'Painting', description: 'Premium paint jobs using advanced computerized color matching technology in our specialized booth.', image: 'https://images.unsplash.com/photo-1507560461415-99731cfa81c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { title: 'Body Shop', description: 'Comprehensive structural repairs for vehicles involved in heavy collisions.', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { title: 'Insurance Claim', description: 'End-to-end 100% cashless insurance claim assistance with all major providers.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { title: 'Wheel Alignment', description: 'Precision computerized wheel alignment to extend tire life and ensure straight driving.', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { title: 'Wheel Balancing', description: 'Dynamic wheel balancing to eliminate vibrations and ensure a comfortable ride.', image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { title: 'Car Washing', description: 'Premium exterior foam washing and thorough interior vacuuming to keep your car shining.', image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { title: 'Detailing', description: 'Deep cleaning, polishing, ceramic coating, and interior detailing for a showroom finish.', image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { title: 'AC Service', description: 'A/C gas top-up, compressor repair, and vent cleaning to keep you cool during summer.', image: 'https://images.unsplash.com/photo-1599557476839-a9a341076f75?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { title: 'Genuine Parts', description: 'We exclusively source and supply 100% genuine OEM spare parts for all brands.', image: 'https://images.unsplash.com/photo-1587560699334-bea93391dcef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }
];

const Services = () => {
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
            {allServices.map((service, index) => (
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
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold font-heading text-white mb-3">{service.title}</h3>
                  <p className="text-gray leading-relaxed mb-6">
                    {service.description}
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
