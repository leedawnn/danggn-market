import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import CreateBoardUI from './CreateBoard.presenter';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_BOARD, UPDATE_BOARD } from './CreateBoard.queries';
import { Modal } from 'antd';
import {
  ICreateBoardInput,
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
} from '../../../../commons/types/generated/types';

const CreateBoard = (props: ICreateBoardInput) => {
  const router = useRouter();

  const [writer, setWriter] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const [writerError, setWriterError] = useState('');
  const [PwError, setPwError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentsError] = useState('');

  const [createBoard] = useMutation<Pick<IMutation, 'createBoard'>, IMutationCreateBoardArgs>(CREATE_BOARD);
  // const [updateBoard] = useQuery<Pick<IMutation, 'updateBoard'>, IMutationUpdateBoardArgs>(UPDATE_BOARD);

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangePw = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  const onClickValidation = async () => {
    let isCheck = true;

    if (!writer) {
      isCheck = false;
      setWriterError('올바른 이름을 입력해주세요.');
    } else {
      setWriterError('');
    }

    if (!password) {
      isCheck = false;
      setPwError('설정하실 비밀번호를 입력해주세요.');
    } else {
      setPwError('');
    }

    if (!title) {
      isCheck = false;
      setTitleError('제목을 입력해주세요.');
    } else {
      setTitleError('');
    }

    if (contents.length < 10) {
      isCheck = false;
      setContentsError('10자 이상의 내용을 입력해주세요.');
    }

    if (isCheck) {
      try {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer,
              password,
              title,
              contents,
            },
          },
        });
        router.push(`/boards/${result.data.createBoard._id}`);
      } catch (error) {
        if (error instanceof Error) Modal.error({ content: error.message });
      }
    }
  };

  // 수정하기 버튼 누르면 수정하기 ~
  // const onClickUpdate = () => {};

  return (
    <>
      <CreateBoardUI
        writerError={writerError}
        PwError={PwError}
        titleError={titleError}
        contentError={contentError}
        onChangeWriter={onChangeWriter}
        onChangePw={onChangePw}
        onChangeTitle={onChangeTitle}
        onChangeContents={onChangeContents}
        onClickValidation={onClickValidation}
        isEdit={props.isEdit}
        data={props.data}
      />
    </>
  );
};
export default CreateBoard;
