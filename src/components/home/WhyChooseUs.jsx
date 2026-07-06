import { motion } from 'framer-motion';
import { Wrench, ShieldCheck, IndianRupee, Clock, Package, ThumbsUp } from 'lucide-react';

const features = [
  {
    icon: Wrench,
    title: 'Experienced Technicians',
    description: 'Our certified experts have years of experience handling all major car brands with precision.'
  },
  {
    icon: ShieldCheck,
    title: 'Insurance Claim Support',
    description: 'Hassle-free, cashless insurance claim assistance with all leading insurance providers.'
  },
  {
    icon: IndianRupee,
    title: 'Affordable Pricing',
    description: 'Premium service quality at highly competitive and transparent prices without hidden charges.'
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'We value your time. Our streamlined processes ensure quick delivery of your vehicle.'
  },
  {
    icon: Package,
    title: 'Genuine Parts',
    description: 'We use only 100% genuine OEM spare parts to guarantee performance and longevity.'
  },
  {
    icon: ThumbsUp,
    title: 'Customer Satisfaction',
    description: 'A relentless focus on quality to ensure every customer leaves our workshop with a smile.'
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
