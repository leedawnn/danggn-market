import styled from '@emotion/styled';
import { HiOutlineHeart } from 'react-icons/hi';
import Link from 'next/link';

const Navigation = () => {
  return (
    <Wrapper>
      <HeaderTop>
        <HeaderTopinner>
          <HeaderLeft>
            <HeaderMenus>
              <HeaderMenu>MARKET</HeaderMenu>
              <HeaderMenu>
                <Link href='/boards'>
                  <a>BOARD</a>
                </Link>
              </HeaderMenu>
            </HeaderMenus>
          </HeaderLeft>
          <Link href='/'>
            <Logo>댕근마켓</Logo>
          </Link>
          <HeaderRight>
            <HeaderRightMenus>
              <MenuItem>
                <Link href='/users/login'>
                  <a>Sign in</a>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href='/users/login'>
                  <a>Join</a>
                </Link>
              </MenuItem>
              <MenuItem>My</MenuItem>
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
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.047);
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
  font-size: 36px;
  font-family: 'SSShinb7';
  cursor: pointer;
`;

const HeaderMenus = styled.ul`
  display: flex;
`;

const HeaderMenu = styled.li`
  margin-left: 30px;
  cursor: pointer;
`;

const HeaderRight = styled.div`
  display: flex;
`;

const HeaderRightMenus = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuItem = styled.li`
  margin-left: 15px;
  cursor: pointer;
`;
