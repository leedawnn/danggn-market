import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import BoardCommentWriteUI from './BoardCommentWrite.presenter';
import { FETCH_BOARD_COMMENTS } from '../list/BoardCommentList.queries';
import { CREATE_BOARD_COMMENT, UPDATE_BOARD_COMMENT } from './BoardCommentWrite.queries';
import {
  IMutation,
  IMutationCreateBoardCommentArgs,
  IMutationUpdateBoardCommentArgs,
} from '../../../../commons/types/generated/types';
import { IBoardCommentWriteProps, IUpdateBoardCommentInput } from './BoardCommentWrite.types';
import { message } from 'antd';
import { userInfoState } from '../../../../commons/store/Auth/UserInfoState';
import { useRecoilState } from 'recoil';

export default function BoardCommentWrite(props: IBoardCommentWriteProps) {
  const router = useRouter();

  const [userInfo] = useRecoilState(userInfoState);

  const [writer, setWriter] = useState('');
  const [password, setPassword] = useState('');
  const [contents, setContents] = useState('');
  const [star, setStar] = useState(0);

  const [createBoardComment] = useMutation<Pick<IMutation, 'createBoardComment'>, IMutationCreateBoardCommentArgs>(
    CREATE_BOARD_COMMENT
  );

  const [updateBoardComment] = useMutation<Pick<IMutation, 'updateBoardComment'>, IMutationUpdateBoardCommentArgs>(
    UPDATE_BOARD_COMMENT
  );

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const onClickWrite = async () => {
    if (typeof router.query.id !== 'string') return;

    if (!userInfo) {
      message.error({ content: '로그인이 필요한 기능입니다!' });
      return;
    }

    if (!contents) {
      message.info({ content: '메시지를 입력해주세요!' });
      return;
    }

    try {
      await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer: userInfo?.name,
            password,
            contents,
            rating: star,
          },
          boardId: router.query.id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.id },
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) message.error({ content: error.message });
    }

    setWriter('');
    setPassword('');
    setContents('');
  };

  const onClickUpdate = async () => {
    if (!contents) {
      message.error({ content: '내용이 수정되지 않았습니다.' });
      return;
    }

    if (!password) {
      message.error({ content: '비밀번호가 입력되지 않았습니다.' });
      return;
    }

    try {
      const updateBoardCommentInput: IUpdateBoardCommentInput = {};
      if (contents) updateBoardCommentInput.contents = contents;
      if (star !== props.el?.rating) updateBoardCommentInput.rating = star;

      if (typeof props.el?._id !== 'string') return;
      await updateBoardComment({
        variables: {
          updateBoardCommentInput,
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
      props.setIsEdit?.(false);
    } catch (error) {
      if (error instanceof Error) message.error({ content: error.message });
    }
  };

  return (
    <BoardCommentWriteUI
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeContents={onChangeContents}
      onClickWrite={onClickWrite}
      onClickUpdate={onClickUpdate}
      writer={writer}
      password={password}
      contents={contents}
      setStar={setStar}
      isEdit={props.isEdit}
      el={props.el}
    />
  );
}
