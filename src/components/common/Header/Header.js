import React, { useRef, useState, useContext } from 'react';

import Logo from 'components/common/Logo';
import SvgIcon from 'components/common/SvgIcon';
import Button from 'components/common/Button';
import IconButton from 'components/common/IconButton';

import useOnClickOutside from 'effects/useOnClickOutside';
import FirebaseContext from 'contexts/FirebaseContext';

import { ReactComponent as CaretDown } from 'assets/images/svg/caret-down.svg';
import { ReactComponent as Featured } from 'assets/images/svg/featured.svg';
import { ReactComponent as Logout } from 'assets/images/svg/logout.svg';

import { observer } from "mobx-react";

import {
  Dropdown,
} from 'rsuite';

import './style.scss';

const Header = (props) => {
  const [isDropdownOpen, setDropdownState] = useState(false);
  const firebase = useContext(FirebaseContext);
  const ref = useRef();

  console.log(':L:: header', firebase);

  const onLoginButtonClick = () => {
    props.store.openLoginModal();
  };

  const toggle = event => {
    setDropdownState(!isDropdownOpen);

    event.stopPropagation();
    return false;
  };

  const closeDropdown = () => {
    setDropdownState(false);
  };

  useOnClickOutside(ref, () => closeDropdown());

  return (
    <header className="header">
      <a href="/">
       <Logo className="header-logo" />
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
        {(() => {
          if (firebase.isLoggedIn) {
            return <>
              <IconButton skin="light" circle className="header-controls-button favorites" icon={ <Featured width="20" height="20" /> } />
              <IconButton skin="default" className="header-controls-button logout" icon={ <Logout width="20" height="20" /> } />
            </>
          };

          return <Button
            skin="inverse"
            className="header-controls-button login"
            onClick={ onLoginButtonClick }
          >
            Войти
          </Button>;
        })()}
      </div>
    </header>
  );
};

export default observer(Header);
