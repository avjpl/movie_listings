import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache()
});

import { ApolloProvider } from '@apollo/client';

import '../../web/css/index.css';

function MyApp({ Component, pageProps, router }) {
  const { route } = router;

  return (
    <ApolloProvider client={client}>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={route} />
      </AnimatePresence>
    </ApolloProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
  router: PropTypes.object,
};

export default MyApp;
