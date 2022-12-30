import { useApolloClient, useMutation } from '@apollo/client';
import { message } from 'antd';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../commons/store/Auth/UserInfoState';
import { useRouter } from 'next/router';
import { IMutation, IMutationLoginUserArgs } from '../../../../commons/types/generated/types';
import SigninUI from './Signin.presenter';
import { FETCH_USER_LOGGED_IN, LOGIN_USER } from './Signin.queries';
import { accessTokenState } from '../../../../commons/store/Auth/accessToken';

interface ISigninInputType {
  email: string;
  password: string;
}

const SigninContainer = () => {
  const router = useRouter();
  const client = useApolloClient();

  const [, setAccessToken] = useRecoilState(accessTokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [loginUser] = useMutation<Pick<IMutation, 'loginUser'>, IMutationLoginUserArgs>(LOGIN_USER);

  const handleSigninUser = async (signinInputs: ISigninInputType) => {
    try {
      const result = await loginUser({
        variables: { ...signinInputs },
      });

      const accessToken = result.data?.loginUser.accessToken || '';

      if (!accessToken) {
        message.error({ content: '로그인에 실패하였습니다. 다시 시도해 주세요. 😢' });
        return;
      }

      setAccessToken(accessToken);

      const { data } = await client.query({
        query: FETCH_USER_LOGGED_IN,
        context: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      });

      if (!data) message.error({ content: '해당 유저 정보를 찾을 수 없습니다. 🥺' });

      setUserInfo({
        email: data.fetchUserLoggedIn?.email,
        name: data.fetchUserLoggedIn?.name,
        picture: data.fetchUserLoggedIn?.picture,
        userPoint: data.fetchUserLoggedIn?.userPoint.amount,
      });

      message.success({ content: `${data.fetchUserLoggedIn?.name}님, 반갑습니다! 😉` });
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return <SigninUI handleSigninUser={handleSigninUser} />;
};
export default SigninContainer;
