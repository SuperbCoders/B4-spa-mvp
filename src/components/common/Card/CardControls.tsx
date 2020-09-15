import React from 'react';
import classNames from 'classnames';

type TCardControlsProps = {
  position: string;
  className: string;
  children: React.ReactNode;
};

export function CardControls(props: TCardControlsProps): JSX.Element {
  const className = classNames({
    'card-controls': true,
    [`position-${props.position}`]: !!props.position,

    [props.className]: props.className
  });

  return <div className={className}>{props.children}</div>;
}
