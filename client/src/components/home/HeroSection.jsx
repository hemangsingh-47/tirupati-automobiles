import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, CheckCircle2, MessageCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { useCms } from '../../context/CmsContext';
import { getWhatsAppUrl, getCallUrl, getGeneralMessage } from '../../utils/contactUtils';

const trustBadges = [
  'Multi Brand Service',
  'Insurance Assistance',
  'Genuine Parts',
  'Experienced Technicians'
];

const HeroSection = () => {
  const { settings } = useSettings();
  const { content } = useCms();
  const titleParts = (content?.heroTitle || 'Complete Car Care Solutions').split(' ');
  const lastWord = titleParts.pop();
  const titleFirstPart = titleParts.join(' ');

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden pt-[88px] md:pt-[104px]">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 bg-gradient-to-t from-background via-background/70 to-background/30 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1613214149922-f1809c99b414?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Premium Car Workshop" 
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto pb-12">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4 leading-[1.15] tracking-tight break-words">
              {titleFirstPart} <br className="hidden md:block"/>
              <span className="text-primary">{lastWord}</span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-medium text-gray-200 mb-6 leading-snug">
              {content?.heroSubtitle || 'Trusted Multi Brand Car Workshop In Sirohi'}
            </h2>
            <p className="text-base md:text-lg text-gray mb-10 leading-relaxed max-w-2xl">
              {content?.heroDescription || 'Professional car care & insurance claim experts. From general maintenance to complex accident repairs, we use genuine parts and skilled technicians to deliver excellence in every journey.'}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto"
          >
            <Link 
              to="/book" 
              className="bg-primary text-background w-full sm:w-auto px-8 py-4 rounded-md font-semibold text-base md:text-lg hover:bg-yellow-500 transition-colors flex items-center justify-center text-center min-h-[48px]"
            >
              {content?.heroCtaPrimaryText || 'Book Service'}
            </Link>
            <a 
              href={getCallUrl(settings?.phone)} 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white w-full sm:w-auto px-8 py-4 rounded-md font-semibold text-base md:text-lg hover:bg-white/20 transition-colors flex items-center justify-center text-center min-h-[48px]"
            >
              <Phone className="w-5 h-5 mr-2" />
              {content?.heroCtaSecondaryText || 'Call Now'}
            </a>
            {settings?.whatsapp && (
              <a 
                href={getWhatsAppUrl(settings.whatsapp, getGeneralMessage())} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white w-full sm:w-auto px-8 py-4 rounded-md font-semibold text-base md:text-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center text-center min-h-[48px]"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
            )}
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
