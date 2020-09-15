import React from 'react';
import classNames from 'classnames';

type TCardTitleProps = {
  className: string;
  children: React.ReactNode;
};

export function CardTitle(props: TCardTitleProps): JSX.Element {
  const className = classNames({
    'card-title': true,
    [props.className]: props.className
  });

  return <div className={className}>{props.children}</div>;
}
