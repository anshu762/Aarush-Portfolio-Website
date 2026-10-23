import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiBook,
  FiAward,
  FiMusic,
  FiCpu,
} from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import SectionHeading from '../ui/SectionHeading';
import { educationData } from '../../data/education';

const iconMap = {
  school: FiBook,
  graduationCap: HiOutlineAcademicCap,
  award: FiAward,
  music: FiMusic,
  brain: FiCpu,
};

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="education" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          title="Education & Qualifications"
          subtitle="My academic journey and continuous pursuit of knowledge."
        />

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-accent-500/30 to-transparent hidden sm:block" />

          {/* Timeline items */}
          <div className="space-y-8 sm:space-y-12">
            {educationData.map((item, index) => {
              const IconComponent = iconMap[item.icon] || FiBook;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start gap-4 sm:gap-8 ${
                    isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      isLeft ? 'sm:text-left' : 'sm:text-left sm:pl-12'
                    } pl-16 sm:pl-0`}
                  >
                    <div
                      className={`p-5 rounded-xl glass hover:border-primary-500/20 transition-all ${
                        item.current ? 'border-primary-500/20' : ''
                      }`}
                    >
                      {/* Current badge */}
                      {item.current && (
                        <div className={`flex mb-2 ${isLeft ? 'sm:justify-end' : 'justify-start'}`}>
                          <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/30">
                            Current
                          </span>
                        </div>
                      )}

                      <h3 className="text-lg font-bold text-white mb-1">
                        {item.degree}
                      </h3>
                      <p className="text-primary-400 text-sm font-medium mb-1">
                        {item.institution}
                      </p>
                      <p className="text-dark-500 text-xs font-mono mb-3">
                        {item.duration}
                      </p>

                      {/* Details */}
                      <ul
                        className={`space-y-1 ${
                          isLeft ? 'sm:text-left' : 'text-left'
                        }`}
                      >
                        {item.details.map((detail, i) => (
                          <li
                            key={i}
                            className="text-dark-400 text-sm flex items-start gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-primary-500/50 mt-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-5 sm:left-1/2 sm:-translate-x-1/2 w-7 h-7 rounded-full bg-dark-900 border-2 border-primary-500/50 flex items-center justify-center z-10">
                    <IconComponent className="w-3 h-3 text-primary-400" />
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden sm:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;