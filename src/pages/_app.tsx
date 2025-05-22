import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { logEvent } from 'firebase/analytics';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Firebase, { FirebaseContext } from '../components/Firebase';
import { initializeAnalytics } from '../components/Firebase/firebase';
import '../globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const newFireBase = useMemo(() => new Firebase(), []);
  const apolloClient = new ApolloClient({
    uri: 'https://main--spacex-l4uc6p.apollographos.net/graphql',
    cache: new InMemoryCache(),
  });
  const queryClient = new QueryClient();

  useEffect(() => {
    // Initialize Firebase Analytics
    const initAnalytics = async () => {
      const analytics = await initializeAnalytics();
      if (analytics) {
        console.log('Firebase Analytics initialized successfully');
        logEvent(analytics, 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: window.location.pathname,
        });
      }
    };

    initAnalytics();
  }, []);

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
