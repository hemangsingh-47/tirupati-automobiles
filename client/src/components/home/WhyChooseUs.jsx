import { motion } from 'framer-motion';
import { Wrench, ShieldCheck, IndianRupee, Car, Package, ThumbsUp } from 'lucide-react';

const features = [
  {
    icon: Car,
    title: 'Multi Brand Service',
    description: 'Expert servicing, diagnostics, and repairs for all major domestic and luxury automobile brands.'
  },
  {
    icon: ShieldCheck,
    title: 'Insurance Claim Assistance',
    description: '100% cashless facilities and hassle-free insurance claim processing with all leading providers.'
  },
  {
    icon: Package,
    title: 'Genuine Spare Parts',
    description: 'We exclusively use 100% genuine OEM spare parts to ensure the longevity and performance of your vehicle.'
  },
  {
    icon: Wrench,
    title: 'Skilled Technicians',
    description: 'Our team comprises highly trained and certified mechanics with years of professional experience.'
  },
  {
    icon: IndianRupee,
    title: 'Affordable Pricing',
    description: 'Premium quality automobile care delivered with transparent, highly competitive pricing.'
  },
  {
    icon: ThumbsUp,
    title: 'Quality Workmanship',
    description: 'A relentless commitment to precision and perfection in every repair and service we perform.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block"
          >
            Why Choose Us
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-bold text-white"
          >
            Premium Care, Exceptional Results
          </motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="bg-surface p-8 rounded-xl border border-white/5 hover:border-primary/30 transition-colors group"
              >
                <div className="w-14 h-14 bg-background rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
