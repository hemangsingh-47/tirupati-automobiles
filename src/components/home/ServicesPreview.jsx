import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useCms } from '../../context/CmsContext';

const ServicesPreview = () => {
  const { services } = useCms();
  
  // Show only featured services, max 8
  const displayServices = services?.filter(s => s.isFeatured).slice(0, 8) || [];

  if (!displayServices.length) return null;

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
              <Icons.ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayServices.map((service, index) => {
            const Icon = Icons[service.icon] || Icons.Wrench;
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
                    {service.shortDescription}
                  </p>
                  <Link 
                    to="/services" 
                    className="inline-flex items-center text-sm font-semibold text-white group-hover:text-primary transition-colors"
                  >
                    Read More
                    <Icons.ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
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
