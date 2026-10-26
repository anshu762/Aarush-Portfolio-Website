import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import AchievementCard from '../ui/AchievementCard';
import { achievementsData } from '../../data/achievements';

const Achievements = () => {
  return (
    <section id="achievements" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Achievements & Awards"
          subtitle="Recognitions and milestones across academics, entrepreneurship, and beyond. Click any card to preview the certificate."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievementsData.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;