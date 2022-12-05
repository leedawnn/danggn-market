import { gql, useApolloClient, useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';
import { IMutation, IMutationCreateUserArgs, IMutationLoginUserArgs } from '../../../src/commons/types/generated/types';
import { Modal } from 'antd';
import { result } from 'lodash';
import { useRecoilState } from 'recoil';
import { accessTokenState, userInfoState } from '../../../src/commons/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

const userJoin = () => {
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

  return (
    <Wrapper>
      <Header>
        <h2>로그인</h2>
      </Header>
      <Container>
        <LoginWrapper>
          <UserLogin>
            <h2>회원 로그인</h2>
            <AboutLogin>가입하신 이메일과 비밀번호를 입력해주세요. </AboutLogin>
            <AboutLogin>비밀번호는 대소문자를 구분합니다.</AboutLogin>
          </UserLogin>
          {/* <LoginForm> */}
          <LoginInput type='text' placeholder='MEMBER EMAIL' onChange={onChangeEmail} />
          {/* <FormError>{formState.errors.email?.message}</FormError> */}
          <LoginInput type='password' placeholder='PASSWORD' onChange={onChangePassword} />
          {/* <FormError>{formState.errors.password?.message}</FormError> */}
          <LoginButton onClick={onClickLogin}>LOG-IN</LoginButton>
          {/* </LoginForm> */}
        </LoginWrapper>
        <UserJoin>
          <Header>
            <h2>회원 가입</h2>
          </Header>
          <AboutLogin>
            아직 회원이 아니신가요? 회원가입을 하시면 다양한 혜택을 편리하게 이용하실 수 있습니다.
          </AboutLogin>
          <LoginButton>JOIN-US</LoginButton>
          <AboutLogin>
            아이디 혹은 비밀번호를 잊으셨나요? 간단한 정보를 입력 후 잃어버린 정보를 찾으실 수 있습니다.
          </AboutLogin>
          <LoginButton>ID/PASSWORD</LoginButton>
        </UserJoin>
      </Container>
    </Wrapper>
  );
};
export default userJoin;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  height: 100%;
  margin: 0px auto;
  padding: 150px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 400px;
`;

const Header = styled.header`
  border-top: 2px solid black;
  border-left: 1px solid #e9e9e9;
  border-right: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  border: 1px solid red;
`;

const UserLogin = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LoginInput = styled.input``;

const LoginButton = styled.button``;

const AboutLogin = styled.span`
  font-size: 10px;
  color: #e9e9e9;
`;

const UserJoin = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
  border: 1px solid royalblue;
`;

const LoginForm = styled.form``;

const FormError = styled.span`
  color: tomato;
`;
