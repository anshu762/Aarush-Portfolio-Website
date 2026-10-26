import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiAward, FiFileText, FiStar } from 'react-icons/fi';

const typeIcons = {
  certificate: FiAward,
  trophy: FiAward,
  recommendation: FiFileText,
};

const typeLabels = {
  certificate: 'Certificate',
  trophy: 'Trophy / Recognition',
  recommendation: 'Recommendation',
};

const CertificateCard = ({ certificate, index }) => {
  const IconComponent = typeIcons[certificate.type] || FiStar;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-xl glass overflow-hidden hover:border-primary-500/30 transition-all duration-300 flex flex-col h-full"
    >
      {/* Type badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-dark-900/80 backdrop-blur-sm text-xs text-dark-300 border border-dark-700">
          <IconComponent className="w-3 h-3" />
          {typeLabels[certificate.type]}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-white mb-2 group-hover:text-primary-400 transition-colors pr-24">
          {certificate.title}
        </h3>

        <p className="text-xs text-primary-400 font-medium mb-1">{certificate.issuer}</p>

        {certificate.date && (
          <p className="text-xs text-dark-500 font-mono mb-2">{certificate.date}</p>
        )}

        {certificate.description && (
          <p className="text-xs text-dark-400 mb-3 line-clamp-2 flex-1">
            {certificate.description}
          </p>
        )}

        {/* View link */}
        {certificate.link && (
          <a
            href={certificate.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 transition-colors font-medium"
          >
            <FiExternalLink className="w-3.5 h-3.5" />
            View Document
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default CertificateCard;