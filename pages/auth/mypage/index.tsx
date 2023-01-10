import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { withAuth } from '../../../src/commons/libraries/withAuth';
import { userInfoState } from '../../../src/commons/store/Auth/UserInfoState';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { TiClipboard } from 'react-icons/ti';
import { BiUser } from 'react-icons/bi';

const MyPage = () => {
  const [userInfo] = useRecoilState(userInfoState);

  const handleImageError = (event: any) => {
    event.target.src = '/defaultProfile.png';
  };

  return (
    <Wrapper>
      <MyPageWrapper>
        <UserInfoWrapper>
          <UserWrapper>
            <UserPhoto src={userInfo?.picture} onError={handleImageError} alt='프로필 이미지' />
            <UserPointWrapper>
              <UserDetailWrapper>
                <UserDetails>{userInfo?.name}님, &nbsp;</UserDetails>
                <UserDetails>{userInfo?.userPoint} Point</UserDetails>
              </UserDetailWrapper>
              {/* TODO: 포인트 충전 모달 컴포넌트 분리 */}
              <ModalPointChargeBtn>포인트 충전하기</ModalPointChargeBtn>
            </UserPointWrapper>
          </UserWrapper>
          <UserProfileWrapper>
            <UserProfileHeader>
              <UserProfileIcon />
              <UserTitle>유저 관리</UserTitle>
            </UserProfileHeader>
            <UserMenuWrapper>
              <UserMenuUl>
                <UserMenuLi>프로필 수정</UserMenuLi>
                <UserMenuLi>비밀번호 변경</UserMenuLi>
              </UserMenuUl>
            </UserMenuWrapper>
          </UserProfileWrapper>
        </UserInfoWrapper>
        <UserManageWrapper>
          <MarketManageWrapper>
            <MarketHeader>
              <MarketIcon />
              <MarketTitle>중고거래</MarketTitle>
            </MarketHeader>
            <MarketMenuWrapper>
              <MarketMenuUl>
                <MarketMenuLi>판매한 상품</MarketMenuLi>
                <MarketMenuLi>구매한 상품</MarketMenuLi>
                <MarketMenuLi>장바구니</MarketMenuLi>
              </MarketMenuUl>
            </MarketMenuWrapper>
          </MarketManageWrapper>
          <BoardManageWrapper>
            <BoardHeader>
              <BoardIcon />
              <BoardTitle>게시판</BoardTitle>
            </BoardHeader>
            <MarketMenuWrapper>
              <MarketMenuUl>
                <MarketMenuLi>내 게시글 보기</MarketMenuLi>
              </MarketMenuUl>
            </MarketMenuWrapper>
          </BoardManageWrapper>
        </UserManageWrapper>
      </MyPageWrapper>
    </Wrapper>
  );
};
export default withAuth(MyPage);

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
`;

const MyPageWrapper = styled.div`
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

const UserInfoWrapper = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const UserWrapper = styled.div`
  width: 50%;
  display: flex;
  flex: 1;
  padding: 50px;
  margin: 0 auto;
  border-right: 2px solid #dedede;
`;

const UserPhoto = styled.img`
  width: 100px;
  margin-right: 5rem;
`;

const UserPointWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserDetailWrapper = styled.div`
  display: flex;
`;

const UserProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  flex: 1;
  padding: 50px;
  margin-left: 1rem;
`;

const UserProfileHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const UserProfileInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserProfileIcon = styled(BiUser)`
  font-size: 18px;
  margin-right: 4px;
`;

const UserTitle = styled.h3`
  margin: 0;
`;

const UserDetails = styled.h2`
  font-size: 32px;
`;

const ModalPointChargeBtn = styled.button`
  width: 217px;
  height: 35px;
  border-radius: 5px;
  cursor: pointer;
`;

const UserMenuWrapper = styled.div`
  overflow: hidden;
`;

const UserMenuUl = styled.ul`
  display: flex;
  margin-left: -10px;
  padding: 10px 0;
`;

const UserMenuLi = styled.li`
  color: #8d8d8d;
  padding: 0 10px;
  background: url(//image.makeshop.co.kr/makeshop/d3/basic_simple/common/bu_2x8.gif) 0 7px no-repeat;
`;

const UserManageWrapper = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 130px;
  border: 1px solid #000000;
  padding: 20px;
  margin: 0 auto;
`;

const MarketManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  flex: 1;
  padding: 20px;
`;

const MarketHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const MarketIcon = styled(AiOutlineShoppingCart)`
  font-size: 20px;
  margin-right: 4px;
`;

const MarketTitle = styled.h3`
  margin-bottom: 0;
`;

const MarketMenuWrapper = styled.div`
  overflow: hidden;
`;

const MarketMenuUl = styled.ul`
  display: flex;
  margin-left: -10px;
  padding: 10px 0;
`;

const MarketMenuLi = styled.li`
  color: #8d8d8d;
  padding: 0 10px;
  background: url(//image.makeshop.co.kr/makeshop/d3/basic_simple/common/bu_2x8.gif) 0 7px no-repeat;
`;

const BoardManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const BoardTitle = styled.h3`
  margin-bottom: 0;
`;

const BoardIcon = styled(TiClipboard)`
  font-size: 20px;
  margin-right: 4px;
`;
