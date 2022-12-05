import styled from '@emotion/styled';
import { AiOutlineCloudUpload } from 'react-icons/ai';

export const UploadImage = styled.img`
  width: 78px;
  height: 78px;
  margin-right: 24px;
  cursor: pointer;
`;

export const UploadButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 78px;
  height: 78px;
  margin-right: 24px;
  outline: none;
  border: 3px dotted #000000;
  cursor: pointer;
`;

export const UploadFileHidden = styled.input`
  display: none;
`;

export const UploadIcon = styled(AiOutlineCloudUpload)`
  font-size: 18px;
`;
