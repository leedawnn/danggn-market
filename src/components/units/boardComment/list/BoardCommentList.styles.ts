import styled from '@emotion/styled';
import { Rate, Modal } from 'antd';
import { CgProfile } from 'react-icons/cg';
import { BsPencilSquare } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';

export const ItemWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-top: 20px;
  height: 128px;
  border-bottom: 1px solid lightgray;
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ProfileIcon = styled(CgProfile)`
  width: 46px;
  height: 46px;
  margin-right: 20px;
`;

export const MainWrapper = styled.div`
  width: 100%;
  padding-left: 10px;
`;
export const WriterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const Writer = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
export const Contents = styled.div``;

export const OptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

// TODO: 아이콘 크기 잘 안맞음. 교체하기!!
export const UpdateIcon = styled(BsPencilSquare)`
  font-size: 22px;
  cursor: pointer;
`;
export const DeleteIcon = styled(MdDeleteOutline)`
  font-size: 24px;
  cursor: pointer;
`;

export const DateString = styled.div`
  color: lightgray;
  padding-top: 15px;
  padding-left: 60px;
`;

export const Star = styled(Rate)`
  padding-left: 20px;
`;

export const PasswordModal = styled(Modal)``;

export const PasswordInput = styled.input`
  width: 100%;
  margin-top: 10px;
`;
