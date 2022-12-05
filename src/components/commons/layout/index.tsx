import styled from '@emotion/styled';
import { ReactNode } from 'react';
import Footer from './footer';
import Navigation from './navigation';

interface ILayoutProps {
  children: ReactNode;
}

export default function Layout(props: ILayoutProps) {
  return (
    <Wrapper>
      <Navigation />
      <div>{props.children}</div>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
`;
