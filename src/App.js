import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ROUTES from './constants/routes';
import LandingPage from './pages/Landing/Landing';
import Resume from './pages/Resume/Resume';

export default function App() {
  return (
    <div data-testid="app-container">
      <BrowserRouter>
        <Route path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.RESUME} component={Resume} />
      </BrowserRouter>
    </div>
  );
}
