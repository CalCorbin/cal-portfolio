import React from 'react';
import { useHistory } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import './styles.css';

function LandingPage() {
  const history = useHistory();

  const routeChange = (route) => history.push(route);

  return (
    <div className="landing">
      <h1 data-testid="header-title">cal corbin</h1>
      <h2 data-testid="header-title">software engineer</h2>
      <button
        type="button"
        className="resume-button"
        onClick={() => routeChange(ROUTES.RESUME)}
      >
        <image alt="resume" className="resume-image" />
        <div className="resume-text">resume</div>
      </button>
    </div>
  );
}

export default LandingPage;
