import * as React from 'react';
import { CompaniesSelect, HeaderControls } from './components';
import { Logo } from '../Logo';

import './style.scss';

export function Header(): JSX.Element {
  return (
    <header className="header">
      <Logo className="header-logo" />
      <CompaniesSelect />
      <HeaderControls />
    </header>
  );
}
