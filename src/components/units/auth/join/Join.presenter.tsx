import Link from 'next/link';
import * as S from './Join.styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

const schema = yup.object({
  email: yup.string().email('이메일 형식에 적합하지 않습니다.').required('이메일은 필수 입력입니다.'),
  password: yup
    .string()
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/, '영문+숫자 조합 8~16자로 입력해주세요.')
    .required('비밀번호를 입력해주세요.'),
  repassword: yup
    .string()
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/, '영문+숫자 조합 8~16자로 입력해주세요.')
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호를 한번 더 입력해주세요.'),
  name: yup.string().required('이름을 입력해주세요.'),
});

interface IJoinProps {
  email?: string;
  password?: string;
  repassword?: string;
  name?: string;
  handleCreateUser: (joinInputs: any) => Promise<void>;
}

const JoinUI = ({ handleCreateUser }: IJoinProps) => {
  const [isActive, setIsActive] = useState(false);

  const { register, handleSubmit, formState } = useForm<IJoinProps>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  return (
    <S.Wrapper>
      <S.JoinForm onSubmitCapture={handleSubmit(handleCreateUser)}>
        <S.JoinHeader>
          <S.JoinTitle>반려인들과의 소통을 원하시면 가입하세요.</S.JoinTitle>
          <S.KakaoButton>Kakao로 로그인</S.KakaoButton>
        </S.JoinHeader>
        <S.DivideWrapper>
          <S.DivideLine />
          <S.DivideText>또는</S.DivideText>
          <S.DivideLine />
        </S.DivideWrapper>
        <S.JoinBody>
          <S.JoinInputWrapper>
            <S.JoinInput type='text' placeholder='이메일 주소' {...register('email')} />
            <S.ErrorMessage>{formState.errors.email?.message}</S.ErrorMessage>
          </S.JoinInputWrapper>
          <S.JoinInputWrapper>
            <S.JoinInput type='password' placeholder='비밀번호' {...register('password')} />
            <S.ErrorMessage>{formState.errors.password?.message}</S.ErrorMessage>
          </S.JoinInputWrapper>
          <S.JoinInputWrapper>
            <S.JoinInput type='password' placeholder='비밀번호 확인' {...register('repassword')} />
            <S.ErrorMessage>{formState.errors.repassword?.message}</S.ErrorMessage>
          </S.JoinInputWrapper>
          <S.JoinInputWrapper>
            <S.JoinInput type='text' placeholder='사용자 이름' {...register('name')} />
            <S.ErrorMessage>{formState.errors.name?.message}</S.ErrorMessage>
          </S.JoinInputWrapper>
          <S.ButtonWrapper>
            <S.JoinButton type='reset' isValid={formState.isValid}>
              가입
            </S.JoinButton>
          </S.ButtonWrapper>
        </S.JoinBody>
      </S.JoinForm>
      <S.JoinFooter>
        <S.FooterSpan>이미 아이디가 있으신가요? </S.FooterSpan>
        <Link href='/auth/signin'>
          <a>
            <S.MovetoLoginSpan>로그인</S.MovetoLoginSpan>
          </a>
        </Link>
      </S.JoinFooter>
    </S.Wrapper>
  );
};
export default JoinUI;
