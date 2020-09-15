import * as React from 'react';

import { Modal } from 'rsuite';

import { Logo } from '../Logo';
import { LoginForm } from '../Forms';

type TLoginModalProps = {
  toggle: VoidFunction;
  show: boolean;
};

export function LoginModal({ show, toggle }: TLoginModalProps): JSX.Element {
  return (
    <Modal
      dialogClassName="modal login-modal"
      backdropClassName="login-modal-backdrop"
      overflow={false}
      size="sm"
      show={show}
      onHide={toggle}
      backdrop={true}
    >
      <Modal.Header>
        <Logo mode="narrow" className="login-modal-logo" />
      </Modal.Header>
      <Modal.Body>{show && <LoginForm done={toggle} />}</Modal.Body>
    </Modal>
  );
}
