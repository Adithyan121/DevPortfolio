import React from 'react';
import { motion } from 'framer-motion';
import styles from './Sections.module.css';

const ServiceCard = ({ title, description, index }) => {
  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardText}>{description}</p>
    </motion.div>
  );
};

export default ServiceCard;
