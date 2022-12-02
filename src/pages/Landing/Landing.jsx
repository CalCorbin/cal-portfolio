import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/Card';
import PROJECTS from '../../constants/projects';
import './Landing.css';

const Landing = () => (
  <div data-testid="landing-page" className="landing">
    <div data-testid="header-title" className="header">
      <div className="my-name">cal corbin</div>
      <div data-testid="about-me" className="about-me">
        I am a fullstack software engineer with proven experience in Javascript,
        Python, and modern Quality Assurance principles. I have a college
        background in classical music and geography, and I bring that passion
        for elegance and detail to every aspect of my work. If you are
        interested in a custom software solution, getting a copy of my resume,
        or just meeting up for coffee, then reach out to me through email or
        LinkedIn.
      </div>
      <div className="social">
        <a data-testid="cal-email" href="mailto:calcorbin@gmail.com">
          <FontAwesomeIcon
            size="2x"
            icon={faEnvelope}
            className="social-icon"
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
            className="social-icon"
          />
        </a>
        <a
          data-testid="cal-github"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/CalCorbin"
        >
          <FontAwesomeIcon size="2x" icon={faGithub} className="social-icon" />
        </a>
      </div>
    </div>

    <div data-testid="projects-section">
      <div className="section-header">projects</div>
      <hr />
      <div className="projects-container">
        {PROJECTS.map((project) => (
          <Card key={project.id} data={project} />
        ))}
      </div>
    </div>
  </div>
);

export default Landing;
