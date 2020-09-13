import React from 'react';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

import './style.scss';

export default function PageLayout(props) {
  return (
    <section className="page-layout">
      <Header />
      <main className="page-layout-content">
        { props.children }
      </main>
      <Footer />
    </section>
  );
}
