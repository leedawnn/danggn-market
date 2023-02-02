import { useMutation } from '@apollo/client';
import { message } from 'antd';
import { useRouter } from 'next/router';
import JoinUI from './Join.presenter';
import { CREATE_USER } from './Join.queries';
import { IMutation, IMutationCreateUserArgs } from '../../../../commons/types/generated/types';
import { useRecoilState } from 'recoil';
import { resetpasswordState } from '../../../../commons/store/Auth/resetPassword';
import { userInfoState } from '../../../../commons/store/Auth/UserInfoState';

interface IJoinInputProps {
  email: string;
  password: string;
  name: string;
}

const JoinContainer = () => {
  const router = useRouter();

  const [, setDefaultPassword] = useRecoilState(resetpasswordState);
  const [, setUserInfo] = useRecoilState(userInfoState);

  const [createUser] = useMutation<Pick<IMutation, 'createUser'>, IMutationCreateUserArgs>(CREATE_USER);

  const handleCreateUser = async (joinInputs: IJoinInputProps) => {
    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            email: joinInputs.email,
            password: joinInputs.password,
            name: joinInputs.name,
          },
        },
      });

      setUserInfo({
        email: '',
        name: '',
        picture: '/defaultProfile.png',
        userPoint: 0,
      });

      setDefaultPassword(String(joinInputs.password));

      if (!result) throw Error('회원가입에 실패했습니다. 다시 한번 시도해주세요.');

      message.success({ content: '회원가입을 축하합니다! 🐶🎉' });
      router.push('/auth/signin');
    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      message.error({ content: '회원가입에 실패했습니다. 다시 한번 시도해주세요.' });
    }
  };
  return <JoinUI handleCreateUser={handleCreateUser} />;
};

export default JoinContainer;
