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
  <div style={{ marginBottom: '2rem' }}>
    <h3 style={{ color: 'var(--text)', fontSize: '1.5rem', marginBottom: '1rem' }}>Who am I?</h3>
    <p className={styles.description} style={{ marginBottom: '1.5rem' }}>
      <strong>I'm Adithyan G, a freelance React and MERN stack developer based in Kerala, India.</strong> I specialize in building affordable, high-quality websites and web applications for startups, small businesses, restaurants, gyms, real estate agencies, and freelancers.
    </p>
  </div>

  <div style={{ marginBottom: '2rem' }}>
    <h3 style={{ color: 'var(--text)', fontSize: '1.5rem', marginBottom: '1rem' }}>Why hire me as your web developer?</h3>
    <ul style={{ color: 'var(--text-muted)', listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
      <li><strong>Full Stack Expertise:</strong> Proficient in React, Node.js, MongoDB, and Express.js to deliver scalable end-to-end web solutions.</li>
      <li><strong>Performance Focused:</strong> I build fast, modern, and responsive websites targeting 100/100 Lighthouse scores and sub-second load times.</li>
      <li><strong>Budget-Friendly:</strong> Bringing agency-level quality to small businesses and creators without the massive agency price tag.</li>
      <li><strong>Dedicated Partnership:</strong> You get a single, reliable point of contact focused on delivering an interactive experience that builds trust and drives business growth.</li>
    </ul>
  </div>

  <p className={styles.description}>
    Whether you need a portfolio website, business website, or custom web application, let's build something great together.
  </p>
</motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
