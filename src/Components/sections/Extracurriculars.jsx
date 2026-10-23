import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiMusic,
  FiGlobe,
  FiMic,
  FiHeart,
  FiHeadphones,
  FiActivity,
  FiAward,
  FiVolume2,
} from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading';
import { extracurricularsData } from '../../data/extracurriculars';

const iconMap = {
  crown: FiAward,
  music: FiMusic,
  guitar: FiMusic,
  headphones: FiHeadphones,
  speaker: FiVolume2,
  mic: FiMic,
  heart: FiHeart,
  globe: FiGlobe,
  football: FiActivity,
  trophy: FiAward,
};

const categoryColors = {
  Leadership: 'from-amber-500 to-orange-500',
  'Music & Arts': 'from-purple-500 to-pink-500',
  Professional: 'from-blue-500 to-cyan-500',
  'Events & Tech': 'from-green-500 to-emerald-500',
  Community: 'from-rose-500 to-red-500',
  Academics: 'from-indigo-500 to-violet-500',
  Sports: 'from-lime-500 to-green-500',
};

const Extracurriculars = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="extracurriculars" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Extra-Curricular Activities"
          subtitle="Leadership, music, community engagement, and more."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {extracurricularsData.map((activity, index) => {
            const IconComponent = iconMap[activity.icon] || FiMusic;
            const colorClass =
              categoryColors[activity.category] || 'from-gray-500 to-gray-600';

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className="group p-5 rounded-xl glass hover:border-primary-500/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-r ${colorClass} flex items-center justify-center shadow-lg`}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white group-hover:text-primary-400 transition-colors mb-0.5">
                      {activity.title}
                    </h3>
                    <p className="text-xs text-primary-400 font-medium mb-2">
                      {activity.organization}
                    </p>
                    <p className="text-xs text-dark-400 leading-relaxed">
                      {activity.description}
                    </p>

                    {/* Category tag */}
                    <div className="mt-3">
                      <span className="px-2 py-0.5 rounded-md bg-dark-800 text-dark-400 text-xs">
                        {activity.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Extracurriculars;