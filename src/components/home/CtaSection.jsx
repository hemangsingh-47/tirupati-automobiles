import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1621252179027-94459d278660?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="CTA Background" 
          className="w-full h-full object-cover grayscale opacity-50"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Ready To Give Your Car The <br className="hidden md:block"/>
            <span className="text-primary">Care It Deserves?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Book an appointment today and experience the difference of a premium multi-brand workshop. 
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/book" 
              className="bg-primary text-background px-8 py-4 rounded-md font-semibold text-lg hover:bg-yellow-500 transition-colors flex items-center justify-center"
            >
              Book Service
            </Link>
            <a 
              href="tel:+919876543210" 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
