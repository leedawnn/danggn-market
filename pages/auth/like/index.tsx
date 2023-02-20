import { withAuth } from '../../../src/commons/libraries/withAuth';
import LikeContainer from '../../../src/components/units/auth/like/Like.container';

const LikePage = () => {
  return <LikeContainer />;
};
export default withAuth(LikePage);
