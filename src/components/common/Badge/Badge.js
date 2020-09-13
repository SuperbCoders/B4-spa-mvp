import React from 'react';
import classnames from 'classnames';

import { Badge as NativeBadge } from 'rsuite';

import './style.scss';

export default function Badge(props) {
  const {
    children: content,
    skin,
    className,

    ...forwardingProps
  } = props;

  return <NativeBadge
    classPrefix="badge"
    className={
      classnames({
        [className]: className,
        
        [`skin-${skin}`]: !!skin,
      })
    }
    content={ content }

    {...forwardingProps}
  />;
};
