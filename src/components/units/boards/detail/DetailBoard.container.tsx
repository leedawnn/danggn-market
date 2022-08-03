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

  const onClickMoveToBoards = () => {
    router.push('/');
  };

  const onClickMoveToEdit = () => {
    router.push(`/boards/${router.query.id}/edit`);
  };

  const onClickDelete = async () => {
    if (typeof router.query.id !== 'string') return;

    try {
      await deleteBoard({
        variables: { boardId: String(router.query.id) },
      });
      alert('게시물이 삭제되었습니다.'); // TODO: 모달로 바꾸고 yes 눌렀을 때 삭제, no면 상세 페이지로 되돌아가기
      router.push('/');
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <>
      <DetailBoardUI
        onClickMoveToBoards={onClickMoveToBoards}
        onClickMoveToEdit={onClickMoveToEdit}
        onClickDelete={onClickDelete}
        data={data}
      />
    </>
  );
};
export default DetailBoard;
