import { motion } from 'framer-motion';
import { CalendarCheck, Search, Wrench, ShieldCheck, Key } from 'lucide-react';

const steps = [
  {
    icon: CalendarCheck,
    title: 'Book Appointment',
    description: 'Schedule an appointment online or via call.'
  },
  {
    icon: Search,
    title: 'Vehicle Inspection',
    description: 'Our experts conduct a thorough 360° inspection.'
  },
  {
    icon: Wrench,
    title: 'Repair Work',
    description: 'We fix the issues using genuine parts and advanced tools.'
  },
  {
    icon: ShieldCheck,
    title: 'Quality Check',
    description: 'Rigorous testing to ensure everything works perfectly.'
  },
  {
    icon: Key,
    title: 'Vehicle Delivery',
    description: 'Get your car back, clean and ready for the road.'
  }
];

const HowWeWork = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block"
          >
            Our Process
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-bold text-white"
          >
            How We Work
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-surface lg:bg-transparent p-6 lg:p-0 rounded-xl border border-white/5 lg:border-none text-center group"
                >
                  <div className="w-20 h-20 bg-background lg:bg-surface rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-surface lg:border-background group-hover:border-primary transition-colors relative">
                    <Icon className="w-8 h-8 text-primary" />
                    {/* Number Indicator */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-background font-bold text-sm border-4 border-background">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
