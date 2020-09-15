import React from 'react';

import { Modal } from 'rsuite';

import Logo from 'components/common/Logo';
import { LoginForm } from 'components/common/Forms';

const LoginModal = (props) => {
  const { show, toggle } = props;

  return (
    <Modal dialogClassName="modal login-modal" backdropClassName="login-modal-backdrop" overflow={ false } size="sm" show={ show } onHide={ toggle } backdrop={ true }>
      <Modal.Header>
        <Logo mode="narrow" className="login-modal-logo" />
      </Modal.Header>
      <Modal.Body>
        { show && <LoginForm done={ toggle } /> }
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
