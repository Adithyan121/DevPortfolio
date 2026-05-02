import React from 'react';
import { motion } from 'framer-motion';
import styles from './Sections.module.css';

const About = () => {
  return (
    <section className={styles.section} id="about">
      <div className="container">
        <div className={styles.contentWrapper}>
          <span className={styles.badge}>About Me</span>
          <h2 className={styles.title}>React Developer & MERN Stack Expert from Kerala</h2>
          
          <motion.div 
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  style={{ 
    textAlign: 'left', 
    marginTop: '3rem', 
    backgroundColor: 'rgba(17, 17, 17, 0.6)', 
    backdropFilter: 'blur(10px)', 
    padding: '3rem', 
    borderRadius: 'var(--radius)', 
    border: '1px solid var(--border)' 
  }}
>
  <p className={styles.description} style={{ marginBottom: '1.5rem' }}>
    I'm Adithyan G, a freelance React and MERN stack developer based in Kerala, India. I specialize in building affordable, high-quality websites and web applications for startups, small businesses, restaurants, gyms, real estate agencies, and freelancers.
  </p>

  <p className={styles.description} style={{ marginBottom: '1.5rem' }}>
    With expertise in React, Node.js, MongoDB, and Express.js, I create fast, modern, and responsive websites that deliver results. My goal is to bring agency-level quality to small businesses and creators at budget-friendly rates. I believe that a website shouldn't just be a digital flyer; it should be an interactive experience that builds trust and drives business growth.
  </p>

  <p className={styles.description}>
    When you hire me as your freelance web developer, you're getting a dedicated partner who cares about your project's success. Whether you need a portfolio website, business website, or custom web application, let's build something great together.
  </p>
</motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
