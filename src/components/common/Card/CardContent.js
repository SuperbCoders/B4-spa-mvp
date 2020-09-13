import React from 'react';
import classNames from 'classnames';

export default function CardContent(props) {
  const className = classNames({
    'card-content': true,
    
    [props.className]: props.className,
  });

  return <div className={ className }>
    { props.children }
  </div>;
};
