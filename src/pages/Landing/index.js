import React from 'react';
import { useHistory } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import './Landing.css';

function LandingPage() {
  const history = useHistory();

  const routeChange = (route) => history.push(route);

  return (
    <div data-testid="landing-page" className="landing">
      <h1 data-testid="header-title">cal corbin</h1>
      <h2>software engineer</h2>
      <button
        className="resume-button"
        type="button"
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
