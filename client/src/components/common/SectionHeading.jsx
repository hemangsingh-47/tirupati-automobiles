import { motion } from 'framer-motion';

const SectionHeading = ({ subtitle, title, centered = false }) => {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      {subtitle && (
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-heading font-bold text-white"
      >
        {title}
      </motion.h2>
    </div>
  );
};

export default SectionHeading;
