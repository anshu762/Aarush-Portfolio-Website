import React from 'react';
import { motion } from 'framer-motion';
import {
  FiLinkedin,
  FiInstagram,
  FiTwitter,
  FiGlobe,
  FiMail,
  FiPhone,
  FiMapPin,
  FiHeart,
} from 'react-icons/fi';
import { socialLinks, contactInfo } from '../../data/personalInfo';

const iconMap = {
  linkedin: FiLinkedin,
  instagram: FiInstagram,
  twitter: FiTwitter,
  globe: FiGlobe,
  music: FiGlobe,
  headphones: FiGlobe,
  eye: FiGlobe,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-dark-950 border-t border-dark-800">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/20 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="inline-flex items-center gap-2 mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg font-display">A</span>
              </div>
              <div>
                <span className="text-white font-semibold">Aarush Singh Minhas</span>
              </div>
            </a>
            <p className="text-dark-400 text-sm leading-relaxed mb-6">
              Combining computer science, music and community projects to build creative tools and support accessibility.
            </p>
            {/* Social links */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.slice(0, 4).map((link) => {
                const IconComponent = iconMap[link.icon] || FiGlobe;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-dark-800 hover:bg-primary-500/20 border border-dark-700 hover:border-primary-500/30 flex items-center justify-center text-dark-400 hover:text-primary-400 transition-all"
                    title={link.name}
                    aria-label={link.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navigate
            </h3>
            <ul className="space-y-2">
              {['About', 'Skills', 'Education', 'Projects', 'Achievements', 'Contact'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                      className="text-dark-400 hover:text-primary-400 text-sm transition-colors inline-flex items-center gap-1"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Key Projects
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Unheard Amritsar', url: 'https://unheardamritsar.life/' },
                { name: 'DeafAssist', url: 'https://deafassist-research.netlify.app/' },
                { name: 'The Eighth Fold', url: '#projects' },
                { name: 'Navbhoomi', url: 'https://navbhoomi-field-review.netlify.app/' },
                { name: 'PMRS', url: 'https://pmrs.in/' },
              ].map((project) => (
                <li key={project.name}>
                  <a
                    href={project.url}
                    target={project.url.startsWith('#') ? '_self' : '_blank'}
                    rel={project.url.startsWith('#') ? '' : 'noopener noreferrer'}
                    onClick={
                      project.url.startsWith('#')
                        ? (e) => handleNavClick(e, project.url)
                        : undefined
                    }
                    className="text-dark-400 hover:text-primary-400 text-sm transition-colors"
                  >
                    {project.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 text-dark-400 hover:text-primary-400 text-sm transition-colors"
                >
                  <FiMail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{contactInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-dark-400 hover:text-primary-400 text-sm transition-colors"
                >
                  <FiPhone className="w-4 h-4 flex-shrink-0" />
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-dark-400 text-sm">
                <FiMapPin className="w-4 h-4 flex-shrink-0" />
                {contactInfo.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-sm flex items-center gap-1">
            © {currentYear} Aarush Singh Minhas. Made with
            <FiHeart className="w-3.5 h-3.5 text-red-500 inline" />
          </p>
          <p className="text-dark-600 text-xs">
            Amritsar, Punjab, India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;