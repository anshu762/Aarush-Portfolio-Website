import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiUsers,
  FiHeart,
  FiMic,
  FiCalendar,
  FiSearch,
  FiMessageSquare,
  FiMusic,
  FiSmile,
  FiSun,
} from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading';
import SkillBar from '../ui/SkillBar';
import { hardSkills, softSkills, skillCategories } from '../../data/skills';

const softSkillIcons = {
  users: FiUsers,
  heart: FiHeart,
  handshake: FiSmile,
  mic: FiMic,
  calendar: FiCalendar,
  lightbulb: FiSun,
  search: FiSearch,
  message: FiMessageSquare,
  music: FiMusic,
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredSkills =
    activeCategory === 'All'
      ? hardSkills
      : hardSkills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="A blend of technical proficiency and creative artistry."
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Hard Skills */}
          <div className="lg:col-span-3">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-xl font-bold text-white mb-6 flex items-center gap-2"
            >
              <span className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 text-sm">
                ⚡
              </span>
              Technical Skills
            </motion.h3>

            {/* Category filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {skillCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeCategory === category
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Skill bars */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {filteredSkills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Soft Skills */}
          <div className="lg:col-span-2">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold text-white mb-6 flex items-center gap-2"
            >
              <span className="w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center text-accent-400 text-sm">
                🤝
              </span>
              Soft Skills
            </motion.h3>

            <div className="space-y-3">
              {softSkills.map((skill, index) => {
                const IconComponent = softSkillIcons[skill.icon] || FiUsers;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-3 rounded-xl glass hover:border-accent-500/20 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-accent-500/10 flex items-center justify-center text-accent-400 flex-shrink-0 group-hover:bg-accent-500/20 transition-colors">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-dark-200 text-sm font-medium group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;