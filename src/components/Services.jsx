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
      description: "Beautiful digital portfolios for creatives and freelancers. Perfect for showcasing your work and landing clients."
    },
    {
      title: "Website Redesign",
      description: "Breathe new life into your old website with a modern aesthetic, improved user experience, and better performance."
    },
    {
      title: "Responsive UI Development",
      description: "Pixel-perfect frontend development using React. Ensuring your site looks stunning on mobile, tablet, and desktop."
    },
    {
      title: "Startup & Small Business Websites",
      description: "Affordable website solutions for startups, small businesses, restaurants, gyms, and real estate agencies in Kerala."
    },
    {
      title: "React & MERN Stack Development",
      description: "Full stack development using React, Node.js, and MongoDB. Custom web applications for your business needs."
    },
    {
      title: "SEO & Performance Optimization",
      description: "Implementation of best practices to ensure your site ranks better on Google and loads in milliseconds."
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
