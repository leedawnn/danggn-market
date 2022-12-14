import { useApolloClient, useMutation } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import { Modal } from 'antd';
import { result } from 'lodash';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { accessTokenState, userInfoState } from '../../../../commons/store';
import { IMutation, IMutationLoginUserArgs } from '../../../../commons/types/generated/types';
import SigninUI from './Signin.presenter';
import { FETCH_USER_LOGGED_IN, LOGIN_USER } from './Signin.queries';

const SigninContainer = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const router = useRouter();
  const client = useApolloClient();

  const [loginUser] = useMutation<Pick<IMutation, 'loginUser'>, IMutationLoginUserArgs>(LOGIN_USER);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onClickLogin = async () => {
    const result = await loginUser({
      variables: {
        email,
        password,
      },
    });

    const accessToken = result.data?.loginUser.accessToken;

    if (!accessToken) {
      Modal.error({ content: '로그인에 실패하였습니다. 다시 시도해 주세요. 😢' });
      return;
    }
    const resultUserInfo = await client.query({
      query: FETCH_USER_LOGGED_IN,
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    const userInfo = resultUserInfo.data?.fetchUserLoggedIn;

    setAccessToken(accessToken);
    setUserInfo(userInfo);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    router.push('/');
  };

  return <SigninUI onChangeEmail={onChangeEmail} onChangePassword={onChangePassword} onClickLogin={onClickLogin} />;
};
export default SigninContainer;
