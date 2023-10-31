import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Firebase, { FirebaseContext } from '../components/Firebase';
import '../globals.css';
import { useMemo } from 'react';

const App = ({ Component, pageProps }: AppProps) => {
  const newFireBase = useMemo(() => new Firebase(), []);
  const apolloClient = new ApolloClient({
    uri: 'https://main--spacex-l4uc6p.apollographos.net/graphql',
    cache: new InMemoryCache(),
  });
  const queryClient = new QueryClient();

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <FirebaseContext.Provider value={newFireBase}>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ApolloProvider>
    </FirebaseContext.Provider>
  );
};

export default App;
