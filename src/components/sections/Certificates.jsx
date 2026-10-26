import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import CertificateCard from '../ui/CertificateCard';
import { certificatesData } from '../../data/certificates';

const certificateTypes = ['All', 'certificate', 'trophy', 'recommendation'];
const typeLabels = {
  All: 'All',
  certificate: 'Certificates',
  trophy: 'Trophies',
  recommendation: 'Recommendations',
};

const Certificates = () => {
  const [activeType, setActiveType] = useState('All');

  const filteredCertificates =
    activeType === 'All'
      ? certificatesData
      : certificatesData.filter((cert) => cert.type === activeType);

  return (
    <section id="certificates" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Certificates & Recommendations"
          subtitle="Documentation of achievements, recognitions, and professional endorsements."
        />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {certificateTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeType === type
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700 border border-dark-700'
              }`}
            >
              {typeLabels[type]}
              <span className="ml-1 text-xs opacity-70">
                (
                {type === 'All'
                  ? certificatesData.length
                  : certificatesData.filter((c) => c.type === type).length}
                )
              </span>
            </button>
          ))}
        </motion.div>

        {/* Certificates grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeType}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredCertificates.map((certificate, index) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Certificates;