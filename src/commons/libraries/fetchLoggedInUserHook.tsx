import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { FETCH_USER_LOGGED_IN } from '../../components/units/auth/signin/Signin.queries';
import { userInfoState } from '../store/Auth/UserInfoState';
import { IQuery } from '../types/generated/types';

export const FetchLoggedInUserHook = () => {
  const [, setUserInfo] = useRecoilState(userInfoState);
  const { data } = useQuery<Pick<IQuery, 'fetchUserLoggedIn'>>(FETCH_USER_LOGGED_IN);

  useEffect(() => {
    if (!data?.fetchUserLoggedIn) {
      setUserInfo(undefined);
      return;
    }

    setUserInfo({
      email: data.fetchUserLoggedIn.email,
      name: data.fetchUserLoggedIn.name,
      picture: String(data.fetchUserLoggedIn.picture),
      userPoint: Number(data.fetchUserLoggedIn.userPoint?.amount),
    });
  }, [data]);
  return <></>;
};
