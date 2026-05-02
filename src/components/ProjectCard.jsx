import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, GitBranch } from 'lucide-react';
import styles from './Projects.module.css';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  
  // Track scroll position relative to this card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Create parallax values based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={cardRef}
      className={styles.projectCard}
      style={{
        y,
        rotateX,
        opacity,
        transformPerspective: 1000
      }}
    >
      <div className={styles.imagePlaceholder} style={{ position: 'relative' }}>
        {project.image ? (
          <motion.img 
            src={project.image} 
            alt={project.title}
            style={{ 
              position: 'absolute',
              top: '-20px',
              left: 0,
              width: '100%', 
              height: 'calc(100% + 40px)', 
              objectFit: 'cover',
              y: useTransform(scrollYProgress, [0, 1], [-20, 20]) 
            }}
            onError={(e) => {
              e.target.style.display = 'none'; 
              e.target.nextSibling.style.display = 'flex'; 
            }}
          />
        ) : null}
        <motion.div 
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [20, -20]),
            display: project.image ? 'none' : 'flex',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className={styles.parallaxImageText}
        >
          {project.title} Preview
        </motion.div>
      </div>
      
      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDesc}>{project.description}</p>
        
        <div className={styles.techStack}>
          {project.tech.map((tech, i) => (
            <span key={i} className={styles.techItem}>{tech}</span>
          ))}
        </div>
        
        <div className={styles.projectLinks}>
          <a href={project.demoUrl} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            <ExternalLink size={16} /> View Demo
          </a>
          <a href={project.codeUrl} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            <GitBranch size={16} /> View Code
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
