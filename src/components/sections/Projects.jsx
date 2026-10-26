import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../ui/ProjectCard';
import { projectsData, projectFilterCategories } from '../../data/projects';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projectsData;
    if (activeFilter === 'Projects')
      return projectsData.filter((p) => p.type === 'project');
    if (activeFilter === 'Research & Academic')
      return projectsData.filter((p) => p.type === 'research');
    return projectsData;
  }, [activeFilter]);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Projects & Research"
          subtitle={`${projectsData.length} entries: ${projectsData.filter((p) => p.type === 'project').length} project initiatives and ${projectsData.filter((p) => p.type === 'research').length} research or academic works.`}
        />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {projectFilterCategories.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setShowAll(false);
              }}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700 border border-dark-700'
              }`}
            >
              {filter}
              <span className="ml-1.5 text-xs opacity-70">
                (
                {filter === 'All'
                  ? projectsData.length
                  : filter === 'Projects'
                  ? projectsData.filter((p) => p.type === 'project').length
                  : projectsData.filter((p) => p.type === 'research').length}
                )
              </span>
            </button>
          ))}
        </motion.div>

        {/* Featured projects highlight */}
        {activeFilter === 'All' && !showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="text-center text-dark-500 text-sm">
              ⭐ Featured projects highlighted • Click any card for full details
            </p>
          </motion.div>
        )}

        {/* Project cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Show more/less button */}
        {filteredProjects.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-xl border border-dark-600 text-dark-200 hover:text-white hover:border-primary-500/50 hover:bg-primary-500/5 font-medium transition-all cursor-pointer"
            >
              {showAll
                ? 'Show Less'
                : `View All ${filteredProjects.length} ${activeFilter === 'All' ? 'Entries' : activeFilter}`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;