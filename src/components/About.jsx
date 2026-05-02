import React from 'react';
import { motion } from 'framer-motion';
import styles from './Sections.module.css';

const About = () => {
  return (
    <section className={styles.section} id="about">
      <div className="container">
        <div className={styles.contentWrapper}>
          <span className={styles.badge}>About Me</span>
          <h2 className={styles.title}>Passionate About Code & Design</h2>
          
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
    Hi, I'm Adithyan G, a freelance web developer specializing in modern frontend technologies like MERN stack. 
    You can check out my portfolio here:{" "}
    <a 
      href="https://adithyan-phi.vercel.app/" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ color: '#4da6ff', textDecoration: 'underline' }}
    >
      View Portfolio
    </a>
  </p>

  <p className={styles.description} style={{ marginBottom: '1.5rem' }}>
    My goal is to bring agency-level quality to small businesses and creators. I believe that a website shouldn't just be a digital flyer; it should be an interactive experience that builds trust and drives results.
  </p>

  <p className={styles.description}>
    When you work with me, you're getting a dedicated partner who cares about your project's success as much as you do. Let's build something great together.
  </p>
</motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
