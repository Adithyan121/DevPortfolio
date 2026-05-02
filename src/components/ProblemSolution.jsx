import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';
import styles from './Sections.module.css';

const ProblemSolution = () => {
  const problems = [
    "Your website looks outdated and breaks on mobile devices.",
    "Slow loading speeds are driving potential customers away.",
    "You rely on social media, but don't own your digital home.",
    "Off-the-shelf templates limit your brand's unique identity."
  ];

  const solutions = [
    "Modern, responsive designs that look perfect on any screen.",
    "Optimized performance for lightning-fast loading speeds.",
    "A custom digital platform that you fully own and control.",
    "Bespoke development tailored precisely to your brand."
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.contentWrapper}>
          <span className={styles.badge}>The Challenge</span>
          <h2 className={styles.title}>Why Settle for Average?</h2>
        </div>

        <div className={styles.psGrid}>
          <motion.div 
            className={styles.problemBox}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className={styles.psTitle}>
              <XCircle size={28} /> The Problem
            </h3>
            <ul className={styles.list}>
              {problems.map((item, i) => (
                <li key={i} className={styles.listItem}>
                  <XCircle size={20} className={styles.listItemIcon} color="#f87171" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className={styles.solutionBox}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className={styles.psTitle}>
              <CheckCircle size={28} /> The Solution
            </h3>
            <ul className={styles.list}>
              {solutions.map((item, i) => (
                <li key={i} className={styles.listItem}>
                  <CheckCircle size={20} className={styles.listItemIcon} color="#4ade80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
