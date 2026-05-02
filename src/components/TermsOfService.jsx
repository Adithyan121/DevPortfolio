import React from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css'; // Reusing formContainer styles for the card
import sectionStyles from './Sections.module.css';

const TermsOfService = () => {
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
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text)' }}>Terms of Service</h1>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '1.5rem' }}>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem' }}>1. Agreement to Terms</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              By accessing this website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem' }}>2. Intellectual Property Rights</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Unless otherwise indicated, the Site is my proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein are owned or controlled by me.
            </p>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem' }}>3. Freelance Services</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Any request for freelance web development services made through this website does not constitute a binding contract until a separate, formal agreement is signed by both parties outlining the specific scope, timeline, and budget of the project.
            </p>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem' }}>4. Disclaimer</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              The materials on this website are provided on an 'as is' basis. I make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem' }}>5. Limitations</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              In no event shall I or my suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.
            </p>

            <h3 style={{ color: 'var(--text)', marginTop: '2rem', marginBottom: '1rem' }}>6. Contact Information</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              If you have any questions about these Terms, please contact me through the contact form provided on this website.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsOfService;
