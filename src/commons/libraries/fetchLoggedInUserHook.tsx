import { useQuery } from '@apollo/client';
import { userInfo } from 'os';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { FETCH_USER_LOGGED_IN } from '../../components/units/auth/signin/Signin.queries';
import { userInfoState } from '../store/Auth/UserInfoState';
import { IQuery } from '../types/generated/types';

export const fetchLoggedInUserHook = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const { data } = useQuery<Pick<IQuery, 'fetchUserLoggedIn'>>(FETCH_USER_LOGGED_IN);

  useEffect(() => {
    if (!data?.fetchUserLoggedIn) {
      setUserInfo({
        email: undefined,
        name: undefined,
        picture: undefined,
        userPoint: undefined,
      });
      return;
    }

    setUserInfo({
      email: data.fetchUserLoggedIn.email,
      name: data.fetchUserLoggedIn.name,
      picture: data.fetchUserLoggedIn.picture,
      userPoint: data.fetchUserLoggedIn.userPoint?.amount,
    });
  }, [data]);
  return <></>;
};
