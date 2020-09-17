import * as React from 'react';

import { Modal, Form, FormGroup, ControlLabel, Input } from 'rsuite';

import { Button } from '../Button';

type TGuaranteeModalProps = {
  toggle: VoidFunction;
  show: boolean;
};

export function CompanyAccounts({
  show,
  toggle
}: TGuaranteeModalProps): JSX.Element {
  return (
    <Modal
      dialogClassName="modal guarantee-modal"
      overflow={false}
      show={show}
      onHide={toggle}
      size="lg"
      backdrop={true}
    >
      <Modal.Header>Счета в компании</Modal.Header>
      <Modal.Body>
        <Form className="form bank-guarantee-form">
          <FormGroup className="form-group bank-guarantee-form-type">
            <ControlLabel className="form-label">
              Наименование банка
            </ControlLabel>
            <Input type="text" placeholder="ПАО Абсолют-банк" />
            <ControlLabel className="form-label">Номер счета</ControlLabel>
            <Input type="text" placeholder="3453 1243 3621 1211" />
            <ControlLabel className="form-label">БИК</ControlLabel>
            <Input type="text" placeholder="0292341542113" />
            <Button className="bank-guarantee-form-submit" skin="inverse">
              Добавить
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
