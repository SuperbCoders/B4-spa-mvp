import React, { useContext } from 'react';

import { Header } from '../Header';
import { Footer } from '../Footer';

import './style.scss';
import { ModalsContext } from '../../../contexts/ModalsContext';

type TPageLayoutProps = {
  children: React.ReactNode;
};

export function PageLayout(props: TPageLayoutProps): JSX.Element {
  const store = useContext(ModalsContext);

  return (
    <section className="page-layout">
      <Header store={store} />
      <main className="page-layout-content">{props.children}</main>
      <Footer />
    </section>
  );
}
