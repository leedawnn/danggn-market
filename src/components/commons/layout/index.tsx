import { ReactNode } from 'react';
import Navigation from './navigation';

interface ILayoutProps {
  children: ReactNode;
}

export default function Layout(props: ILayoutProps) {
  return (
    <>
      <Navigation />
      <div>{props.children}</div>
    </>
  );
}
