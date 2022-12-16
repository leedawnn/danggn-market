import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button02 from '../../../commons/buttons/02';
import * as S from './Signin.styles';

const schema = yup.object({
  email: yup.string().required('이메일을 입력해주세요.'),
  password: yup.string().required('비밀번호를 입력해주세요.'),
});

interface ISigninProps {
  email?: string;
  password?: string;
  handleSigninUser: (handleSigninUser: any) => Promise<void>;
}

const SigninUI = ({ handleSigninUser }: ISigninProps) => {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<ISigninProps>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const onClickMoveToJoin = () => {
    router.push('/auth/join');
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
          <S.LoginForm onSubmit={handleSubmit(handleSigninUser)}>
            <S.LoginInput type='text' placeholder='MEMBER EMAIL' {...register('email')} />
            <S.LoginInput type='password' placeholder='PASSWORD' {...register('password')} />
            <Button02 onClick={handleSigninUser} title='로그인' kakao={false} />
          </S.LoginForm>
        </S.LoginWrapper>
        <S.UserSignin>
          <h2>회원 가입</h2>
          <S.FormDescription>
            아직 회원이 아니신가요? <br />
            회원가입을 하시면 다양한 서비스를 편리하게 이용하실 수 있습니다.
          </S.FormDescription>
          <S.ButtonWrapper>
            <Button02 onClick={onClickMoveToJoin} title='회원가입' kakao={false} />
            <Button02 onClick={onClickMoveToJoin} title='카카오 1초 가입' kakao={true} />
            <S.LoginErrorMessage>{formState.errors.email?.message}</S.LoginErrorMessage>
            <S.LoginErrorMessage>{formState.errors.password?.message}</S.LoginErrorMessage>
          </S.ButtonWrapper>
        </S.UserSignin>
      </S.Container>
    </S.Wrapper>
  );
};

export default SigninUI;
