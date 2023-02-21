import 'antd/dist/antd.css';
import { Global } from '@emotion/react';
import { globalStyles } from '../src/commons/styles/globalStyles';
import Layout from '../src/components/commons/layout';
import { AppProps } from 'next/app';
import ApolloSetting from '../src/commons/settings/apolloSetting';
import { RecoilRoot } from 'recoil';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import 'nprogress/nprogress.css';
import Lottie from 'react-lottie';
import animationData from '../public/animal-paw-loading.json';
import styled from '@emotion/styled';
import Head from 'next/head';

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
      <Head>
        <title>오직 반려동물만을 위한 댕근마켓</title>
        <meta name='description' content='중고 거래부터 정보 공유까지 반려인들과 함께해요.' />
        <meta property='og:url' content='https://danggn.shop/'></meta>
        <meta property='og:title' content='오직 반려동물만을 위한 댕근마켓'></meta>
        <meta property='og:description' content='중고 거래부터 정보 공유까지 반려인들과 함께해요.'></meta>
        <meta property='og:site_name' content='댕근마켓'></meta>
        <meta property='og:image' content='/public/metaImage.png'></meta>
        <meta property='og:type' content='article'></meta>
        <meta property='og:locale' content='ko_KR'></meta>
      </Head>
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
