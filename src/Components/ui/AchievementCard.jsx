import React from 'react';
import { motion } from 'framer-motion';
import {
  FiAward,
  FiStar,
  FiGlobe,
  FiBriefcase,
  FiActivity,
} from 'react-icons/fi';

const iconMap = {
  trophy: FiAward,
  award: FiAward,
  star: FiStar,
  medal: FiAward,
  certificate: FiAward,
  globe: FiGlobe,
  briefcase: FiBriefcase,
  football: FiActivity,
};

const AchievementCard = ({ achievement, index }) => {
  const IconComponent = iconMap[achievement.icon] || FiAward;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative p-5 rounded-xl glass hover:border-primary-500/30 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${achievement.color} flex items-center justify-center shadow-lg`}
        >
          <IconComponent className="w-5 h-5 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-white group-hover:text-primary-400 transition-colors">
              {achievement.title}
            </h3>
          </div>
          <p className="text-xs text-primary-400 font-medium mb-1">
            {achievement.organization}
          </p>
          <p className="text-xs text-dark-400 mb-1">{achievement.description}</p>
          <span className="text-xs text-dark-500 font-mono">{achievement.year}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementCard;