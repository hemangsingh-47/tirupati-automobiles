import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car, Hammer, PaintBucket, FileText, Zap, Battery, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Car,
    title: 'General Car Service',
    description: 'Comprehensive regular maintenance including oil changes, filter replacements, and full vehicle checkups to keep your car running smoothly.',
  },
  {
    icon: Hammer,
    title: 'Accident Repair',
    description: 'Expert structural repairs and restoration for vehicles involved in accidents. We bring your car back to its original factory condition.',
  },
  {
    icon: PaintBucket,
    title: 'Denting & Painting',
    description: 'Premium paint jobs and dent removals using advanced color matching technology for a flawless, showroom-like finish.',
  },
  {
    icon: FileText,
    title: 'Insurance Claim',
    description: 'End-to-end cashless insurance claim assistance. We handle the paperwork and coordination with all major insurance companies.',
  },
  {
    icon: Zap,
    title: 'Electrical Work',
    description: 'Advanced diagnostics and repair of complex car electrical systems, wiring, sensors, and modern infotainment units.',
  },
  {
    icon: Battery,
    title: 'Battery Services',
    description: 'Battery testing, jump-starts, and replacement with authentic brand warranties to ensure your vehicle never stops.',
  }
];

const ServicesPreview = () => {
  return (
    <section className="py-24 bg-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block"
            >
              Our Services
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-heading font-bold text-white"
            >
              Expert Solutions For Every Need
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/services" 
              className="inline-flex items-center text-primary font-semibold hover:text-yellow-400 transition-colors group"
            >
              View All Services
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background rounded-xl p-8 border border-white/5 hover:border-primary/50 transition-all group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:translate-x-2">
                  <Icon className="w-32 h-32 text-primary" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray mb-6 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                  <Link 
                    to="/services" 
                    className="inline-flex items-center text-sm font-semibold text-white group-hover:text-primary transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
