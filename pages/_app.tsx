import 'antd/dist/antd.css';
import { Global } from '@emotion/react';
import { globalStyles } from '../src/commons/styles/globalStyles';
import Layout from '../src/components/commons/layout';
import { AppProps } from 'next/app';
import ApolloSetting from '../src/commons/settings/apolloSetting';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <ApolloSetting>
          <Global styles={globalStyles} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloSetting>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
