import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiExternalLink,
  FiFileText,
  FiGithub,
  FiArrowRight,
  FiBookOpen,
  FiLink,
} from 'react-icons/fi';
import Modal from '../comman/Modal';

const statusColors = {
  Ongoing: 'bg-green-500/20 text-green-400 border-green-500/30',
  'In Development': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Prototype: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Experiment: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Submitted: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  Draft: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

const ProjectCard = ({ project, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusClasses = (status) => {
    return statusColors[status] || 'bg-dark-600/50 text-dark-300 border-dark-500/30';
  };

  const getLinkEntries = (links) => {
    if (!links) return [];
    return Object.entries(links).filter(([, url]) => url);
  };

  const getLinkIcon = (key) => {
    switch (key) {
      case 'live':
        return <FiExternalLink className="w-4 h-4" />;
      case 'github':
        return <FiGithub className="w-4 h-4" />;
      case 'documentation':
        return <FiFileText className="w-4 h-4" />;
      case 'manuscript':
        return <FiBookOpen className="w-4 h-4" />;
      case 'feature':
        return <FiLink className="w-4 h-4" />;
      case 'social':
        return <FiLink className="w-4 h-4" />;
      default:
        return <FiExternalLink className="w-4 h-4" />;
    }
  };

  const getLinkLabel = (key) => {
    const labels = {
      live: 'Visit Live',
      github: 'GitHub',
      documentation: 'Documentation',
      manuscript: 'Read Paper',
      feature: 'Featured Article',
      social: 'Social Media',
    };
    return labels[key] || key;
  };

  const linkEntries = getLinkEntries(project.links);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        whileHover={{ y: -6 }}
        className="group relative rounded-2xl overflow-hidden glass hover:border-primary-500/30 transition-all duration-500 cursor-pointer flex flex-col h-full"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Gradient top bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${project.color}`} />

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusClasses(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
                <span className="text-xs text-dark-500">
                  {project.type === 'research' ? '📄 Research' : '🚀 Project'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-2">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Role */}
          <p className="text-primary-400 text-sm font-medium mb-3">{project.role}</p>

          {/* Description */}
          <p className="text-dark-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-dark-800 text-dark-300 text-xs font-mono"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-0.5 rounded-md bg-dark-800 text-dark-500 text-xs">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-dark-800 mt-auto">
            <div className="flex gap-2">
              {linkEntries.slice(0, 2).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-xs text-dark-400 hover:text-primary-400 transition-colors"
                  title={getLinkLabel(key)}
                >
                  {getLinkIcon(key)}
                  <span className="hidden sm:inline">{getLinkLabel(key)}</span>
                </a>
              ))}
            </div>
            <span className="flex items-center gap-1 text-xs text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Details <FiArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={project.title}
      >
        <div className="space-y-6">
          {/* Status and Category */}
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusClasses(
                project.status
              )}`}
            >
              {project.status}
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-dark-800 text-dark-300">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-dark-800 text-dark-300">
              {project.type === 'research' ? '📄 Research' : '🚀 Project'}
            </span>
          </div>

          {/* Role */}
          <div>
            <h4 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-1">
              Role
            </h4>
            <p className="text-primary-400 font-medium">{project.role}</p>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-2">
              Description
            </h4>
            <p className="text-dark-200 leading-relaxed">{project.description}</p>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">
                Key Highlights
              </h4>
              <ul className="space-y-2">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                    <span className="text-dark-200">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          <div>
            <h4 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">
              Technologies & Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-dark-800 text-dark-200 text-sm font-mono border border-dark-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {linkEntries.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">
                Links
              </h4>
              <div className="flex flex-wrap gap-3">
                {linkEntries.map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 text-primary-400 hover:text-primary-300 hover:border-primary-500/40 transition-all text-sm"
                  >
                    {getLinkIcon(key)}
                    {getLinkLabel(key)}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ProjectCard;