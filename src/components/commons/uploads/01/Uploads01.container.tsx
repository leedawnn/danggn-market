import { useMutation } from '@apollo/client';
import { ChangeEvent, useRef } from 'react';
import { checkValidationImage } from './Uploads01.validation';
import Uploads01UI from './Uploads01.presenter';
import { IUploads01Props } from './Uploads01.types';
import { UPLOAD_FILE } from './Uploads01.queries';
import { Modal } from 'antd';
import { IMutation, IMutationUploadFileArgs } from '../../../../commons/types/generated/types';

export default function Uploads01(props: IUploads01Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation<Pick<IMutation, 'uploadFile'>, IMutationUploadFileArgs>(UPLOAD_FILE);

  const onClickUpload = () => {
    fileRef.current?.click();
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const isValid = checkValidationImage(event.target.files?.[0]);
    if (!isValid) return;

    try {
      const result = await uploadFile({ variables: { file } });
      props.onChangeFileUrls(String(result.data?.uploadFile.url), Number(props.index));
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <Uploads01UI
      fileRef={fileRef}
      fileUrl={props.fileUrl}
      defaultFileUrl={props.defaultFileUrl}
      onClickUpload={onClickUpload}
      onChangeFile={onChangeFile}
    />
  );
}
