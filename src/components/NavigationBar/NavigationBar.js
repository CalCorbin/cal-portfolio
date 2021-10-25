import React from 'react';
import './styles.css';

function NavigationBar() {
  return (
    <div className="__navigation-bar" data-testid="navigation-bar">
      <div className="__hamburger">
        <div className="__menu-dash" />
        <div className="__menu-dash" />
        <div className="__menu-dash" />
      </div>
      <button type="button" className="__button" data-testid="resume-button">
        RESUME
      </button>
    </div>
  );
}

export default NavigationBar;
