import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../commons/store/Auth/UserInfoState';
import MypageUI from './Mypage.presenter';

const MypageContainer = () => {
  const [userInfo] = useRecoilState(userInfoState);

  const handleImageError = (event: any) => {
    event.target.src = '/defaultProfile.png';
  };
  return <MypageUI userInfo={userInfo} handleImageError={handleImageError} />;
};

export default MypageContainer;
