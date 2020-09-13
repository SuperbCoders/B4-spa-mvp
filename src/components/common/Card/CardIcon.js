import React from 'react';
import classNames from 'classnames';

export default function CardIcon(props) {
  const className = classNames({
    'card-icon': true,
    
    [props.className]: props.className,
  });

  return <div className={ className }>
    { props.children }
  </div>;
};
