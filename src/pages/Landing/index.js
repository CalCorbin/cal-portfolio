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
        type="button"
        className="resume-button"
        data-testid="resume-button"
        onClick={() => routeChange(ROUTES.RESUME)}
      >
        <img alt="resume" className="resume-image" />
        <div className="resume-text">resume</div>
      </button>
    </div>
  );
}

export default LandingPage;
