import styled from '@emotion/styled';
import { ChangeEvent, useRef } from 'react';
import { checkValidationImage } from '../01/Uploads01.validation';
import { TbCameraPlus } from 'react-icons/tb';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../../commons/store/Auth/UserInfoState';
import { useMutation } from '@apollo/client';
import { IMutation, IMutationUploadFileArgs } from '../../../../commons/types/generated/types';
import { UPLOAD_FILE } from '../01/Uploads01.queries';
import { message, Modal } from 'antd';

interface ImageFileInputProps {
  onChangeProfilePhoto: (fileUrl: string) => void;
  fileUrl: string;
}

const Uploads02 = ({ onChangeProfilePhoto, fileUrl }: ImageFileInputProps) => {
  const [userInfo] = useRecoilState(userInfoState);

  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation<Pick<IMutation, 'uploadFile'>, IMutationUploadFileArgs>(UPLOAD_FILE);

  const onClickUploadImage = () => {
    fileRef.current?.click();
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const isValid = checkValidationImage(event.target.files?.[0]);
    if (!isValid) return;

    if (!file) return;
    if (!checkValidationImage(file)) return;

    try {
      const result = await uploadFile({ variables: { file } });

      if (!result) message.error({ content: '이미지 업로드에 실패했습니다. 다시 시도해주세요.' });

      onChangeProfilePhoto(String(result.data?.uploadFile.url));
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const handleImageError = (event: any) => {
    event.target.src = '/defaultProfile.png';
  };

  return (
    <ProfilePhotoWrapper>
      <ProfilePhoto
        onClick={onClickUploadImage}
        defaultValue={`https://storage.googleapis.com/${userInfo?.picture}`}
        src={`https://storage.googleapis.com/${fileUrl}`}
      />
      <ProfilePhotoAddButton onClick={onClickUploadImage}>
        <PhotoAddIcon />
      </ProfilePhotoAddButton>
      <input type='file' ref={fileRef} onChange={onChangeFile} hidden />
    </ProfilePhotoWrapper>
  );
};

export default Uploads02;

export const ProfilePhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
`;

export const ProfilePhoto = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
`;

export const ProfilePhotoAddButton = styled.div`
  position: relative;
  right: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  width: 42px;
  height: 42px;
  background-color: rgba(15, 20, 25, 0.75);
  opacity: 0.75;
  border-radius: 50%;
  cursor: pointer;

  :hover {
    opacity: 0.6;
  }
`;

export const PhotoAddIcon = styled(TbCameraPlus)`
  font-size: 18px;
  color: rgb(255, 255, 255);
`;
