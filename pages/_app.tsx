import { Global } from '@emotion/react';
import { globalStyles } from '../styles/globalStyles';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AppProps } from 'next/dist/shared/lib/router/router';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: 'http://backend08.codebootcamp.co.kr/graphql',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
