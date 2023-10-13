import React, { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ROUTES from './constants/routes';
import Landing from './pages/Landing/Landing';
import CatChat from './pages/CatChat/CatChat';
import SpaceX from './pages/SpaceX/SpaceX';
import HexClock from './pages/HexClock/HexClock';
import MagicNumber from './pages/MagicNumber/MagicNumber';
import ChicagoArt from './pages/ChicagoArt/ChicagoArt';
import HomeScreen from './components/TicTacToe/HomeScreen';
import MineSweeper from './components/MineSweeper/MineSweeper';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Firebase, { FirebaseContext } from './components/Firebase';

const App = () => {
  const client = new ApolloClient({
    uri: 'https://main--spacex-l4uc6p.apollographos.net/graphql',
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
                <Route path={ROUTES.SPACEX} element={<SpaceX />} />
                <Route path={ROUTES.CATCHAT} element={<CatChat />} />
                <Route path={ROUTES.HEXCLOCK} element={<HexClock />} />
                <Route path={ROUTES.LANDING} element={<Landing />} />
                <Route path={ROUTES.MAGICNUMBER} element={<MagicNumber />} />
                <Route path={ROUTES.CHICAGOART} element={<ChicagoArt />} />
                <Route path={ROUTES.TICTACTOE} element={<HomeScreen />} />
                <Route path={ROUTES.MINESWEEPER} element={<MineSweeper />} />
              </Routes>
            </BrowserRouter>
          </div>
        </ApolloProvider>
      </QueryClientProvider>
    </FirebaseContext.Provider>
  );
};

export default App;
