import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import SideBar from '../sideBar';
import Footer from './footer';
import Navigation from './navigation';

interface ILayoutProps {
  children: ReactNode;
}

export default function Layout(props: ILayoutProps) {
  const router = useRouter();

  const HIDE_SIDEBAR = [
    '/',
    '/auth/signin',
    '/auth/join',
    '/auth/signin',
    '/auth/mypage',
    '/auth/mypage/profile',
    '/auth/order',
    '/auth/cart',
    '/board/[id]/edit',
    '/board/new',
    '/market',
    '/market/create',
  ];

  const isShowSideBar = HIDE_SIDEBAR.includes(router.pathname);

  return (
    <Wrapper>
      <Navigation />
      <div>{props.children}</div>
      {!isShowSideBar && <SideBar />}
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  min-height: 100%;
`;
