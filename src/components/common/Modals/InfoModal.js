import React from 'react';

import { Modal } from 'rsuite';
import Button from 'components/common/Button';

export default function UploadModal(props) {
  const { show, toggle } = props;

  return <Modal dialogClassName="modal info-modal" overflow={ false } size="lg" show={ show } onHide={ toggle } backdrop={ true }>
    <Modal.Header></Modal.Header>
    <Modal.Body>
      <div className="info-modal-results">
        <p>
          Cпасибо! <br />Мы обрабатываем документы
        </p>
        <Button skin="light" className="info-modal-results-button">Вернуться на главную</Button>
      </div>
    </Modal.Body>
  </Modal>;
};
