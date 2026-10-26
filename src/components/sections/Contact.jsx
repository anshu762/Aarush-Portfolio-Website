import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiInstagram,
  FiTwitter,
  FiGlobe,
  FiExternalLink,
} from 'react-icons/fi';
import SectionHeading from '../ui/SectionHeading';
import { contactInfo, socialLinks } from '../../data/personalInfo';

const iconMap = {
  linkedin: FiLinkedin,
  instagram: FiInstagram,
  twitter: FiTwitter,
  globe: FiGlobe,
  music: FiGlobe,
  headphones: FiGlobe,
  eye: FiGlobe,
};

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Only show the first 3 social links
  const visibleSocialLinks = socialLinks.slice(0, 3);

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a project in mind, want to collaborate, or just want to connect? Reach out via email or follow me on social media."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-12">
          
          {/* ═══ Left Column: Contact Details ═══ */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-white flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-primary-500 rounded-full"></span>
              Contact Details
            </h3>
            
            <div className="space-y-4">
              {[
                {
                  icon: <FiMail className="w-6 h-6" />,
                  label: 'Email Address',
                  value: contactInfo.email,
                  href: `mailto:${contactInfo.email}`,
                },
                {
                  icon: <FiPhone className="w-6 h-6" />,
                  label: 'Phone Number',
                  value: contactInfo.phone,
                  href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
                },
                {
                  icon: <FiMapPin className="w-6 h-6" />,
                  label: 'Location',
                  value: contactInfo.location,
                },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="group"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center gap-5 p-5 rounded-2xl glass hover:border-primary-500/30 hover:bg-white/[0.04] transition-all duration-300"
                    >
                      <div className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 group-hover:bg-primary-500/20 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-dark-400 uppercase tracking-wider font-semibold mb-1">
                          {item.label}
                        </p>
                        <p className="text-white text-base md:text-lg font-medium group-hover:text-primary-300 transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-5 p-5 rounded-2xl glass transition-all duration-300">
                      <div className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-dark-400 uppercase tracking-wider font-semibold mb-1">
                          {item.label}
                        </p>
                        <p className="text-white text-base md:text-lg font-medium">{item.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ═══ Right Column: Social Profiles (first 3 only) ═══ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-white flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-accent-500 rounded-full"></span>
              Social Profiles
            </h3>
            
            <div className="grid gap-4">
              {visibleSocialLinks.map((link, index) => {
                const IconComponent = iconMap[link.icon] || FiGlobe;
                return (
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-5 p-5 rounded-2xl glass hover:border-accent-500/30 hover:bg-white/[0.04] transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-dark-800 group-hover:bg-accent-500/10 flex items-center justify-center text-dark-300 group-hover:text-accent-400 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base md:text-lg font-medium text-dark-100 group-hover:text-white transition-colors truncate">
                        {link.name}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-accent-500/20 transition-colors">
                      <FiExternalLink className="w-4 h-4 text-dark-400 group-hover:text-accent-300 transition-colors flex-shrink-0" />
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;