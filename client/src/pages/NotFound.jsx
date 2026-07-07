import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5"></div>
      
      <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-surface border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <AlertTriangle className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="text-8xl font-heading font-bold text-white mb-4 tracking-tighter">
            4<span className="text-primary">0</span>4
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-6">
            Looks like you took a wrong turn!
          </h2>
          
          <p className="text-gray text-lg mb-10 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <Link 
            to="/" 
            className="inline-flex items-center bg-primary text-background px-8 py-4 rounded-md font-semibold text-lg hover:bg-yellow-500 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default NotFound;
