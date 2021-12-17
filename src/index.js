import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Firebase, { FirebaseContext } from './components/Firebase';
import App from './App';
import './index.css';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache(),
});

const fireBase = useMemo(() => new Firebase(), []);

ReactDOM.render(
  <FirebaseContext.Provider value={fireBase}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
