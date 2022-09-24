import React, { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Firebase, { FirebaseContext } from './components/Firebase';
import ROUTES from './constants/routes';
import Landing from './pages/Landing';
import CatChat from './pages/CatChat';
import Resume from './pages/Resume';
import SpaceX from './pages/SpaceX';
import HexClock from './pages/HexClock';
import MagicNumber from './pages/MagicNumber/MagicNumber';

const App = () => {
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache(),
  });

  const newFireBase = useMemo(() => new Firebase(), []);
  const queryClient = new QueryClient();

  return (
    <FirebaseContext.Provider value={newFireBase}>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={client}>
          <div data-testid="app-container">
            <BrowserRouter>
              <Routes>
                <Route path={ROUTES.RESUME} element={<Resume />} />
                <Route path={ROUTES.SPACEX} element={<SpaceX />} />
                <Route path={ROUTES.CATCHAT} element={<CatChat />} />
                <Route path={ROUTES.HEXCLOCK} element={<HexClock />} />
                <Route path={ROUTES.LANDING} element={<Landing />} />
                <Route path={ROUTES.MAGICNUMBER} element={<MagicNumber />} />
              </Routes>
            </BrowserRouter>
          </div>
        </ApolloProvider>
      </QueryClientProvider>
    </FirebaseContext.Provider>
  );
};

export default App;
