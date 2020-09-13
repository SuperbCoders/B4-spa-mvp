import React from 'react';
import classNames from 'classnames';

export default function CardTitle(props) {
  const className = classNames({
    'card-title': true,
    
    [props.className]: props.className,
  });

  return <div className={ className }>
    { props.children }
  </div>;
};
