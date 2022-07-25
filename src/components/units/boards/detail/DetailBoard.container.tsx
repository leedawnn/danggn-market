import { useRouter } from 'next/router';
import DetailBoardUI from './DetailBoard.presenter';
import { useQuery } from '@apollo/client';
import { FETCH_BOARD } from './DetailBoard.queries';

const DetailBoard = () => {
  const router = useRouter();

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: String(router.query.id) },
  });

  const onClickMoveToEdit = () => {
    router.push(`/${router.query.id}/edit`);
  };

  return (
    <>
      <DetailBoardUI onClickMoveToEdit={onClickMoveToEdit} data={data} />
    </>
  );
};
export default DetailBoard;
