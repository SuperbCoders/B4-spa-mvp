import * as React from 'react';
import { CompaniesSelect, HeaderControls } from './components';
import { Logo } from '../Logo';

import './style.scss';

export function Header(): JSX.Element {
  return (
    <header className="page-header">
      <div className="page-header__content">
        <Logo className="page-header__logo" />
        <CompaniesSelect />
        <HeaderControls />
      </div>
    </header>
  );
}
