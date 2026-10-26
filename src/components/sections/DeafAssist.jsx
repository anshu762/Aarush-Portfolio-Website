// src/components/sections/DeafAssist.jsx
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiExternalLink,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiEye,
  FiVolume2,
  FiSmartphone,
  FiWifi,
  FiNavigation,
  FiCheckCircle,
  FiUsers,
  FiAward,
  FiCalendar,
  FiCpu,
} from 'react-icons/fi';
import { deafAssistData } from '../../data/deafassist';

/* ─── icon map for highlights ─── */
const iconMap = {
  ear: FiVolume2,
  glasses: FiEye,
  phone: FiSmartphone,
  direction: FiNavigation,
  offline: FiWifi,
  testing: FiUsers,
};

/* ─── animation variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Lightbox modal ─── */
function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);

  const next = useCallback(
    () => setIdx((i) => (i + 1) % images.length),
    [images.length]
  );
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, next, prev]);

  const current = images[idx];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2 text-white transition-colors"
        >
          <FiX size={24} />
        </button>

        {/* Image */}
        <div className="relative w-full flex items-center justify-center">
          {images.length > 1 && (
            <button
              onClick={prev}
              className="absolute left-2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2 text-white transition-colors"
            >
              <FiChevronLeft size={24} />
            </button>
          )}

          <AnimatePresence mode="wait">
            <motion.img
              key={idx}
              src={current.image}
              alt={current.caption || current.source || ''}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {images.length > 1 && (
            <button
              onClick={next}
              className="absolute right-2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2 text-white transition-colors"
            >
              <FiChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Caption */}
        <div className="mt-4 text-center">
          <p className="text-white text-sm md:text-base font-medium">
            {current.caption || current.source}
          </p>
          {current.date && (
            <p className="text-white/60 text-xs mt-1">{current.date}</p>
          )}
          {current.language && (
            <span className="inline-block mt-1 px-2 py-0.5 bg-white/10 rounded-full text-white/70 text-xs">
              {current.language}
            </span>
          )}
          <p className="text-white/40 text-xs mt-2">
            {idx + 1} / {images.length}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Section ─── */
export default function DeafAssist() {
  const [lightbox, setLightbox] = useState(null); // { images, startIndex }
  const [heroRef, heroInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [featRef, featInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [pressRef, pressInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [photoRef, photoInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const openPressLightbox = (index) => {
    setLightbox({ images: deafAssistData.pressCoverage, startIndex: index });
  };

  const openPhotoLightbox = (index) => {
    setLightbox({ images: deafAssistData.testingPhotos, startIndex: index });
  };

  return (
    <section
      id="deafassist"
      className="py-20 md:py-28 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/3 to-blue-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ═══ SECTION HEADER ═══ */}
        <motion.div
          ref={heroRef}
          variants={containerVariants}
          initial="hidden"
          animate={heroInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-6">
            <FiCpu className="w-4 h-4" />
            Featured Project — IRIS National Finalist
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              DeafAssist
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            {deafAssistData.tagline}
          </motion.p>

          {/* Role & status badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 mt-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm">
              <FiUsers className="w-3.5 h-3.5" />
              {deafAssistData.role}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm">
              <FiCheckCircle className="w-3.5 h-3.5" />
              {deafAssistData.status}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm">
              <FiAward className="w-3.5 h-3.5" />
              IRIS National Finalist
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm">
              <FiCalendar className="w-3.5 h-3.5" />
              {deafAssistData.date}
            </span>
          </motion.div>
        </motion.div>

        {/* ═══ HERO IMAGE + DESCRIPTION ═══ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={heroInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-10 items-center mb-20"
        >
          {/* Hero image */}
          <motion.div
            variants={scaleIn}
            className="relative group cursor-pointer"
            onClick={() => openPhotoLightbox(1)}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-2xl blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img
                src="/images/deafassist/testing-4.jpeg"
                alt="DeafAssist eyewear prototype being tested"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/90 text-sm font-medium">
                  User testing the DeafAssist eyewear prototype at KocharTech, Amritsar
                </p>
              </div>
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <FiMaximize2 className="text-white w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="prose prose-invert max-w-none">
              {deafAssistData.longDescription
                .split('\n\n')
                .map((para, i) => (
                  <p
                    key={i}
                    className="text-gray-300 leading-relaxed text-base"
                  >
                    {para}
                  </p>
                ))}
            </div>

            {/* Article link */}
            <a
              href={deafAssistData.mediaArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5"
            >
              <FiExternalLink className="w-4 h-4" />
              Read Full News Article
            </a>
          </motion.div>
        </motion.div>

        {/* ═══ KEY FEATURES ═══ */}
        <motion.div
          ref={featRef}
          variants={containerVariants}
          initial="hidden"
          animate={featInView ? 'visible' : 'hidden'}
          className="mb-20"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-white text-center mb-10"
          >
            Key Features & Capabilities
          </motion.h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deafAssistData.highlights.map((item, i) => {
              const Icon = iconMap[item.icon] || FiCheckCircle;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group relative bg-gray-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h4 className="text-white font-semibold text-lg mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ═══ MEDIA / PRESS COVERAGE ═══ */}
        <motion.div
          ref={pressRef}
          variants={containerVariants}
          initial="hidden"
          animate={pressInView ? 'visible' : 'hidden'}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-4">
              <FiExternalLink className="w-4 h-4" />
              As Featured In
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Press & Media Coverage
            </h3>
            <p className="text-gray-400 mt-2 max-w-xl mx-auto">
              DeafAssist's successful user testing was covered by multiple regional and national publications.
            </p>
          </motion.div>

          {/* Press grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deafAssistData.pressCoverage.map((press, i) => (
              <motion.div
                key={press.id}
                variants={scaleIn}
                className="group relative cursor-pointer"
                onClick={() => openPressLightbox(i)}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-gray-800/60 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:border-amber-500/30 transition-all duration-500">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={press.image}
                      alt={`${press.source} coverage`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                  </div>

                  {/* Info bar */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold text-sm">
                          {press.source}
                        </h4>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {press.date}
                        </p>
                      </div>
                      <span className="px-2 py-0.5 bg-white/5 rounded-full text-gray-400 text-xs">
                        {press.language}
                      </span>
                    </div>
                  </div>

                  {/* Expand overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                    <div className="bg-white/10 backdrop-blur-md rounded-full p-3">
                      <FiMaximize2 className="text-white w-6 h-6" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Article CTA */}
          <motion.div variants={itemVariants} className="text-center mt-8">
            <a
              href={deafAssistData.mediaArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-medium"
            >
              <FiExternalLink className="w-4 h-4" />
              Read "{deafAssistData.mediaArticle.title}" — {deafAssistData.mediaArticle.source}
            </a>
          </motion.div>
        </motion.div>

        {/* ═══ TESTING PHOTOS GALLERY ═══ */}
        <motion.div
          ref={photoRef}
          variants={containerVariants}
          initial="hidden"
          animate={photoInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
              <FiEye className="w-4 h-4" />
              Behind the Scenes
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              User Testing at KocharTech
            </h3>
            <p className="text-gray-400 mt-2 max-w-xl mx-auto">
              Prototype testing session with a hearing-impaired participant at Kochar Infotech, Amritsar — October 2026.
            </p>
          </motion.div>

          {/* Photo grid – first image large, rest smaller */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {deafAssistData.testingPhotos.map((photo, i) => (
              <motion.div
                key={photo.id}
                variants={scaleIn}
                className={`group relative cursor-pointer ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                }`}
                onClick={() => openPhotoLightbox(i)}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative rounded-xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500 h-full">
                  <img
                    src={photo.image}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs md:text-sm font-medium leading-snug">
                      {photo.caption}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiMaximize2 className="text-white w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ═══ LIGHTBOX ═══ */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            startIndex={lightbox.startIndex}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}