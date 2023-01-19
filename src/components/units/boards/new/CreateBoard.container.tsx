import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CreateBoardUI from './CreateBoard.presenter';
import { useMutation } from '@apollo/client';
import { CREATE_BOARD, UPDATE_BOARD } from './CreateBoard.queries';
import { Modal } from 'antd';
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
} from '../../../../commons/types/generated/types';
import { IBoardcreateProps, IUpdateBoardInput } from './CreateBoard.types';

const CreateBoard = (props: IBoardcreateProps) => {
  const router = useRouter();

  const [writer, setWriter] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [fileUrls, setFileUrls] = useState(['', '', '']);
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');

  const [writerError, setWriterError] = useState('');
  const [PwError, setPwError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentsError] = useState('');

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [createBoard] = useMutation<Pick<IMutation, 'createBoard'>, IMutationCreateBoardArgs>(CREATE_BOARD);
  const [updateBoard] = useMutation<Pick<IMutation, 'updateBoard'>, IMutationUpdateBoardArgs>(UPDATE_BOARD);

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangePw = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const onChangeFileUrls = (fileUrl: string, index: number) => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
  };

  const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(event.target.value);
  };

  const onClickAddressSearch = () => {
    setIsOpen(true);
  };

  const onCompleteAddressSearch = (data: any) => {
    setAddress(data.address);
    setZipcode(data.zonecode);
    setIsOpen(false);
  };

  useEffect(() => {
    if (props.data?.fetchBoard.images?.length) {
      setFileUrls([...props.data?.fetchBoard.images]);
    }
  }, [props.data]);

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
              youtubeUrl,
              boardAddress: {
                zipcode,
                address,
                addressDetail,
              },
              images: [...fileUrls],
            },
          },
        });
        router.push(`/board/${result.data?.createBoard._id}`);
      } catch (error) {
        if (error instanceof Error) Modal.error({ content: error.message });
      }
    }
  };

  const onClickUpdate = async () => {
    const currentFiles = JSON.stringify(fileUrls);
    const defaultFiles = JSON.stringify(props.data?.fetchBoard.images);
    const isChangedFiles = currentFiles !== defaultFiles;

    if (!title && !contents && !youtubeUrl && !address && !addressDetail && !zipcode && !isChangedFiles) {
      Modal.info({ content: '수정한 내용이 없습니다.' });
      return;
    }

    if (!password) {
      Modal.error({ content: '비밀번호를 입력해주세요.' });
      return;
    }

    const updateBoardInput: IUpdateBoardInput = {};
    if (title) updateBoardInput.title = title;
    if (contents) updateBoardInput.contents = contents;
    if (youtubeUrl) updateBoardInput.youtubeUrl = youtubeUrl;
    if (zipcode || address || addressDetail) {
      updateBoardInput.boardAddress = {};

      if (zipcode) updateBoardInput.boardAddress.zipcode = zipcode;
      if (address) updateBoardInput.boardAddress.address = address;
      if (addressDetail) updateBoardInput.boardAddress.addressDetail = addressDetail;
    }
    if (isChangedFiles) updateBoardInput.images = fileUrls;

    try {
      if (typeof router.query.id !== 'string') return;
      const result = await updateBoard({
        variables: {
          boardId: router.query.id,
          password,
          updateBoardInput,
        },
      });
      router.push(`/board/${router.query.id}`);
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
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
        onChangeYoutubeUrl={onChangeYoutubeUrl}
        onChangeAddressDetail={onChangeAddressDetail}
        onClickAddressSearch={onClickAddressSearch}
        onCompleteAddressSearch={onCompleteAddressSearch}
        onChangeFileUrls={onChangeFileUrls}
        onClickValidation={onClickValidation}
        onClickUpdate={onClickUpdate}
        isEdit={props.isEdit}
        data={props.data}
        fileUrls={fileUrls}
      />
    </>
  );
};

export default CreateBoard;
