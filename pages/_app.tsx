import 'antd/dist/antd.css';
import { Global } from '@emotion/react';
import { globalStyles } from '../src/commons/styles/globalStyles';
import Layout from '../src/components/commons/layout';
import { AppProps } from 'next/app';
import ApolloSetting from '../src/commons/settings/apolloSetting';
import { RecoilRoot } from 'recoil';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Lottie from 'react-lottie';
import animationData from '../public/animal-paw-loading.json';
import styled from '@emotion/styled';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <>
      {loading ? (
        <LoadingWrapper>
          <Lottie options={defaultOptions} width={300} height={300} />
        </LoadingWrapper>
      ) : (
        <RecoilRoot>
          <ApolloSetting>
            <Global styles={globalStyles} />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ApolloSetting>
        </RecoilRoot>
      )}
    </>
  );
};

export default MyApp;

const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
