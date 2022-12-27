import styled from '@emotion/styled';
import { HiOutlineHeart } from 'react-icons/hi';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { CartState } from '../../../../commons/store';
import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { userInfoState } from '../../../../commons/store/Auth/UserInfoState';
import { IMutation } from '../../../../commons/types/generated/types';
import { message } from 'antd';

const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;

const Navigation = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [cart, setCart] = useRecoilState(CartState);

  const isHome = () => {
    if (router.asPath === '/') {
      return true;
    } else {
      return false;
    }
  };

  // useEffect(() => {
  //   const handleScroll = (e: any) => {
  //     const { innerHeight } = window;
  //     const { scrollHeight } = document.body;
  //     const myScroll = e.srcElement.scrollingElement.scrollTop;

  //     if (myScroll) console.log('전체 body 의 높이 : ' + scrollHeight);
  //     console.log('전체 스크롤바 높이 : ' + innerHeight);
  //     console.log('현재 스크롤 위치 : ' + myScroll);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  // }, []);

  const [logoutUser] = useMutation<Pick<IMutation, 'logoutUser'>>(LOGOUT_USER);

  const onClickLogOut = async () => {
    try {
      // await logoutUser();
      setUserInfo(undefined);
      message.success({ content: '로그아웃 되었습니다. 👋' });
      router.push('/');
    } catch (error) {
      if (error instanceof Error) throw error.message;
    }
  };

  useEffect(() => {}, [userInfo]);

  console.log(userInfo);

  return (
    <Wrapper isHome={isHome()}>
      <HeaderTop>
        <HeaderTopinner>
          <HeaderLeft>
            <HeaderMenus>
              <Link href='/market'>
                <a>
                  <HeaderMenu isHome={isHome()}>MARKET</HeaderMenu>
                </a>
              </Link>
              <Link href='/board'>
                <a>
                  <HeaderMenu isHome={isHome()}>BOARD</HeaderMenu>
                </a>
              </Link>
            </HeaderMenus>
          </HeaderLeft>
          <Link href='/'>
            <a>
              <Logo isHome={isHome()}>댕근마켓</Logo>
            </a>
          </Link>
          <HeaderRight>
            {userInfo && (
              <UserWrapper>
                <UserName>{userInfo?.name}님,</UserName>
                <UserPoint>{userInfo?.userPoint.amount} Point </UserPoint>
                <DivideBar>|</DivideBar>
              </UserWrapper>
            )}
            <HeaderRightMenus>
              {!userInfo ? (
                <Link href='/auth/signin'>
                  <a>
                    <MenuItem isHome={isHome()}>Sign in</MenuItem>
                  </a>
                </Link>
              ) : (
                <MenuItem onClick={onClickLogOut} isHome={isHome()}>
                  Logout
                </MenuItem>
              )}
              <Link href='/auth/join'>
                <a>
                  <MenuItem isHome={isHome()}>Join</MenuItem>
                </a>
              </Link>
              <Link href='/auth/mypage'>
                <a>
                  <MenuItem isHome={isHome()}>My</MenuItem>
                </a>
              </Link>
              <MenuItem isHome={isHome()}>
                Order <HiOutlineHeart style={{ marginRight: '2px' }} />
              </MenuItem>

              <MenuItem isHome={isHome()}>Cart({cart})</MenuItem>
            </HeaderRightMenus>
          </HeaderRight>
        </HeaderTopinner>
      </HeaderTop>
    </Wrapper>
  );
};
export default Navigation;

interface IsHomeProps {
  isHome: boolean;
}

const Wrapper = styled.div<IsHomeProps>`
  position: ${(props) => (props.isHome ? 'fixed' : 'sticky')};
  top: ${(props) => (props.isHome ? '0' : '-6px')};
  display: flex;
  width: 100%;
  height: 78px;
  padding: ${(props) => (props.isHome ? '50px 100px' : '20px 100px')};
  border-bottom: ${(props) => (props.isHome ? 'default' : '1px solid rgb(238, 238, 238)')};
  background-color: ${(props) => (props.isHome ? 'rgba(255, 255, 255, 0)' : '#ffffff')};
  opacity: ${(props) => (props.isHome ? 'default' : '0.7')};
  backdrop-filter: ${(props) => (props.isHome ? 'default' : 'blur(30px)')};
  z-index: 1;
`;

const HeaderTop = styled.div`
  display: flex;
  width: 100%;
`;

const HeaderTopinner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const HeaderLeft = styled.header``;

const Logo = styled.a<IsHomeProps>`
  font-family: 'SSShinb7';
  font-size: 36px;
  margin-left: 3rem;
  color: ${(props) => (props.isHome ? '#ffffff' : '#000000')};
  cursor: pointer;
`;

const HeaderMenus = styled.ul`
  display: flex;
`;

const HeaderMenu = styled.li<IsHomeProps>`
  margin-left: 30px;
  color: ${(props) => (props.isHome ? '#ffffff' : '#000000')};
  cursor: pointer;
`;

const HeaderRight = styled.div`
  display: flex;
`;

const UserWrapper = styled.div`
  display: flex;
`;

const UserName = styled.span`
  color: #ffffff;
  margin-right: 1rem;
`;

const UserPoint = styled.span`
  color: #ffffff;
  margin-right: 1rem;
`;

const DivideBar = styled.span`
  color: #ffffff;
`;

const HeaderRightMenus = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
`;

const MenuItem = styled.li<IsHomeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  color: ${(props) => (props.isHome ? '#ffffff' : '#000000')};
  cursor: pointer;
`;
