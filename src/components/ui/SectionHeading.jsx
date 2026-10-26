import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionHeading = ({ title, subtitle, align = 'center', light = false }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <motion.h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-display ${
          light ? 'text-white' : 'text-gradient'
        }`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-dark-400 text-lg max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </motion.div>
  );
};

export default SectionHeading;