import React from 'react';
import classNames from 'classnames';

export default function CardFooter(props) {
  const className = classNames({
    'card-footer': true,
    
    [props.className]: props.className,
  });

  return <div className={ className }>
    { props.children }
  </div>;
};
