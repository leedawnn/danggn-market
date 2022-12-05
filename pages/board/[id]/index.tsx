import DetailBoard from '../../../src/components/units/boards/detail/DetailBoard.container';
import BoardCommentList from '../../../src/components/units/boardComment/list/BoardCommentList.container';
import BoardCommentWrite from '../../../src/components/units/boardComment/write/BoardCommentWrite.container';

const DetailBoards = () => {
  return (
    <>
      <DetailBoard />
      <BoardCommentWrite />
      <BoardCommentList />
    </>
  );
};
export default DetailBoards;
