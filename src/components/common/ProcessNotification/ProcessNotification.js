import React from 'react';
import classNames from 'classnames';
// import { useState } from 'react';

import Badge from 'components/common/Badge';
import Button from 'components/common/Button';
import { Card, CardContent, CardControls } from 'components/common/Card';

import './style.scss';

export default function ProcessNotification(props) {
  // const [setProcessState] = useState(true);


  const { className: passedClassName, ...transferringProps } = props;

  const className = classNames({
    'process-notification': true,
    [props.className]: !!passedClassName,
  });

  return <Card className={ className } horizontal {...transferringProps}>
    <CardContent className="process-notification-content">
      <Badge className="process-notification-badge" skin="grey">{ props.label }</Badge>
      { props.children }
    </CardContent>

    <CardControls className="process-notification-controls" position="right">
      <Button appearance="link">Понятно</Button>
    </CardControls>
  </Card>;
};
