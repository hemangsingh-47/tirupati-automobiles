import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useCms } from '../../context/CmsContext';

const AnimatedCounter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.min(Math.floor(end * progress), end));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const parseStat = (valueStr) => {
  const match = valueStr?.match(/^(\d+)(.*)$/);
  if (match) {
    return { value: parseInt(match[1], 10), suffix: match[2] };
  }
  return { value: null, textValue: valueStr || '' };
};

const StatsSection = () => {
  const { content } = useCms();

  const stats = [
    { ...parseStat(content?.stat1Value || '5000+'), label: content?.stat1Label || 'Happy Customers' },
    { ...parseStat(content?.stat2Value || '15000+'), label: content?.stat2Label || 'Vehicles Repaired' },
    { ...parseStat(content?.stat3Value || '10+'), label: content?.stat3Label || 'Years Experience' },
    { ...parseStat(content?.stat4Value || '15+'), label: content?.stat4Label || 'Expert Mechanics' }
  ];

  return (
    <section className="py-20 bg-surface border-t border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-6xl font-heading font-bold text-primary mb-2">
                {stat.value !== null ? (
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                ) : (
                  <span>{stat.textValue}</span>
                )}
              </div>
              <div className="text-gray font-medium uppercase tracking-wider text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
