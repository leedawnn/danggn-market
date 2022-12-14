import { gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { Modal } from 'antd';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';

const schema = yup.object({
  email: yup.string().email('이메일 형식에 적합하지 않습니다.').required('이메일은 필수 입력입니다.'),
  password: yup
    .string()
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/, '영문+숫자 조합 8~16를 입력해주세요.')
    .required('비밀번호를 입력해주세요.'),
  repassword: yup
    .string()
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/, '영문+숫자 조합 8~16를 입력해주세요.')
    .required('비밀번호를 한번 더 입력해주세요.'),
  name: yup.string().required('이름을 입력해주세요.'),
});

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
    }
  }
`;

export default function UserJoin() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [createUser] = useMutation(CREATE_USER);

  const onClickJoin = async (data) => {
    try {
      await createUser({
        variables: {
          createUserInput: {
            email: data.email,
            password: data.password,
            name: data.name,
          },
        },
      });
      router.push('/');
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <Wrapper>
      <JoinForm onSubmit={handleSubmit(onClickJoin)}>
        <JoinHeader>
          <JoinTitle>회원가입</JoinTitle>
          <JoinSubtitle>Sign up</JoinSubtitle>
        </JoinHeader>
        <JoinBody>
          <JoinInputWrapper>
            <JoinLabel>아이디</JoinLabel>
            <JoinInput type='text' placeholder='이메일 아이디를 @까지 정확하게 입력하세요' {...register('email')} />
            <ErrorMessage>{formState.errors.email?.message}</ErrorMessage>
          </JoinInputWrapper>
          <JoinInputWrapper>
            <JoinLabel>비밀번호</JoinLabel>
            <JoinInput
              type='password'
              placeholder='영문+숫자 조합 8~16자리를 입력해주세요.'
              {...register('password')}
            />
            <ErrorMessage>{formState.errors.password?.message}</ErrorMessage>
          </JoinInputWrapper>
          <JoinInputWrapper>
            <JoinLabel>비밀번호 확인</JoinLabel>
            <JoinInput
              type='password'
              placeholder='영문+숫자 조합 8~16자리를 입력해주세요.'
              {...register('repassword')}
            />
            <ErrorMessage>{formState.errors.repassword?.message}</ErrorMessage>
          </JoinInputWrapper>
          <JoinInputWrapper>
            <JoinLabel>이름</JoinLabel>
            <JoinInput type='text' placeholder='Ex) 홍길동' {...register('name')} />
            <ErrorMessage>{formState.errors.name?.message}</ErrorMessage>
          </JoinInputWrapper>
          <ButtonWrapper>
            <FormButton isCancle={false}>회원가입하기</FormButton>
            <Link href='/'>
              <a>
                <FormButton isCancle={true}>취소</FormButton>
              </a>
            </Link>
          </ButtonWrapper>
        </JoinBody>
        <JoinFooter>
          <FooterSpan>이미 아이디가 있으신가요? </FooterSpan>
          <Link href='/user/login'>
            <a>
              <MovetoLoginSpan>로그인</MovetoLoginSpan>
            </a>
          </Link>
        </JoinFooter>
      </JoinForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 742px;
  height: 700px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.07);
`;

const JoinHeader = styled.header`
  display: flex;
  width: 80%;
  justify-content: left;
  align-items: center;
  border-bottom: 1px solid #c9c9c9;
  padding: 30px 30px 30px 0px;
`;

const JoinTitle = styled.span`
  font-size: 40px;
  font-weight: 700;
`;

const JoinSubtitle = styled.span`
  font-size: 28px;
  font-weight: 400;
  margin-left: 12px;
`;

const JoinBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const JoinInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const JoinLabel = styled.label`
  font-size: 20px;
  font-weight: 400;
`;

const JoinInput = styled.input`
  width: 600px;
  height: 50px;
  background-color: #f6f6f6;
  padding: 15px;
  margin: 20px 0px 0px 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

interface IButtonProps {
  isCancle: boolean;
}

const FormButton = styled.button<IButtonProps>`
  width: 150px;
  height: 50px;
  color: ${(props) => (props.isCancle ? '#000000' : '#ffffff')};
  font-weight: 700;
  margin-left: 20px;
  background-color: ${(props) => (props.isCancle ? '#FFE004' : '#000000')};
  cursor: pointer;
`;

const JoinFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterSpan = styled.span`
  margin-right: 10px;
  color: #888888;
`;

const MovetoLoginSpan = styled.span`
  font-weight: 500;
  text-decoration: underline;
`;

const ErrorMessage = styled.div`
  color: tomato;
`;
