import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getAccessToken } from './getAccessToken';

export const withAuth = (Component: any) => (props: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    getAccessToken().then((token) => {
      if (!token) {
        router.replace('/auth/signin');
      }
    });
  }, []);

  return <Component {...props} />;
};
