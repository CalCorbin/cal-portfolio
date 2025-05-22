import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { logEvent } from 'firebase/analytics';
import { FirebaseContext, firebase } from '../components/Firebase';
import '../globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const [analytics, setAnalytics] = useState(firebase.analytics);
  const apolloClient = new ApolloClient({
    uri: 'https://main--spacex-l4uc6p.apollographos.net/graphql',
    cache: new InMemoryCache(),
  });
  const queryClient = new QueryClient();

  useEffect(() => {
    const initAnalytics = async () => {
      const analyticsInstance = await firebase.initializeAnalytics();
      if (analyticsInstance) {
        setAnalytics(analyticsInstance);
        logEvent(analyticsInstance, 'page_view', {
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
    <FirebaseContext.Provider value={{ analytics }}>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ApolloProvider>
    </FirebaseContext.Provider>
  );
};

export default App;
