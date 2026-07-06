import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

const LocationPreview = () => {
  return (
    <section className="py-24 bg-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">
                Find Us
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                Visit Our Workshop
              </h2>
              <p className="text-gray leading-relaxed mb-8">
                Located in the heart of Sirohi, our state-of-the-art facility is easily accessible. Drop by for a cup of coffee and let our experts take care of your car.
              </p>
              
              <div className="bg-background p-6 rounded-xl border border-white/5 mb-8 space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-bold font-heading mb-1">Workshop Address</h4>
                    <p className="text-gray text-sm leading-relaxed">
                      Tirupati Automobiles,<br/>
                      RIICO Industrial Area,<br/>
                      Sirohi, Rajasthan
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <h4 className="text-white font-bold font-heading mb-1">Phone</h4>
                    <p className="text-gray text-sm leading-relaxed">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-white font-bold font-heading mb-1">Business Hours</h4>
                    <p className="text-gray text-sm leading-relaxed">Mon - Sat: 9:00 AM - 7:00 PM<br/>Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-primary text-background px-8 py-4 rounded-md font-semibold text-lg hover:bg-yellow-500 transition-colors"
              >
                <Navigation className="w-5 h-5 mr-2" />
                Get Directions
              </a>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-2/3 h-[500px] rounded-2xl overflow-hidden relative group">
            {/* Placeholder for actual Google Map iframe */}
            <div className="absolute inset-0 bg-background/50 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
            <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Map location placeholder" 
                className="w-full h-full object-cover grayscale opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background/80 backdrop-blur-sm p-4 rounded-full border border-primary/20 shadow-2xl animate-bounce">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationPreview;
