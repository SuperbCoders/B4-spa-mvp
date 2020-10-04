import * as React from 'react';

import './style.scss';
import { Logo } from '../../../../common/Logo';

export function MainPageFooter(): JSX.Element {
  return (
    <footer className="main-page-footer">
      <Logo className="main-page-footer__logo" />
      <span className="main-page-footer__copyright">
        Copyright © 2015-2020 b4all.com
      </span>
    </footer>
  );
}
