import * as React from 'react';

import { Header } from '../Header';
import { Footer } from '../Footer';

import './style.scss';

type TPageLayoutProps = {
  children: React.ReactNode;
};

export function PageLayout(props: TPageLayoutProps): JSX.Element {
  return (
    <section className="page-layout">
      <Header />
      <main className="page-layout-content">{props.children}</main>
      <Footer />
    </section>
  );
}
