import React from 'react';
import ServiceCard from './ServiceCard';
import styles from './Sections.module.css';

const Services = () => {
  const services = [
    {
  title: "Custom Website Development",
  description: "Fast, secure custom websites built from scratch with modern technologies and reliable performance."
},
{
  title: "Landing Page Design",
  description: "High-converting landing pages designed to generate leads, boost sales, and grow your audience."
},
{
  title: "Portfolio Website",
  description: "Premium portfolio websites for creatives and freelancers to showcase work and attract clients."
},
{
  title: "Website Redesign",
  description: "Modern website redesigns that improve UI/UX, performance, and overall user engagement."
},
{
  title: "Responsive UI Development",
  description: "Pixel-perfect React frontends that deliver seamless experiences across all devices."
},
{
  title: "Startup & Small Business Websites",
  description: "Affordable websites for startups and local businesses with transparent pricing."
},
{
  title: "React & MERN Stack Development",
  description: "Scalable full-stack applications built with React, Node.js, and MongoDB."
},
{
  title: "SEO, AEO & Performance Optimization",
  description: "SEO, GEO, and AEO strategies to improve visibility, rankings, and site performance."
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
