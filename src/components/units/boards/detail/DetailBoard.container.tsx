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
import { message, Modal } from 'antd';

const DetailBoard = () => {
  const router = useRouter();

  const { data, refetch } = useQuery(FETCH_BOARD, {
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
    // TODO: 게시물 삭제 시 fetchBoard => refetch
    try {
      await deleteBoard({
        variables: { boardId: String(router.query.id) },
      });
      message.success({ content: '게시글이 성공적으로 삭제되었습니다.' });
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

  const handleImageError = (event: any) => {
    event.target.src = '/defaultProfile.png';
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
        handleImageError={handleImageError}
      />
    </>
  );
};
export default DetailBoard;
