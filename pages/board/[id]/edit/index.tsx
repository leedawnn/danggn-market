import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { IQuery, IQueryFetchBoardArgs } from '../../../../src/commons/types/generated/types';
import CreateBoard from '../../../../src/components/units/boards/new/CreateBoard.container';

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
    }
  }
`;

const EditBoards = () => {
  const router = useRouter();

  const { data } = useQuery<Pick<IQuery, 'fetchBoard'>, IQueryFetchBoardArgs>(FETCH_BOARD, {
    variables: { boardId: String(router.query.id) },
  });
  return <CreateBoard isEdit={true} data={data} />;
};

export default EditBoards;
