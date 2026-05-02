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
      question: "How long does a website take?",
      answer: "A standard landing page takes about 1-2 weeks. A comprehensive business website can take 2-4 weeks, depending on the complexity, features, and how quickly we finalize the design and content."
    },
    {
      question: "Do you help with hosting and deployment?",
      answer: "Yes! I can handle the entire deployment process. I typically recommend platforms like Vercel or Netlify for fast, secure, and reliable hosting."
    },
    {
      question: "Can I request changes?",
      answer: "Absolutely. My process includes a dedicated design revision phase where we tweak the look and feel until you are 100% satisfied before we move into development."
    },
    {
      question: "Do you build responsive websites?",
      answer: "Every website I build is mobile-first and fully responsive, ensuring it looks perfect and functions flawlessly on smartphones, tablets, and desktops."
    },
    {
      question: "How does payment work?",
      answer: "I require a 50% upfront deposit to begin the project, with the remaining 50% due upon successful launch and hand-off of the website."
    },
    {
      question: "Can you redesign my existing website?",
      answer: "Yes, I specialize in taking outdated websites and completely revamping their design, performance, and user experience using modern technologies."
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
