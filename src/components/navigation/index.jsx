import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import LandingPage from '../../pages/Landing/Landing'
import LANDING_ROUTE from '../../constants/routes'

export default function NavigationRoutes() {
  const Navigation = () => (
    <div data-testid="landing-route">
      <Route path={LANDING_ROUTE} component={LandingPage} />
    </div>
  )

  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  )
}
