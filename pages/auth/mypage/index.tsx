import MypageContainer from '../../../src/components/units/auth/mypage/Mypage.container';
import { withAuth } from '../../../src/commons/libraries/withAuth';

const MyPage = () => {
  return <MypageContainer />;
};
export default withAuth(MyPage);
