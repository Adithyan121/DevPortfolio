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
             I Build Fast, Modern <span className={styles.textPurple}>Web Applications</span> That Help You Grow
          </h1>
          <p className={styles.subheadline}>
            Freelance web developer specializing in custom website development for startups, small businesses, restaurants, gyms & real estate. I build full stack solutions using React, Node.js, and MongoDB that achieve <strong>100/100 Lighthouse performance scores</strong> and <strong>load in under 1 second</strong>, driving higher conversions at budget-friendly rates.
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
