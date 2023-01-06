import { useRouter } from 'next/router';
import DetailBoardUI from './DetailBoard.presenter';
import { useMutation, useQuery } from '@apollo/client';
import { FETCH_BOARD, DELETE_BOARD, LIKE_BOARD, DISLIKE_BOARD } from './DetailBoard.queries';
import {
  IMutation,
  IMutationDeleteBoardArgs,
  IMutationDislikeBoardArgs,
  IMutationLikeBoardArgs,
} from '../../../../commons/types/generated/types';
import { Modal } from 'antd';

const DetailBoard = () => {
  const router = useRouter();

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: String(router.query.id) },
  });

  const [deleteBoard] = useMutation<Pick<IMutation, 'deleteBoard'>, IMutationDeleteBoardArgs>(DELETE_BOARD);

  const [likeBoard] = useMutation<Pick<IMutation, 'likeBoard'>, IMutationLikeBoardArgs>(LIKE_BOARD);
  const [dislikeBoard] = useMutation<Pick<IMutation, 'dislikeBoard'>, IMutationDislikeBoardArgs>(DISLIKE_BOARD);

  // TODO: 좋아요나 싫어요 한 번만 누를 수 있게 변경하기
  const onClickMoveToBoards = () => {
    router.push('/board');
  };

  const onClickMoveToEdit = () => {
    router.push(`/board/${router.query.id}/edit`);
  };

  const onClickDelete = async () => {
    if (typeof router.query.id !== 'string') return;

    try {
      await deleteBoard({
        variables: { boardId: String(router.query.id) },
      });
      alert('게시물이 성공적으로 삭제되었습니다.'); // TODO: no면 상세 페이지로 되돌아가기
      router.push('/board');
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onClickLike = () => {
    if (typeof router.query.id !== 'string') return;
    likeBoard({
      variables: { boardId: router.query.id },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: { boardId: router.query.id },
        },
      ],
    });
  };

  const onClickDislike = () => {
    if (typeof router.query.id !== 'string') return;
    dislikeBoard({
      variables: { boardId: router.query.id },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: { boardId: router.query.id },
        },
      ],
    });
  };

  return (
    <>
      <DetailBoardUI
        onClickMoveToBoards={onClickMoveToBoards}
        onClickMoveToEdit={onClickMoveToEdit}
        onClickDelete={onClickDelete}
        data={data}
        onClickLike={onClickLike}
        onClickDislike={onClickDislike}
      />
    </>
  );
};
export default DetailBoard;
