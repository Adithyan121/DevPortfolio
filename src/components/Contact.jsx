import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';
import sectionStyles from './Sections.module.css';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Load credentials from .env file
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      project_type: formData.projectType,
      budget: formData.budget,
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert("Thanks for reaching out! I'll get back to you soon.");
        setFormData({ name: '', email: '', projectType: '', budget: '', message: '' });
      })
      .catch((error) => {
        console.error('FAILED...', error);
        alert("Failed to send message. Please try again or email directly.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className={`${sectionStyles.section} ${sectionStyles.altBg}`} id="contact">
      <div className="container">
        <div className={styles.contactGrid}>
          <motion.div 
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={sectionStyles.badge}>Let's Talk</span>
            <h2 className={styles.title}>Ready to Start Your Project?</h2>
            <p className={styles.desc}>
              Fill out the form and I'll get back to you within 24 hours. Let's build something amazing together.
            </p>
            
            <div className={styles.directContact}>
              <a href="mailto:hello@example.com" className={styles.contactLink}>
                <Mail size={20} className={styles.contactIcon} />
                adithyang24@gmail.com
              </a>
              <a href="https://wa.link/p8v9xj" className={styles.contactLink}>
                <MessageSquare size={20} className={styles.contactIcon} />
                Chat on WhatsApp
              </a>
            </div>
            
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>LinkedIn</a>
              <a href="#" className={styles.socialLink}>Instagram</a>
              <a href="#" className={styles.socialLink}>GitHub</a>
            </div>
          </motion.div>

          <motion.div 
            className={styles.formContainer}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  placeholder="John Doe"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  placeholder="john@example.com"
                />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="projectType">Project Type</label>
                  <select 
                    id="projectType" 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select type</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Business Website">Business Website</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="Redesign">Website Redesign</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="budget">Budget Range</label>
                  <select 
                    id="budget" 
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select budget</option>
                    <option value="Under 10k">Under ₹10,000</option>
                    <option value="10k - 20k">₹10,000 - ₹20,000</option>
                    <option value="20k - 50k">₹20,000 - ₹50,000</option>
                    <option value="50k+">₹50,000+</option>
                  </select>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message">Project Details</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your goals, timeframe, and any specific requirements..."
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
