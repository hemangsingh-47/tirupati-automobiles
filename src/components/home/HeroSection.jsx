import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, CheckCircle2, MessageCircle } from 'lucide-react';

const trustBadges = [
  'Multi Brand Service',
  'Insurance Assistance',
  'Genuine Parts',
  'Experienced Technicians'
];

const HeroSection = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 bg-gradient-to-t from-background via-background/70 to-background/30 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1613214149922-f1809c99b414?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Premium Car Workshop" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4 leading-tight">
              Complete Car Care <br className="hidden md:block"/>
              <span className="text-primary">Solutions</span>
            </h1>
            <h2 className="text-xl md:text-3xl font-heading font-medium text-gray-200 mb-6">
              Trusted Multi Brand Car Workshop In Sirohi
            </h2>
            <p className="text-lg md:text-xl text-gray mb-10 leading-relaxed max-w-2xl">
              Professional car care & insurance claim experts. From general maintenance to complex accident repairs, we use genuine parts and skilled technicians to deliver excellence in every journey.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link 
              to="/contact" 
              className="bg-primary text-background px-8 py-4 rounded-md font-semibold text-lg hover:bg-yellow-500 transition-colors flex items-center justify-center text-center"
            >
              Book Service
            </Link>
            <a 
              href="tel:+919876543210" 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-white/20 transition-colors flex items-center justify-center text-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center text-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm md:text-base font-medium text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
