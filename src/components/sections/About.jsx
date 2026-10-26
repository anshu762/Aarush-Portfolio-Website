import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiMapPin,
  FiBook,
  FiTarget,
  FiGlobe,
} from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading';
import AnimatedCounter from '../ui/AnimatedCounter';
import { personalInfo } from '../../data/personalInfo';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { end: 15, suffix: '+', label: 'Projects & Research' },
    { end: 10, suffix: '+', label: 'Awards & Recognitions' },
    { end: 50, suffix: '+', label: 'Minutes of Original Music' },
    { end: 5, suffix: '', label: 'AP Exams Cleared' },
  ];

  const bioParas = personalInfo.detailedBio.split('\n\n');

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="About Me"
          subtitle="Get to know who I am, what drives me, and where I'm headed."
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left column - Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Info cards */}
            {[
              {
                icon: <FiBook className="w-5 h-5" />,
                label: 'Education',
                value: personalInfo.programme,
                sub: personalInfo.school,
              },
              {
                icon: <FiMapPin className="w-5 h-5" />,
                label: 'Location',
                value: personalInfo.location,
              },
              {
                icon: <FiTarget className="w-5 h-5" />,
                label: 'Focus Areas',
                value: 'Computer Science, Music Technology, Audio Engineering & Accessible Tech',
              },
              {
                icon: <FiGlobe className="w-5 h-5" />,
                label: 'Languages',
                value: personalInfo.languages.join(', '),
              },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-4 rounded-xl glass hover:border-primary-500/20 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-dark-500 uppercase tracking-wider font-medium mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-white text-sm font-medium">{item.value}</p>
                    {item.sub && (
                      <p className="text-dark-400 text-xs mt-0.5">{item.sub}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="space-y-4">
              {bioParas.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="text-dark-300 leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Career Goal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="p-5 rounded-xl bg-gradient-to-r from-primary-500/5 to-accent-500/5 border border-primary-500/10"
            >
              <h3 className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-2">
                Career Goal
              </h3>
              <p className="text-dark-300 text-sm leading-relaxed">
                {personalInfo.careerGoal}
              </p>
            </motion.div>

            {/* Additional note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="text-dark-500 text-sm italic"
            >
              My work brings together music, computing and community projects. Each project description shows my specific role, the work produced and whether a project is ongoing or completed.
            </motion.p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <div key={i} className="p-6 rounded-xl glass text-center">
              <AnimatedCounter
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;