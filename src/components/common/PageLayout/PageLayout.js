import React from 'react';
import { useContext } from 'react';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

import './style.scss';
import ModalsContext from 'contexts/ModalsContext';

export default function PageLayout(props) {
  const store = useContext(ModalsContext);

  return (
    <section className="page-layout">
      <Header store={ store } />
      <main className="page-layout-content">
        { props.children }
      </main>
      <Footer />
    </section>
  );
}
