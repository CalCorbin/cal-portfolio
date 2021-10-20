import React from 'react';
import './styles.css';

function loadPage(url) {}

export default function NavigationBar() {
  return (
    <div className="__navigation-bar" data-testid="navigation-bar">
      <div className="__button-container">
        <button
          type="button"
          className="__button"
          data-testid="about-button"
          onClick={loadPage('/about')}
        >
          ABOUT
        </button>
        <button
          type="button"
          className="__button"
          data-testid="resume-button"
          onClick={loadPage('/about')}
        >
          RESUME
        </button>
      </div>
    </div>
  );
}
