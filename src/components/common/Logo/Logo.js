import React from 'react';
import classnames from 'classnames';

import logo from 'assets/images/logo.png';
import logoNarrow from 'assets/images/logo-narrow.png';

import './style.scss';

export default function Logo(props) {
  const { className, mode = 'wide', ...forwardingProps } = props;

  const logoImage = mode === 'narrow' ? logoNarrow : logo;

  return <img src={ logoImage } className={classnames({
    'logo': true,
    [`is-${mode}`]: !!mode,
    [className]: !!className,
  })} alt="B4ALL" {...forwardingProps} />;
};
