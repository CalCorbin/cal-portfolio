import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import ROUTES from '../../constants/routes';
import './Landing.css';

function LandingPage() {
  const history = useHistory();

  const routeChange = (route) => history.push(route);

  return (
    <div data-testid="landing-page" className="landing">
      <h1 data-testid="header-title">cal corbin</h1>
      <h2>software engineer</h2>
      <div className="social">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/CalCorbin"
        >
          <FontAwesomeIcon size="2x" icon={faGithub} className="social-icon" />
        </a>
        <a
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
        alt="view my resume/cv"
        onClick={() => routeChange(ROUTES.RESUME)}
      >
        resumé
      </button>
    </div>
  );
}

export default LandingPage;
