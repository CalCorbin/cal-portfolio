import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Card from '../../components/Card';
import ROUTES from '../../constants/routes';
import PROJECTS from '../../constants/projects';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div data-testid="landing-page" className="landing">
      <div data-testid="header-title">
        <h1>cal corbin</h1>
        <h2>software engineer</h2>
        <hr />
      </div>
      <div className="social">
        <a
          data-testid="cal-github"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/CalCorbin"
        >
          <FontAwesomeIcon size="2x" icon={faGithub} className="social-icon" />
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
      </div>
      <button
        type="button"
        className="resume-button"
        aria-label="resume button"
        data-testid="resume-button"
        title="https://unsplash.com/@jrkorpa"
        onClick={() => navigate(ROUTES.RESUME)}
      >
        resumé
      </button>
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
};

export default Landing;
