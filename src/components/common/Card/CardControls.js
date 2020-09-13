import React from 'react';
import classNames from 'classnames';

export default function CardControls(props) {
  const className = classNames({
    'card-controls': true,
    [`position-${props.position}`]: !!props.position,
    
    [props.className]: props.className,
  });

  return <div className={ className }>
    { props.children }
  </div>;
};
