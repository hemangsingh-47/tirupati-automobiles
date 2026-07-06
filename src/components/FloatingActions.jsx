import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
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

      <a
        href="tel:+919876543210"
        className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-background hover:bg-yellow-500 transition-colors shadow-lg"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6" />
      </a>

      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:bg-[#128C7E] transition-colors shadow-lg"
        aria-label="WhatsApp us"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};

export default FloatingActions;
