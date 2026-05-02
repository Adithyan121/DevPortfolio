import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Layout, Code2, Rocket } from 'lucide-react';
import styles from './Process.module.css';
import sectionStyles from './Sections.module.css';

const Process = () => {
  const steps = [
    {
      icon: <Search size={24} />,
      title: "1. Discovery",
      desc: "We discuss your goals, target audience, and functional requirements."
    },
    {
      icon: <PenTool size={24} />,
      title: "2. Planning",
      desc: "Creating a roadmap, sitemap, and architecture for the application."
    },
    {
      icon: <Layout size={24} />,
      title: "3. Design",
      desc: "Crafting a custom, modern UI that aligns perfectly with your brand identity."
    },
    {
      icon: <Code2 size={24} />,
      title: "4. Development",
      desc: "Writing clean, optimized, and responsive code using React and modern tools."
    },
    {
      icon: <Rocket size={24} />,
      title: "5. Launch",
      desc: "Testing, deployment, and handing over your brand new high-performance website."
    }
  ];

  return (
    <section className={`${sectionStyles.section} ${sectionStyles.altBg}`} id="process">
      <div className="container">
        <div className={sectionStyles.contentWrapper}>
          <span className={sectionStyles.badge}>How I Work</span>
          <h2 className={sectionStyles.title}>A Transparent Process</h2>
          <p className={sectionStyles.description}>
            From the initial idea to the final launch, my process is designed to be clear, collaborative, and focused on delivering results.
          </p>
        </div>

        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className={styles.stepCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className={styles.iconContainer}>
                {step.icon}
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
