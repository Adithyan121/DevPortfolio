import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero} id="home">
      <div className={`container ${styles.heroContainer}`}>
        
        {/* Left Side: Text and CTA */}
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.badge}>
            React Developer | MERN Stack | Kerala, India
          </span>
          <h1 className={styles.headline}>
            Affordable <span className={styles.textPurple}>React Developer</span> & MERN Stack Expert in Kerala
          </h1>
          <p className={styles.subheadline}>
            Freelance web developer specializing in custom website development for startups, small businesses, restaurants, gyms & real estate. Full stack solutions using React, Node.js, and MongoDB at budget-friendly rates.
          </p>
          
          <div className={styles.actions}>
            <a href="/contact" className="btn btn-primary">
              Get a Free Quote
            </a>
            <a href="#projects" className="btn btn-secondary">
              View My Work <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>

        {/* Right Side: Empty for Background Parallax */}
        <div className={styles.showcaseWrapper}>
           {/* Completely removed the heavy 3D PC Showcase so the background shines */}
        </div>

      </div>
    </section>
  );
};

export default Hero;
