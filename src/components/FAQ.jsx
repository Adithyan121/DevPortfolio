import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './FAQ.module.css';
import sectionStyles from './Sections.module.css';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
      <button 
        className={styles.questionBtn} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.questionText}>{question}</span>
        <ChevronDown 
          size={20} 
          className={styles.chevron} 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.answerContainer}
          >
            <div className={styles.answerContent}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How long does a website take to build?",
      answer: (
        <>
          <p><strong>A standard website takes 1 to 2 weeks to build.</strong> A more complex web application or business website can take 2 to 4 weeks.</p>
          <ul style={{ margin: '10px 0 10px 20px', listStyleType: 'disc' }}>
            <li>Landing Pages: 1-2 weeks</li>
            <li>Business Websites: 2-4 weeks</li>
            <li>Custom Web Apps: 4+ weeks</li>
          </ul>
          <p>The timeline depends on the complexity, specific features required, and how quickly we finalize the design.</p>
        </>
      )
    },
    {
      question: "Do you help with website hosting and deployment?",
      answer: (
        <>
          <p><strong>Yes, I handle the entire website hosting and deployment process.</strong> I typically recommend fast, secure cloud platforms like <strong>Vercel</strong> or <strong>Netlify</strong> for high performance (99.9% uptime).</p>
          <p>I will configure your domain name, SSL certificates, and ensure your site is live and accessible globally.</p>
        </>
      )
    },
    {
      question: "Can I request changes during the web development process?",
      answer: (
        <>
          <p><strong>Absolutely. I offer a dedicated design revision phase</strong> where we tweak the look and feel until you are 100% satisfied.</p>
          <p>I ensure transparent communication throughout the project, meaning you are involved in every step from wireframing to the final code development.</p>
        </>
      )
    },
    {
      question: "Are the websites you build mobile-friendly and responsive?",
      answer: (
        <>
          <p><strong>Yes, every website I build is 100% mobile-friendly and responsive.</strong></p>
          <p>I use a mobile-first approach, ensuring your web application looks perfect and functions flawlessly across all devices, including smartphones, tablets, and desktop computers.</p>
        </>
      )
    },
    {
      question: "What is your pricing and how does payment work?",
      answer: (
        <>
          <p><strong>I require a 50% upfront deposit to start the project.</strong> The remaining 50% is due upon successful launch and project hand-off.</p>
          <p>My pricing is budget-friendly and tailored to startups and small businesses. We will agree on a transparent, fixed price during the discovery phase with no hidden fees.</p>
        </>
      )
    },
    {
      question: "Can you redesign or update my existing website?",
      answer: (
        <>
          <p><strong>Yes, I specialize in website redesigns and performance optimization.</strong></p>
          <p>If you have an outdated site, I will completely revamp the UI/UX design, improve page load speeds (targeting under 1 second), and upgrade the technology stack using modern React and Node.js.</p>
        </>
      )
    }
  ];

  return (
    <section className={sectionStyles.section} id="faq">
      <div className="container">
        <div className={sectionStyles.contentWrapper}>
          <span className={sectionStyles.badge}>FAQ</span>
          <h2 className={sectionStyles.title}>Common Questions</h2>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
