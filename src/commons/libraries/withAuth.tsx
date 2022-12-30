import { Modal } from 'antd';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../store/Auth/UserInfoState';
import { getAccessToken } from './getAccessToken';

export const withAuth = (Component: any) => (props: AppProps) => {
  const router = useRouter();

  const [userInfo, _] = useRecoilState(userInfoState);

  useEffect(() => {
    if (!userInfo) {
      Modal.info({ content: '로그인이 필요합니다!' });
      router.replace('/auth/signin');
    }
  }, []);

  return <Component {...props} />;
};
