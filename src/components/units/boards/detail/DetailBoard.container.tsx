import { useRouter } from 'next/router';
import DetailBoardUI from './DetailBoard.presenter';
import { useMutation, useQuery } from '@apollo/client';
import { FETCH_BOARD, DELETE_BOARD } from './DetailBoard.queries';
import { IMutation, IMutationDeleteBoardArgs } from '../../../../commons/types/generated/types';
import { Modal } from 'antd';

const DetailBoard = () => {
  const router = useRouter();

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: String(router.query.id) },
  });

  const [deleteBoard] = useMutation<Pick<IMutation, 'deleteBoard'>, IMutationDeleteBoardArgs>(DELETE_BOARD);

  const onClickMoveToEdit = () => {
    router.push(`/boards/${router.query.id}/edit`);
  };

  const onClickDelete = () => {
    if (typeof router.query.id !== 'string') return;

    try {
      deleteBoard({
        variables: { boardId: String(router.query.id) },
      });
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <>
      <DetailBoardUI onClickMoveToEdit={onClickMoveToEdit} onClickDelete={onClickDelete} data={data} />
    </>
  );
};
export default DetailBoard;
