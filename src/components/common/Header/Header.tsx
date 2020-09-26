import * as React from 'react';
import { CompaniesSelect, HeaderControls } from './components';
import { Logo } from '../Logo';

import './style.scss';

export function Header(): JSX.Element {
  return (
    <header className="header">
      <a href="/">
        <Logo className="header-logo" />
      </a>

      <CompaniesSelect />
      <HeaderControls />
    </header>
  );
}
