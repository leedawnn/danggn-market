import { Modal } from 'antd';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getAccessToken } from './getAccessToken';

export const withAuth = (Component: any) => (props: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    getAccessToken().then((token) => {
      if (!token) {
        Modal.info({ content: '로그인이 필요합니다!' });
        router.replace('/auth/signin');
      }
    });
  }, []);

  return <Component {...props} />;
};
