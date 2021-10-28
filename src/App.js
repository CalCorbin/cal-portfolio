import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ROUTES from './constants/routes';
import LandingPage from './pages/Landing/Landing';
import Resume from './pages/Resume/Resume';

export default function App() {
  return (
    <div data-testid="app-container">
      <BrowserRouter>
        <Switch>
          <Route path={ROUTES.RESUME}>
            <Resume />
          </Route>
          <Route path={ROUTES.LANDING}>
            <LandingPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
