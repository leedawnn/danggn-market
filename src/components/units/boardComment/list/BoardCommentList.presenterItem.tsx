import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { Modal } from 'antd';
import BoardCommentWrite from '../write/BoardCommentWrite.container';
import { DELETE_BOARD_COMMENT, FETCH_BOARD_COMMENTS } from './BoardCommentList.queries';
import * as S from './BoardCommentList.styles';
import { IBoardCommentListUIItemProps } from './BoardCommentList.types';
import { IMutation, IMutationDeleteBoardCommentArgs } from '../../../../commons/types/generated/types';
import { getDate } from '../../../../commons/libraries/utils';

const BoardCommentListUIItem = (props: IBoardCommentListUIItemProps) => {
  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [password, setPassword] = useState('');

  const [deleteBoardComment] = useMutation<Pick<IMutation, 'deleteBoardComment'>, IMutationDeleteBoardCommentArgs>(
    DELETE_BOARD_COMMENT
  );

  const onClickUpdate = () => {
    setIsEdit(true);
  };

  const onClickDelete = async () => {
    try {
      await deleteBoardComment({
        variables: {
          password,
          boardCommentId: props.el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.id },
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onClickOpenDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const onChangeDeletePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleImageError = (event: any) => {
    event.target.src = '/defaultProfile.png';
  };

  return (
    <>
      {isOpenDeleteModal && (
        <Modal visible={true} onOk={onClickDelete} onCancel={() => setIsOpenDeleteModal(false)}>
          <p>비밀번호 입력: </p>
          <S.PasswordInput type='password' onChange={onChangeDeletePassword} />
        </Modal>
      )}
      {!isEdit && (
        <S.ItemWrapper>
          <S.FlexWrapper>
            <S.ProfileImage
              src={`https://storage.googleapis.com/${props.el.user?.picture}`}
              onError={handleImageError}
            />
            <S.MainWrapper>
              <S.WriterWrapper>
                <S.Writer>{props.el?.writer}</S.Writer>
                <S.Star value={props.el?.rating} disabled />
              </S.WriterWrapper>
              <S.Contents>{props.el?.contents}</S.Contents>
            </S.MainWrapper>
            <S.OptionWrapper>
              <S.UpdateIcon onClick={onClickUpdate} />
              <S.DeleteIcon onClick={onClickOpenDeleteModal} />
            </S.OptionWrapper>
          </S.FlexWrapper>
          <S.DateString>{getDate(props.el?.createdAt)}</S.DateString>
        </S.ItemWrapper>
      )}
      {isEdit && <BoardCommentWrite isEdit={true} setIsEdit={setIsEdit} el={props.el} password={password} />}
    </>
  );
};

export default BoardCommentListUIItem;
