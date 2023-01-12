import styled from '@emotion/styled';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { TiClipboard } from 'react-icons/ti';
import { BiUser } from 'react-icons/bi';
import Modal from 'react-modal';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5rem;
`;

export const MyPageWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e5e5e5;
  border-radius: 20px;
  box-shadow: 0px 4px 16px 0px #00000033;
  padding: 70px;
  margin: 0 auto;
  overflow: hidden;
`;

export const UserInfoWrapper = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const UserWrapper = styled.div`
  width: 50%;
  display: flex;
  flex: 1;
  padding: 50px;
  margin: 0 auto;
  border-right: 2px solid #dedede;
`;

export const UserPhoto = styled.img`
  width: 100px;
  margin-right: 5rem;
`;

export const UserPointWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserDetailWrapper = styled.div`
  display: flex;
`;

export const UserProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  flex: 1;
  padding: 50px;
  margin-left: 1rem;
`;

export const UserProfileHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

export const UserProfileInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UserProfileIcon = styled(BiUser)`
  font-size: 18px;
  margin-right: 4px;
`;

export const UserTitle = styled.h3`
  margin: 0;
`;

export const UserDetails = styled.h2`
  font-size: 32px;
`;

export const ModalPointChargeBtn = styled.button`
  width: 217px;
  height: 35px;
  border-radius: 5px;
  cursor: pointer;
`;

export const UserMenuWrapper = styled.div`
  overflow: hidden;
`;

export const UserMenuUl = styled.ul`
  display: flex;
  margin-left: -10px;
  padding: 10px 0;
`;

export const UserMenuLi = styled.li`
  color: #8d8d8d;
  padding: 0 10px;
  background: url(//image.makeshop.co.kr/makeshop/d3/basic_simple/common/bu_2x8.gif) 0 7px no-repeat;
`;

export const UserManageWrapper = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 130px;
  border: 1px solid #000000;
  padding: 20px;
  margin: 0 auto;
`;

export const MarketManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  flex: 1;
  padding: 20px;
`;

export const MarketHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

export const MarketIcon = styled(AiOutlineShoppingCart)`
  font-size: 20px;
  margin-right: 4px;
`;

export const MarketTitle = styled.h3`
  margin-bottom: 0;
`;

export const MarketMenuWrapper = styled.div`
  overflow: hidden;
`;

export const MarketMenuUl = styled.ul`
  display: flex;
  margin-left: -10px;
  padding: 10px 0;
`;

export const MarketMenuLi = styled.li`
  color: #8d8d8d;
  padding: 0 10px;
  background: url(//image.makeshop.co.kr/makeshop/d3/basic_simple/common/bu_2x8.gif) 0 7px no-repeat;
`;

export const BoardManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
`;

export const BoardHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

export const BoardTitle = styled.h3`
  margin-bottom: 0;
`;

export const BoardIcon = styled(TiClipboard)`
  font-size: 20px;
  margin-right: 4px;
`;

export const ModalStyle = styled(Modal)`
  width: 464px;
  height: 316px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  background-color: #ffffff;
  margin-top: 200px !important;
  margin: 0 auto;
`;

export const ModalCloseButton = styled.button`
  width: 16px;
  height: 16px;
  background-color: transparent;
  border: none;
  margin: 0px 0px 50px 400px;
  cursor: pointer;
`;

export const ModalTitle = styled.div`
  width: 464px;
  height: 29px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 20px;
`;

export const ModalSelect = styled.select`
  width: 384px;
  height: 50px;
  border: none;
  border-bottom: 2px solid #000000;
  margin-bottom: 30px;
  outline: none;
  cursor: pointer;

  ::placeholder {
    font-weight: 400;
    font-size: 16px;
    color: #828282;
  }
`;

interface ModalButtonProps {
  isActive: boolean;
}

export const ModalButton = styled.button<ModalButtonProps>`
  width: 384px;
  height: 51px;
  background-color: ${(props) => (props.isActive ? 'black' : '#bdbdbd')};
  border: none;
  color: white;
  border-radius: 10px;
  padding: 14px 16px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
`;
