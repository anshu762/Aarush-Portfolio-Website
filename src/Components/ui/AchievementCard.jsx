import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiAward,
  FiStar,
  FiGlobe,
  FiBriefcase,
  FiActivity,
  FiX,
  FiExternalLink,
  FiZoomIn,
  FiImage,
  FiAlertCircle,
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

/**
 * Convert various Google Drive URLs into stable preview image URLs.
 */
const getDriveImageUrls = (url) => {
  if (!url) return [];

  // Already a direct/local image
  if (
    url.startsWith('/') ||
    url.includes('googleusercontent.com') ||
    url.match(/\.(jpg|jpeg|png|webp|gif|svg)(\?|$)/i)
  ) {
    return [url];
  }

  // Extract file ID from common Drive URL formats
  let fileId = null;

  const idParam = url.match(/[?&]id=([^&]+)/);
  if (idParam) fileId = idParam[1];

  const filePath = url.match(/\/file\/d\/([^/]+)/);
  if (filePath) fileId = filePath[1];

  const thumbnailId = url.match(/thumbnail\?id=([^&]+)/);
  if (thumbnailId) fileId = thumbnailId[1];

  if (!fileId) return [url];

  // Multiple fallbacks — try in order until one loads
  return [
    `https://lh3.googleusercontent.com/d/${fileId}=w1200`,
    `https://drive.google.com/uc?export=view&id=${fileId}`,
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`,
    url,
  ];
};

const AchievementCard = ({ achievement, index }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [thumbIndex, setThumbIndex] = useState(0);
  const [thumbFailed, setThumbFailed] = useState(false);
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [modalFailed, setModalFailed] = useState(false);
  const [modalLoaded, setModalLoaded] = useState(false);

  const IconComponent = iconMap[achievement.icon] || FiAward;
  const imageUrls = getDriveImageUrls(achievement.image);
  const hasImageSource = Boolean(achievement.image) && imageUrls.length > 0;
  const showThumbnail = hasImageSource && !thumbFailed;
  const currentThumbUrl = imageUrls[thumbIndex] || null;
  const currentModalUrl = imageUrls[modalIndex] || null;

  // Reset state when achievement changes
  useEffect(() => {
    setThumbIndex(0);
    setThumbFailed(false);
    setThumbLoaded(false);
    setModalIndex(0);
    setModalFailed(false);
    setModalLoaded(false);
  }, [achievement.id, achievement.image]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isPreviewOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPreviewOpen]);

  const handleThumbError = () => {
    if (thumbIndex < imageUrls.length - 1) {
      setThumbIndex((prev) => prev + 1);
      setThumbLoaded(false);
    } else {
      setThumbFailed(true);
    }
  };

  const handleModalError = () => {
    if (modalIndex < imageUrls.length - 1) {
      setModalIndex((prev) => prev + 1);
      setModalLoaded(false);
    } else {
      setModalFailed(true);
    }
  };

  const openPreview = (e) => {
    e.stopPropagation();
    if (hasImageSource || achievement.link) {
      setModalIndex(0);
      setModalFailed(false);
      setModalLoaded(false);
      setIsPreviewOpen(true);
    }
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <>
      {/* ================= CARD ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        whileHover={{ y: -6, scale: 1.01 }}
        onClick={openPreview}
        className={`group relative rounded-2xl glass overflow-hidden hover:border-primary-500/30 transition-all duration-300 flex flex-col h-full ${
          hasImageSource || achievement.link ? 'cursor-pointer' : ''
        }`}
      >
        {/* ========== IMAGE ON TOP ========== */}
        <div className="relative w-full aspect-[16/10] bg-dark-900 overflow-hidden">
          {showThumbnail ? (
            <>
              {/* Loading skeleton */}
              {!thumbLoaded && (
                <div className="absolute inset-0 bg-dark-800 animate-pulse flex items-center justify-center z-10">
                  <FiImage className="w-8 h-8 text-dark-600" />
                </div>
              )}

              <img
                key={currentThumbUrl}
                src={currentThumbUrl}
                alt={achievement.title}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  thumbLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setThumbLoaded(true)}
                onError={handleThumbError}
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Gradient fade at bottom of image */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark-900/80 to-transparent pointer-events-none" />

              {/* Zoom overlay on hover */}
              <div className="absolute inset-0 bg-dark-950/0 group-hover:bg-dark-950/40 transition-all duration-300 flex items-center justify-center z-20">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <FiZoomIn className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white text-xs font-medium">Preview</span>
                </div>
              </div>
            </>
          ) : (
            /* No image — gradient placeholder with icon */
            <div
              className={`w-full h-full bg-gradient-to-br ${achievement.color} flex items-center justify-center`}
            >
              <IconComponent className="w-12 h-12 text-white/80" />
            </div>
          )}

          {/* Status / year badge on image */}
          <div className="absolute top-3 left-3 z-30">
            <span className="px-2.5 py-1 rounded-full bg-dark-950/70 backdrop-blur-sm text-xs text-white font-mono border border-white/10">
              {achievement.year}
            </span>
          </div>
        </div>

        {/* ========== CONTENT BELOW IMAGE ========== */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-base font-bold text-white group-hover:text-primary-400 transition-colors mb-1 line-clamp-2">
            {achievement.title}
          </h3>

          <p className="text-xs text-primary-400 font-medium mb-2">
            {achievement.organization}
          </p>

          <p className="text-xs text-dark-400 leading-relaxed line-clamp-3 flex-1">
            {achievement.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-dark-800">
            <div
              className={`w-8 h-8 rounded-lg bg-gradient-to-r ${achievement.color} flex items-center justify-center`}
            >
              <IconComponent className="w-3.5 h-3.5 text-white" />
            </div>

            {(hasImageSource || achievement.link) && (
              <span className="text-xs text-primary-400/70 group-hover:text-primary-400 flex items-center gap-1 transition-colors">
                <FiZoomIn className="w-3 h-3" />
                Preview
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* ================= PREVIEW MODAL ================= */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={closePreview}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl glass p-5 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-r ${achievement.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs text-dark-500 font-mono">
                      {achievement.year}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white pr-4">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-primary-400 font-medium mt-1">
                    {achievement.organization}
                  </p>
                </div>
                <button
                  onClick={closePreview}
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-dark-800 hover:bg-dark-700 flex items-center justify-center text-dark-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close preview"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Large image */}
              {hasImageSource && (
                <div className="relative rounded-xl overflow-hidden border border-dark-700 mb-5 bg-dark-900 min-h-[200px] flex items-center justify-center">
                  {!modalFailed ? (
                    <>
                      {!modalLoaded && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-dark-900 z-10">
                          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                          <p className="text-dark-500 text-xs">Loading preview...</p>
                        </div>
                      )}
                      <img
                        key={currentModalUrl}
                        src={currentModalUrl}
                        alt={achievement.title}
                        className={`w-full h-auto max-h-[50vh] object-contain mx-auto transition-opacity duration-300 ${
                          modalLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => setModalLoaded(true)}
                        onError={handleModalError}
                        referrerPolicy="no-referrer"
                      />
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 py-12 px-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${achievement.color} flex items-center justify-center shadow-lg`}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex items-center gap-2 text-dark-400 text-sm">
                        <FiAlertCircle className="w-4 h-4" />
                        <span>Preview image unavailable</span>
                      </div>
                      <p className="text-dark-500 text-xs text-center max-w-xs">
                        The certificate image could not be loaded. Use the button below to open the full document.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <p className="text-dark-300 text-sm leading-relaxed mb-5">
                {achievement.description}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {achievement.link && (
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 transition-all"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    View Full Document
                  </a>
                )}
                <button
                  onClick={closePreview}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-dark-600 text-dark-300 hover:text-white hover:border-dark-500 text-sm font-medium transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AchievementCard;