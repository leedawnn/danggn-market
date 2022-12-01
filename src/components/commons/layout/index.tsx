import { ReactNode } from 'react';
import Footer from './footer';
import Navigation from './navigation';

interface ILayoutProps {
  children: ReactNode;
}

export default function Layout(props: ILayoutProps) {
  return (
    <>
      <Navigation />
      <div>{props.children}</div>
      <Footer />
    </>
  );
}
