import React from 'react';
import classnames from 'classnames';

import { Panel } from 'rsuite';

export default function Card(props) {
  const { horizontal, className, ...forwardingProps } = props;

  return <Panel
    classPrefix="card"
    className={
      classnames({
        'direction-horizontal': !!props.horizontal,

        [className]: className,
      })
    }

    {...forwardingProps}
  >
    { props.children }
  </Panel>;
};
