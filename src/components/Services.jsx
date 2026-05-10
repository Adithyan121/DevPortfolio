import React from 'react';
import ServiceCard from './ServiceCard';
import styles from './Sections.module.css';

const Services = () => {
  const services = [
    {
      title: "Custom Website Development",
      description: "Fast, reliable, and secure websites built from scratch. I guarantee 99.9% uptime and sub-second load times using modern web technologies."
    },
    {
      title: "Landing Page Design",
      description: "High-converting landing pages designed to capture leads, sell products, and grow your audience with up to 30% improved conversion rates."
    },
    {
      title: "Portfolio Website",
      description: "Beautiful digital portfolios tailored for creatives and freelancers. Stand out online and land clients with a premium 100/100 Lighthouse score design."
    },
    {
      title: "Website Redesign",
      description: "Breathe new life into your old website. I completely revamp the UI/UX design and improve page load speeds by 40% on average."
    },
    {
      title: "Responsive UI Development",
      description: "Pixel-perfect frontend development using React. Ensuring your site is 100% mobile-friendly and looks stunning on smartphones, tablets, and desktops."
    },
    {
      title: "Startup & Small Business Websites",
      description: "Affordable website solutions tailored for startups, small businesses, restaurants, gyms, and real estate agencies in Kerala with transparent pricing."
    },
    {
      title: "React & MERN Stack Development",
      description: "Scalable full stack web applications using React, Node.js, and MongoDB. Secure, robust data handling for comprehensive business needs."
    },
    {
      title: "SEO, AEO & Performance Optimization",
      description: "Implementation of Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) to ensure your site is ranked accurately by AI search engines."
    }
  ];

  return (
    <section className={`${styles.section} ${styles.altBg}`} id="services">
      <div className="container">
        <div className={styles.contentWrapper}>
          <span className={styles.badge}>Services</span>
          <h2 className={styles.title}>Affordable Web Development Solutions</h2>
          <p className={styles.description}>
            React and MERN stack development for startups, small businesses, restaurants, gyms, and real estate. High-quality websites at budget-friendly rates in Kerala and India.
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
