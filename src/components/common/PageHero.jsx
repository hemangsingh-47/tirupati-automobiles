import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const PageHero = ({ title, description, image = "https://images.unsplash.com/photo-1621252179027-94459d278660?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/90 z-10"></div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover grayscale opacity-40"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm font-medium text-gray mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
              const formattedName = name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

              return (
                <div key={name} className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-2 text-white/20" />
                  {isLast ? (
                    <span className="text-white">{formattedName}</span>
                  ) : (
                    <Link to={routeTo} className="hover:text-primary transition-colors">
                      {formattedName}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl text-gray leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
