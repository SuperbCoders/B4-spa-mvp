import * as React from 'react';
import { CompaniesSelect, HeaderControls } from './components';
import { Logo } from '../Logo';

import { firebaseStore } from '../../../stores';

import { observer } from 'mobx-react';

import './style.scss';

export const Header = observer(
  (): JSX.Element => {
    console.log(':L:: header', firebaseStore);

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
);
