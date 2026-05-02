import React from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css'; // Reusing formContainer styles for the card
import sectionStyles from './Sections.module.css';

const PrivacyPolicy = () => {
  return (
    <section className={`${sectionStyles.section}`}>
      <div className="container">
        <motion.div 
          className={styles.formContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}
        >
          <span className={sectionStyles.badge} style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Legal</span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text)' }}>Privacy Policy</h1>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '1.5rem' }}>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem' }}>1. Introduction</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Welcome to Adithyan G's freelance web development portfolio. I am committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact me.
            </p>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem' }}>2. Information I Collect</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              The personal information that I collect depends on the context of your interactions with me and the Website. The personal information I collect may include the following:
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1.5rem' }}>
              <li><strong>Names;</strong> provided when you fill out a contact form.</li>
              <li><strong>Email Addresses;</strong> provided when you fill out a contact form.</li>
              <li><strong>Project Details;</strong> including budget ranges and project descriptions you voluntarily provide.</li>
            </ul>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem' }}>3. How I Use Your Information</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              I use personal information collected via my Website for a variety of business purposes described below. I process your personal information for these purposes in reliance on my legitimate business interests:
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1.5rem' }}>
              <li>To respond to your inquiries and offer support to you.</li>
              <li>To fulfill and manage your project requests.</li>
              <li>To communicate with you regarding your ongoing projects.</li>
            </ul>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem' }}>4. Will Your Information Be Shared?</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              I only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. I do not sell, rent, or trade your personal information with third parties.
            </p>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem' }}>5. Contact Me</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              If you have questions or comments about this notice, you may email me at the email address provided in the Contact section of this website.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
