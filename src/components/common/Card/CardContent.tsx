import React from 'react';
import classNames from 'classnames';

type TCardContentProps = {
  children: React.ReactNode;
  className: string;
};

export function CardContent(props: TCardContentProps): JSX.Element {
  const className = classNames({
    'card-content': true,
    [props.className]: props.className
  });

  return <div className={className}>{props.children}</div>;
}
