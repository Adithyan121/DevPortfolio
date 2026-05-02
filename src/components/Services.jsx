import React from 'react';
import ServiceCard from './ServiceCard';
import styles from './Sections.module.css';

const Services = () => {
  const services = [
    {
      title: "Custom Website Development",
      description: "Fast, reliable, and secure websites built from scratch using modern web technologies to fit your unique needs."
    },
    {
      title: "Landing Page Design",
      description: "High-converting landing pages designed to capture leads, sell products, and grow your audience."
    },
    {
      title: "Portfolio Website",
      description: "Beautiful digital portfolios to showcase your work, tailored specifically for creatives and freelancers."
    },
    {
      title: "Website Redesign",
      description: "Breathe new life into your old website with a modern aesthetic, improved user experience, and better performance."
    },
    {
      title: "Responsive UI Development",
      description: "Pixel-perfect frontend development ensuring your site looks stunning on mobile, tablet, and desktop."
    },
    {
      title: "Basic SEO & Performance Optimization",
      description: "Implementation of best practices to ensure your site ranks better on Google and loads in milliseconds."
    }
  ];

  return (
    <section className={`${styles.section} ${styles.altBg}`} id="services">
      <div className="container">
        <div className={styles.contentWrapper}>
          <span className={styles.badge}>Services</span>
          <h2 className={styles.title}>What I Can Do For You</h2>
          <p className={styles.description}>
            Comprehensive web solutions focused on modern design, robust performance, and achieving your business goals.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              index={index} 
              title={service.title} 
              description={service.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
