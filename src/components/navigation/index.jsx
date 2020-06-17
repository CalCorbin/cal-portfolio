import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from '../../pages/Landing';
import LANDING_ROUTE from '../../constants/routes';

export default function NavigationRoutes() {
  const Navigation = () => (
    <div>
      <Route path={LANDING_ROUTE} component={LandingPage} />
    </div>
  );

  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
}
