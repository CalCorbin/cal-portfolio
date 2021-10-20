import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import './styles.css';

function LandingHeader() {
  return (
    <div data-testid="landing-image-header">
      <div
        data-testid="header-image"
        alt="hongkong"
        className="__landing-header-image"
      />
      <div data-testid="landing-header-text" className="__landing-header-text">
        cal corbin
        <br />
        <br />
        coder | creator
      </div>
    </div>
  );
}

function LandingNavigationMenu() {
  return <div data-testid="landing-navigation" />;
}

function LandingPage() {
  return (
    <div data-testid="landing-container" className="__landing-container">
      <NavigationBar />
      <LandingHeader />
      <LandingNavigationMenu />
    </div>
  );
}

export default LandingPage;
