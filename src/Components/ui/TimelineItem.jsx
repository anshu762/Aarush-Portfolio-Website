import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ children, index, isLeft = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col sm:flex-row items-start gap-4 sm:gap-8 ${
        isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
      }`}
    >
      {children}
    </motion.div>
  );
};

export default TimelineItem;