import React from 'react';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';
import sectionStyles from './Sections.module.css';

import projectsData from '../data/projects.json';

const Projects = () => {
  return (
    <section className={sectionStyles.section} id="projects">
      <div className="container">
        <div className={sectionStyles.contentWrapper}>
          <span className={sectionStyles.badge}>Selected Work</span>
          <h2 className={sectionStyles.title}>Project Demonstrations</h2>
          <p className={sectionStyles.description}>
            A curated selection of technical demonstrations showcasing my ability to build clean, responsive, and interactive web applications.
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id || index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
