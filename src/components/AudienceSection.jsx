import React from 'react';
import { motion } from 'framer-motion';
import { Store, Palette, Rocket } from 'lucide-react';
import styles from './Sections.module.css';

const AudienceSection = () => {
  const audiences = [
    {
      icon: <Store size={28} />,
      title: "Small Businesses",
      desc: "Get a professional online presence that builds trust and helps customers find your services easily."
    },
    {
      icon: <Palette size={28} />,
      title: "Creators & Artists",
      desc: "Showcase your portfolio with a beautiful, custom design that reflects your unique style."
    },
    {
      icon: <Rocket size={28} />,
      title: "Startups",
      desc: "Launch your idea quickly with a modern, scalable landing page that converts visitors into users."
    }
  ];

  return (
    <section className={`${styles.section} ${styles.altBg}`} id="audience">
      <div className="container">
        <div className={styles.contentWrapper}>
          <span className={styles.badge}>Who This Is For</span>
          <h2 className={styles.title}>Designed for Growth</h2>
          <p className={styles.description}>
            Whether you're establishing a brand or scaling your existing business, 
            a fast and modern website is your most valuable digital asset.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {audiences.map((item, index) => (
            <motion.div 
              key={index}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className={styles.iconWrapper}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
