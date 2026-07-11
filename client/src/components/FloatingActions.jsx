import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import CallButton from './common/CallButton';
import WhatsAppButton from './common/WhatsAppButton';

const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-8 md:bottom-10 right-4 md:right-8 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-surface border border-white/10 rounded-full flex items-center justify-center text-gray hover:text-white hover:bg-white/10 transition-colors shadow-lg"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <CallButton 
        iconOnly 
        className="!w-14 !h-14 !rounded-full shadow-lg !p-0"
      />

      <WhatsAppButton 
        iconOnly 
        className="!w-14 !h-14 !rounded-full shadow-lg !p-0"
      />
    </div>
  );
};

export default FloatingActions;
