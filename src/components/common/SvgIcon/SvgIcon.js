import React from 'react';
import classnames from 'classnames';

import './style.scss';

// TODO replace with NativeIcon component
export default function SvgIcon(props) {
  const { width = '16', height = '16' } = props;

  const className = classnames({
    'svg-icon': true,

    'is-round': !!props.round,
    'is-rounded': !!props.rounded,

    [props.className]: !!props.className,
  });

  return <span className={ className } width={ width } height={ height } >
    { props.children }
  </span>;
};
