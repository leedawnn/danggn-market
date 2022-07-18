import { useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import CreateBoardUI from './CreateBoard.presenter';
import { useMutation } from '@apollo/client';
import { CREATE_BOARD } from './CreateBoard.queries';

const CreateBoard = () => {
  const router = useRouter();

  const [writer, setWriter] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  // form 검증 에러메시지
  const [writerError, setWriterError] = useState('');
  const [PwError, setPwError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentsError] = useState('');

  // graphql에 게시글 등록 api 등록
  const [createBoard] = useMutation(CREATE_BOARD);

  // input 감지 이벤트
  const onChangeWriter = (event) => {
    setWriter(event.target.value);
  };

  const onChangePw = (event) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);
  };

  // 폼 유효성 검사
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
        Swal.fire('등록 완료!', '게시물이 등록되었습니다.', 'success');
      } catch (error) {
        Swal.fire('Error!', error.message, 'error');
      }
    }
  };
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
      />
    </>
  );
};
export default CreateBoard;
