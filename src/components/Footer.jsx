import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <a href="/" className={styles.logo}>
              Dev<span>Portfolio</span>
            </a>
            <p className={styles.tagline}>
              Building fast, modern, and beautiful websites for small businesses and creators.
            </p>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.linkGroup}>
              <h4>Navigation</h4>
              <a href="/#about">About</a>
              <a href="/#services">Services</a>
              <a href="/#projects">Work</a>
              <a href="/#process">Process</a>
              <a href="/#pricing">Pricing</a>
            </div>
            
            <div className={styles.linkGroup}>
              <h4>Connect</h4>
              <a href="https://adithyan-phi.vercel.app/" target="_blank" rel="noopener noreferrer">Portfolio</a>
              <a href="https://dev.to/adithyan_g_6f3e606905eed7" target="_blank" rel="noopener noreferrer">Dev.to</a>
              <a href="https://medium.com/@adithyang24" target="_blank" rel="noopener noreferrer">Medium</a>
              <a href="https://www.linkedin.com/in/adithyan-g-b9785b196/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.instagram.com/mr._a.d.i__/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://github.com/Adithyan121" target="_blank" rel="noopener noreferrer">GitHub</a>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} DevPortfolio. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
