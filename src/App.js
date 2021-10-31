import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ROUTES from './constants/routes';
import LandingPage from './pages/Landing';
import Index from './pages/Resume';

function App() {
  return (
    <div data-testid="app-container">
      <BrowserRouter>
        <Switch>
          <Route path={ROUTES.RESUME}>
            <Index />
          </Route>
          <Route path={ROUTES.LANDING}>
            <LandingPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
