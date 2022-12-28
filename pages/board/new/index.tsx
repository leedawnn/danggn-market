import CreateBoard from '../../../src/components/units/boards/new/CreateBoard.container';
import { withAuth } from '../../../src/commons/libraries/withAuth';

const CreateBoards = () => {
  return <CreateBoard isEdit={false} />;
};
export default withAuth(CreateBoards);
