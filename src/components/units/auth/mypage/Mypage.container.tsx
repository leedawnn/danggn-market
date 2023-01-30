import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../commons/store/Auth/UserInfoState';
import MypageUI from './Mypage.presenter';

const MypageContainer = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  return <MypageUI userInfo={userInfo} setUserInfo={setUserInfo} />;
};

export default MypageContainer;
