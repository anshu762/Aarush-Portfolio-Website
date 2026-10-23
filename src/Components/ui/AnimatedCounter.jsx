import React from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const AnimatedCounter = ({ end, suffix = '', prefix = '', label, duration = 2 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-2">
        {prefix}
        {inView ? (
          <CountUp end={end} duration={duration} separator="," />
        ) : (
          '0'
        )}
        {suffix}
      </div>
      <p className="text-dark-400 text-sm md:text-base">{label}</p>
    </div>
  );
};

export default AnimatedCounter;