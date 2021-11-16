import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ROUTES from './constants/routes';
import LandingPage from './pages/Landing';
import Resume from './pages/Resume';
import SpaceX from './pages/SpaceX';
import CatChat from './pages/CatChat';

function App() {
  return (
    <div data-testid="app-container">
      <BrowserRouter>
        <Switch>
          <Route path={ROUTES.CATCHAT}>
            <CatChat />
          </Route>
          <Route path={ROUTES.RESUME}>
            <Resume />
          </Route>
          <Route path={ROUTES.SPACEX}>
            <SpaceX />
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
