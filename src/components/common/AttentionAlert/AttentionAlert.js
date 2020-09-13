import React from 'react';
import { Message } from 'rsuite';

import './style.scss';

export default function AttentionAlert(props) {
  return <Message
    classPrefix="attention-alert"
    className={ props.className }
    description={
      <React.Fragment>
        <h1 className="attention-alert-title">
          { props.title }
        </h1>
        
        <div className="attention-alert-content">
          { props.children }
        </div>
      </React.Fragment>
    }
  />;
};
