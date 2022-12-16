import Link from 'next/link';
import * as S from './Join.styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
  const { register, handleSubmit, formState } = useForm<IJoinProps>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  return (
    <S.Wrapper>
      <S.JoinForm onSubmitCapture={handleSubmit(handleCreateUser)}>
        <S.JoinHeader>
          <S.JoinTitle>회원가입</S.JoinTitle>
          <S.JoinSubtitle>Sign up</S.JoinSubtitle>
        </S.JoinHeader>
        <S.JoinBody>
          <S.JoinInputWrapper>
            <S.JoinLabel>아이디</S.JoinLabel>
            <S.JoinInput type='text' placeholder='이메일 아이디를 @까지 정확하게 입력하세요' {...register('email')} />
            <S.ErrorMessage>{formState.errors.email?.message}</S.ErrorMessage>
          </S.JoinInputWrapper>
          <S.JoinInputWrapper>
            <S.JoinLabel>비밀번호</S.JoinLabel>
            <S.JoinInput
              type='password'
              placeholder='영문+숫자 조합 8~16자리를 입력해주세요.'
              {...register('password')}
            />
            <S.ErrorMessage>{formState.errors.password?.message}</S.ErrorMessage>
          </S.JoinInputWrapper>
          <S.JoinInputWrapper>
            <S.JoinLabel>비밀번호 확인</S.JoinLabel>
            <S.JoinInput
              type='password'
              placeholder='영문+숫자 조합 8~16자리를 입력해주세요.'
              {...register('repassword')}
            />
            <S.ErrorMessage>{formState.errors.repassword?.message}</S.ErrorMessage>
          </S.JoinInputWrapper>
          <S.JoinInputWrapper>
            <S.JoinLabel>이름</S.JoinLabel>
            <S.JoinInput type='text' placeholder='Ex) 홍길동' {...register('name')} />
            <S.ErrorMessage>{formState.errors.name?.message}</S.ErrorMessage>
          </S.JoinInputWrapper>
          <S.ButtonWrapper>
            <S.FormButton isCancle={false}>회원가입하기</S.FormButton>
            <Link href='/'>
              <a>
                <S.FormButton isCancle={true}>취소</S.FormButton>
              </a>
            </Link>
          </S.ButtonWrapper>
        </S.JoinBody>
        <S.JoinFooter>
          <S.FooterSpan>이미 아이디가 있으신가요? </S.FooterSpan>
          <Link href='/auth/signin'>
            <a>
              <S.MovetoLoginSpan>로그인</S.MovetoLoginSpan>
            </a>
          </Link>
        </S.JoinFooter>
      </S.JoinForm>
    </S.Wrapper>
  );
};
export default JoinUI;
