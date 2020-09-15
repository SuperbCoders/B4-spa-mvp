import React from 'react';
import classnames from 'classnames';

import './style.scss';

type TSVGIconProps = {
  className?: string;
  round?: boolean;
  rounded?: boolean;
  width?: string | number;
  height?: string | number;
  children: React.ReactNode;
};

// TODO replace with NativeIcon component
export function SvgIcon(props: TSVGIconProps) {
  const { width = '16', height = '16' } = props;

  const className = classnames({
    'svg-icon': true,

    'is-round': !!props.round,
    'is-rounded': !!props.rounded,

    [props.className]: !!props.className
  });

  return (
    <span className={className} style={{ width, height }}>
      {props.children}
    </span>
  );
}
