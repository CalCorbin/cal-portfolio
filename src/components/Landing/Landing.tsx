import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/Card/Card';
import PROJECTS from '../../constants/projects';
import styles from './Landing.module.css';

const Landing = () => (
  <div data-testid="landing-page" className={styles.landing}>
    <div data-testid="header-title" className={styles.header}>
      <div className={styles.myName}>cal corbin</div>
      <div data-testid="about-me" className={styles.jobTitle}>
        software engineer
      </div>
      <div className={styles.social}>
        <a data-testid="cal-email" href="mailto:calcorbin@gmail.com">
          <FontAwesomeIcon
            size="2x"
            icon={faEnvelope}
            className={styles.socialIcon}
          />
        </a>
        <a
          data-testid="cal-linkedin"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/calcorbin/"
        >
          <FontAwesomeIcon
            size="2x"
            icon={faLinkedin}
            className={styles.socialIcon}
          />
        </a>
        <a
          data-testid="cal-github"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/CalCorbin"
        >
          <FontAwesomeIcon
            size="2x"
            icon={faGithub}
            className={styles.socialIcon}
          />
        </a>
      </div>
    </div>

    <h2 className={styles.projectHeader}>projects</h2>
    <div data-testid="projects-section" className={styles.projectsContainer}>
      {PROJECTS.map((project) => (
        <Card key={project.id} data={project} />
      ))}
    </div>
  </div>
);

export default Landing;
