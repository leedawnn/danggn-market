import Head from 'next/head';
import Banner from '../src/components/commons/layout/banner';
import Section from '../src/components/commons/layout/section';

export default function Home() {
  return (
    <>
      <Head>
        <title>오직 반려동물만을 위한, 댕근마켓</title>
        <meta name='description' content='중고 거래부터 정보 공유까지 반려인들과 함께해요.' />
        <meta property='og:url' content='https://danggn.shop'></meta>
        <meta property='og:title' content='오직 반려동물만을 위한, 댕근마켓'></meta>
        <meta property='og:description' content='중고 거래부터 정보 공유까지 반려인들과 함께해요.'></meta>
        <meta property='og:site_name' content='댕근마켓'></meta>
        <meta property='og:image' content='/public/metaImage.png'></meta>
        <meta property='og:type' content='article'></meta>
        <meta property='og:locale' content='ko_KR'></meta>
      </Head>
      <Banner />
      <Section />
    </>
  );
}
