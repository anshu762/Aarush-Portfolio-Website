import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import {
  FiArrowDown,
  FiLinkedin,
  FiInstagram,
  FiTwitter,
  FiGlobe,
  FiMail,
} from 'react-icons/fi';
import ParticleBackground from '../ui/ParticleBackground';
import { personalInfo, socialLinks } from '../../data/personalInfo';

const iconMap = {
  linkedin: FiLinkedin,
  instagram: FiInstagram,
  twitter: FiTwitter,
  globe: FiGlobe,
  music: FiGlobe,
  headphones: FiGlobe,
  eye: FiGlobe,
};

const Hero = () => {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background effects */}
      <ParticleBackground />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial opacity-50" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-primary-400 text-sm font-medium">
                Available for Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 font-display"
            >
              <span className="text-white">Hi, I'm </span>
              <br />
              <span className="text-gradient">{personalInfo.fullName}</span>
            </motion.h1>

            {/* Typing animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl text-dark-300 mb-6 h-12 font-light"
            >
              <TypeAnimation
                sequence={[
                  'Computer Science Student',
                  2000,
                  'Musician & Producer',
                  2000,
                  'Community Builder',
                  2000,
                  'Audio Engineer',
                  2000,
                  'The Eighth Fold',
                  2000,
                  'IB Diploma Student',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-gradient-warm"
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-dark-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
            >
              Combining programming, physics and music to develop creative tools, improve accessibility and support fairer opportunities for musicians.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-8"
            >
              <a
                href="#projects"
                onClick={(e) => handleScroll(e, '#projects')}
                className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 transition-all overflow-hidden"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href="#contact"
                onClick={(e) => handleScroll(e, '#contact')}
                className="px-8 py-3.5 rounded-xl border border-dark-600 text-dark-200 hover:text-white hover:border-primary-500/50 hover:bg-primary-500/5 font-semibold transition-all"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              {socialLinks.slice(0, 5).map((link) => {
                const IconComponent = iconMap[link.icon] || FiGlobe;
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-dark-800/50 border border-dark-700 hover:border-primary-500/30 hover:bg-primary-500/10 flex items-center justify-center text-dark-400 hover:text-primary-400 transition-all"
                    title={link.name}
                    aria-label={link.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </motion.a>
                );
              })}
              <a
                href={`mailto:${personalInfo.email || 'aarushsinghminhas@gmail.com'}`}
                className="w-10 h-10 rounded-xl bg-dark-800/50 border border-dark-700 hover:border-primary-500/30 hover:bg-primary-500/10 flex items-center justify-center text-dark-400 hover:text-primary-400 transition-all"
                title="Email"
                aria-label="Email"
              >
                <FiMail className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-full border border-primary-500/10 animate-spin-slow" />
              <div className="absolute -inset-8 rounded-full border border-accent-500/5 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />

              {/* Image container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-primary-500/20 animate-pulse-glow">
                {/* Gradient fallback */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                  <span className="text-6xl sm:text-7xl md:text-8xl font-bold text-white/90 font-display">
                    A
                  </span>
                </div>
                {/* Actual image - will overlay when loaded */}
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.fullName}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-4 top-8 px-3 py-2 rounded-xl glass text-xs font-medium text-white shadow-lg"
              >
                🎸 Musician
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -left-4 bottom-16 px-3 py-2 rounded-xl glass text-xs font-medium text-white shadow-lg"
              >
                💻 Developer
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute right-4 bottom-4 px-3 py-2 rounded-xl glass text-xs font-medium text-white shadow-lg"
              >
                🎓 IBDP Class of 2027
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            onClick={(e) => handleScroll(e, '#about')}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-dark-500 hover:text-primary-400 transition-colors"
          >
            <span className="text-xs font-mono uppercase tracking-widest">Scroll Down</span>
            <FiArrowDown className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;