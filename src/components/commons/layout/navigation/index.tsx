import styled from '@emotion/styled';
import { HiOutlineHeart } from 'react-icons/hi';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { accessTokenState, userInfoState } from '../../../../commons/store';
import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';

const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser {
      accessToken
    }
  }
`;

const Navigation = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [logoutUser] = useMutation(LOGOUT_USER);

  const onClickLogOut = async () => {
    await logoutUser;
    setAccessToken('');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
    location.reload();
  };

  useEffect(() => {}, [accessToken]);

  return (
    <Wrapper>
      <HeaderTop>
        <HeaderTopinner>
          <HeaderLeft>
            <HeaderMenus>
              <Link href='/market'>
                <a>
                  <HeaderMenu>MARKET</HeaderMenu>
                </a>
              </Link>
              <Link href='/board'>
                <a>
                  <HeaderMenu>BOARD</HeaderMenu>
                </a>
              </Link>
            </HeaderMenus>
          </HeaderLeft>
          <Link href='/'>
            <Logo>댕근마켓</Logo>
          </Link>
          <HeaderRight>
            <HeaderRightMenus>
              {/* accessToken 유무로 바꾸기 */}
              {!userInfo.name ? (
                <Link href='/user/signin'>
                  <a>
                    <MenuItem>Sign in</MenuItem>
                  </a>
                </Link>
              ) : (
                <MenuItem onClick={onClickLogOut}>Logout</MenuItem>
              )}
              <Link href='/user/join'>
                <a>
                  <MenuItem>Join</MenuItem>
                </a>
              </Link>
              <Link href='/user/mypage'>
                <a>
                  <MenuItem>My</MenuItem>
                </a>
              </Link>
              <MenuItem>Order</MenuItem>
              <HiOutlineHeart />
              <MenuItem>Cart(0)</MenuItem>
            </HeaderRightMenus>
          </HeaderRight>
        </HeaderTopinner>
      </HeaderTop>
    </Wrapper>
  );
};
export default Navigation;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0);
`;

const HeaderTop = styled.div`
  width: 100%;
  height: 88px;
`;

const HeaderTopinner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 88px;
  padding: 35px 150px;
`;

const HeaderLeft = styled.header``;

const Logo = styled.a`
  font-family: 'SSShinb7';
  font-size: 36px;
  color: #ffffff;
  cursor: pointer;
`;

const HeaderMenus = styled.ul`
  display: flex;
`;

const HeaderMenu = styled.li`
  margin-left: 30px;
  color: #ffffff;
  cursor: pointer;
`;

const HeaderRight = styled.div`
  display: flex;
`;

const HeaderRightMenus = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
`;

const MenuItem = styled.li`
  margin-left: 15px;
  color: #ffffff;
  cursor: pointer;
`;
