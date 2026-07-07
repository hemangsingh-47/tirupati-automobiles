import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileCheck2, MessageCircle } from 'lucide-react';

const InsuranceBanner = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-surface rounded-2xl p-8 md:p-16 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-primary/5"
        >
          <div className="max-w-2xl text-center md:text-left">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
              <FileCheck2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
              Need Insurance Claim Assistance?
            </h2>
            <p className="text-lg text-gray leading-relaxed">
              We provide 100% cashless facilities and expert assistance to ensure your insurance claims are processed smoothly and without any hidden costs. Drive with peace of mind.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <Link 
              to="/insurance" 
              className="bg-primary text-background px-8 py-4 rounded-md font-semibold text-lg hover:bg-yellow-500 transition-colors text-center"
            >
              Contact Us
            </Link>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center text-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InsuranceBanner;
