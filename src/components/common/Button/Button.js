import React from 'react';
import classNames from 'classnames';

import { Button as NativeButton } from 'rsuite';

import SvgIcon from 'components/common/SvgIcon';

import { ReactComponent as CaretDown } from 'assets/images/svg/caret-down.svg';

import './style.scss';

export default function Button(props) {
  const { arrow, skin, className: passedClassName, ...transferringProps } = props;

  const className = classNames({
    'btn': true,

    'is-primary': props.appearance === 'primary',
    'is-link': props.appearance === 'link',
    'is-ghost': props.appearance === 'ghost',
    'is-arrow': !!arrow,

    [`skin-${skin}`]: !!skin,
    [`size-${props.size}`]: !!props.size,
    
    [props.className]: !!passedClassName,
  });

  return <NativeButton className={ className } {...transferringProps}>
    <span className="btn-content">{ props.children }</span>

    {(() => {
      if (props.arrow) {
        return <SvgIcon className="btn-arrow"><CaretDown width="14" height="8" /></SvgIcon>
      }
    })()}
  </NativeButton>;
};
