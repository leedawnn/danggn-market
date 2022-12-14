import { ChangeEvent } from 'react';
import Button02 from '../../../commons/buttons/02';
import * as S from './Signin.styles';

interface ISigninProps {
  onChangeEmail: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickLogin: () => Promise<void>;
}

const SigninUI = ({ onChangeEmail, onChangePassword, onClickLogin }: ISigninProps) => {
  const MoveToJoin = () => {
    // 누르면 회원가입으로 이동
    console.log('daf');
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.LoginWrapper>
          <S.LoginHeader>
            <h2>일반 로그인</h2>
            <S.FormDescription>
              가입하신 이메일과 비밀번호를 입력해주세요. <br />
              비밀번호는 대소문자를 구분합니다.
            </S.FormDescription>
          </S.LoginHeader>
          <S.LoginForm>
            <S.LoginInput type='text' placeholder='MEMBER EMAIL' onChange={onChangeEmail} />
            <S.LoginInput type='password' placeholder='PASSWORD' onChange={onChangePassword} />
            <Button02 onClickLogin={onClickLogin} title='로그인' kakao={false} />
          </S.LoginForm>
        </S.LoginWrapper>
        <S.UserSignin>
          <h2>회원 가입</h2>
          <S.FormDescription>
            아직 회원이 아니신가요? <br />
            회원가입을 하시면 다양한 혜택을 편리하게 이용하실 수 있습니다.
          </S.FormDescription>
          <S.ButtonWrapper>
            <Button02 onClickLogin={MoveToJoin} title='회원가입' kakao={false} />
            <Button02 onClickLogin={MoveToJoin} title='카카오 1초 가입' kakao={true} />
          </S.ButtonWrapper>
        </S.UserSignin>
      </S.Container>
    </S.Wrapper>
  );
};

export default SigninUI;
