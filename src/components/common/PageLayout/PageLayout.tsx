import * as React from 'react';

import { Header } from '../Header';
import { Footer } from '../Footer';

import './style.scss';

type TPageLayoutProps = {
  children: React.ReactNode;
  background?: 'default' | 'main';
};

export function PageLayout({
  children,
  background = 'default'
}: TPageLayoutProps): JSX.Element {
  return (
    <section
      className="page-layout"
      style={{
        backgroundColor: background === 'default' ? 'white' : '#fcfcfa'
      }}
    >
      <Header />
      <main className="page-layout-content">{children}</main>
      <Footer />
    </section>
  );
}
