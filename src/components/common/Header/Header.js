import React from 'react';
import { useRef, useState } from 'react';
import useOnClickOutside from 'effects/useOnClickOutside';

import Logo from 'components/common/Logo';
import SvgIcon from 'components/common/SvgIcon';
import IconButton from 'components/common/IconButton';

import { ReactComponent as CaretDown } from 'assets/images/svg/caret-down.svg';
import { ReactComponent as Featured } from 'assets/images/svg/featured.svg';
import { ReactComponent as Logout } from 'assets/images/svg/logout.svg';

import {
  // Popover,
  Dropdown,
} from 'rsuite';

import './style.scss';

export default function Header(props) {
  const [isDropdownOpen, setDropdownState] = useState(false);

  const toggle = (e) => {
    setDropdownState(!isDropdownOpen);

    e.stopPropagation();
    return false;
  };

  const closeDropdown = () => {
    setDropdownState(false);
  };

  const ref = useRef();

  useOnClickOutside(ref, () => closeDropdown());

  return (
    <header className="header">
      <a className="header-logo" href="/">
       <Logo />
      </a>

      <div className="header-company" ref={ref}>
        <Dropdown  placement="bottomEnd" className="header-dropdown" open={isDropdownOpen} renderTitle={children => {
          return <div className="header-dropdown-toggle" onClick={toggle}>
            <div className="header-dropdown-label">
              OOO "Ромашка"
            </div>
            <SvgIcon className="header-dropdown-icon">
              <CaretDown width="12" height="7" />
            </SvgIcon>
          </div>;
        }}>
          <Dropdown.Item eventKey={1}>Action</Dropdown.Item>
          <Dropdown.Item eventKey={2}>Another action</Dropdown.Item>
          <Dropdown.Item eventKey={3}>Otherwise</Dropdown.Item>
        </Dropdown>
      </div>

      <div className="header-controls">
        <IconButton skin="light" circle className="header-controls-button favorites" icon={ <Featured width="20" height="20" /> } />
        <IconButton skin="default" className="header-controls-button logout" icon={ <Logout width="20" height="20" /> } />
      </div>
    </header>
  );
}
