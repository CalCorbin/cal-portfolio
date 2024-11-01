import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/Card/Card';
import PROJECTS from '../../constants/projects';
import styles from './Landing.module.css';

const Landing = () => (
  <div data-testid="landing-page" className={styles.landing}>
    <header data-testid="header-title" className={styles.header}>
      <h1>cal corbin</h1>
      <div data-testid="about-me" className={styles.jobTitle}>
        software engineer
      </div>
      <div className={styles.social}>
        <a data-testid="cal-email" href="mailto:calcorbin@gmail.com">
          <FontAwesomeIcon size="2x" icon={faEnvelope} />
        </a>
        <a
          data-testid="cal-linkedin"
          target="_self"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/calcorbin/"
        >
          <FontAwesomeIcon size="2x" icon={faLinkedin} />
        </a>
        <a
          data-testid="cal-github"
          target="_self"
          rel="noopener noreferrer"
          href="https://github.com/CalCorbin"
        >
          <FontAwesomeIcon size="2x" icon={faGithub} />
        </a>
      </div>
    </header>
    <h2>projects</h2>
    <div data-testid="projects-section" className={styles.projectsContainer}>
      {PROJECTS.map((project) => (
        <Card key={project.id} data={project} />
      ))}
    </div>
  </div>
);

export default Landing;
