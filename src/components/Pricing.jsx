import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import styles from './Pricing.module.css';
import sectionStyles from './Sections.module.css';

const Pricing = () => {
  const plans = [
    {
      name: "Affordable Landing Page",
      price: "₹5,000",
      features: ["Single Page Responsive Design", "Contact Form Integration", "Basic SEO Setup", "1 Week Delivery", "Ideal for startups & freelancers"],
      isPopular: false
    },
    {
      name: "Small Business Website",
      price: "₹10,000",
      features: ["Up to 5 Pages", "Custom UI/UX Design", "Performance Optimization", "Content Management System", "2-3 Weeks Delivery", "Perfect for restaurants, gyms & real estate"],
      isPopular: true
    },
    {
      name: "Custom React Web App",
      price: "Custom Quote",
      features: ["Unlimited Pages & Features", "MERN Stack Development", "Complex Animations & Interactions", "Premium Support", "Timeline TBD", "For enterprise & complex projects"],
      isPopular: false
    }
  ];

  return (
    <section className={`${sectionStyles.section} ${sectionStyles.altBg}`} id="pricing">
      <div className="container">
        <div className={sectionStyles.contentWrapper}>
          <span className={sectionStyles.badge}>Investment</span>
          <h2 className={sectionStyles.title}>Affordable Website Development Pricing</h2>
          <p className={sectionStyles.description}>
            Budget-friendly rates for React and MERN stack development. Transparent pricing for startups, small businesses, and freelancers in Kerala and India.
          </p>
        </div>

        <div className={styles.pricingGrid}>
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`${styles.pricingCard} ${plan.isPopular ? styles.popular : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {plan.isPopular && <div className={styles.popularBadge}>Most Popular</div>}
              <h3 className={styles.planName}>{plan.name}</h3>
              <div className={styles.planPrice}>
                {plan.price !== "Custom Quote" && <span className={styles.startingAt}>Starting from </span>}
                {plan.price}
              </div>
              
              <ul className={styles.featureList}>
                {plan.features.map((feature, i) => (
                  <li key={i} className={styles.featureItem}>
                    <Check size={18} className={styles.checkIcon} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a href="/contact" className={`btn ${plan.isPopular ? 'btn-primary' : 'btn-secondary'} ${styles.btnFull}`}>
                Get Started
              </a>
            </motion.div>
          ))}
        </div>

        <p className={styles.pricingNote}>
          * Rates applicable for Kerala and India. Final pricing depends on project requirements, pages, features, and timeline. Contact for affordable custom quotes.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
