import * as React from 'react';

import { Modal, Form, FormGroup, ControlLabel, Input } from 'rsuite';
import { TCompanyAccountRequest } from '../../../../transport';

import { Button } from '../../Button';
import { AccountsList } from './AccountsList';
import { companyAccountsService } from './company-accounts.service';

type TGuaranteeModalProps = {
  toggle: VoidFunction;
  show: boolean;
};

export function CompanyAccounts({
  show,
  toggle
}: TGuaranteeModalProps): JSX.Element {
  const [state, setState] = React.useState<
    Omit<TCompanyAccountRequest, 'company'>
  >({
    bankName: '',
    accountNumber: '',
    bik: ''
  });

  function getFieldUpdater(
    field: keyof TCompanyAccountRequest
  ): (value: string) => void {
    return (value: string): void => setState({ ...state, [field]: value });
  }

  function handleSumbit(): void {
    companyAccountsService.setNewCompanyAccount(state);
  }

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
            <Input
              type="text"
              placeholder="ПАО Абсолют-банк"
              required
              onChange={getFieldUpdater('bankName')}
            />
            <ControlLabel className="form-label">Номер счета</ControlLabel>
            <Input
              type="text"
              placeholder="3453 1243 3621 1211"
              required
              onChange={getFieldUpdater('accountNumber')}
            />
            <ControlLabel className="form-label">БИК</ControlLabel>
            <Input
              type="text"
              placeholder="0292341542113"
              required
              onChange={getFieldUpdater('bik')}
            />
            <Button
              className="bank-guarantee-form-submit"
              skin="inverse"
              onClick={handleSumbit}
            >
              Добавить
            </Button>
          </FormGroup>
        </Form>
        <AccountsList />
      </Modal.Body>
    </Modal>
  );
}
