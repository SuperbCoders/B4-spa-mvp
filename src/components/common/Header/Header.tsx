import * as React from 'react';
import { CompaniesSelect, HeaderControls } from './components';
import { Logo } from '../Logo';

import './style.scss';

export function Header(): JSX.Element {
  return (
    <header>
      <div className="header">
        <Logo className="header-logo" />
        <CompaniesSelect />
        <HeaderControls />
      </div>
    </header>
  );
}
