import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Firebase, { FirebaseContext } from './components/Firebase';
import App from './App';
import './index.css';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
