import * as React from 'react';

import { Modal, Form, FormGroup, ControlLabel, FormControl } from 'rsuite';
import { TCompanyAccountRequest } from '../../../../transport';

import { Button } from '../../Button';
import { AccountsList } from './AccountsList';
import { companyAccountsService } from './company-accounts.service';
import { AccountNumberAccepter } from './field-accepters';
import { BankSelect, TBankItem } from './BankSelect';

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

  function handleSumbit(): void {
    companyAccountsService.setNewCompanyAccount(state);
  }

  const onSelectBank = React.useCallback(
    ({ bankName, bik }: TBankItem): void =>
      setState({ ...state, bankName, bik }),
    [state]
  );

  const handleAccountNumberType = React.useCallback(
    (accountNumber: string): void => setState({ ...state, accountNumber }),
    [state]
  );

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
            <div className="form-field-row">
              <ControlLabel className="form-label">Банк</ControlLabel>
              <BankSelect onSelect={onSelectBank} />
            </div>
            <div className="form-field-row">
              <ControlLabel className="form-label">Номер счета</ControlLabel>
              <FormControl
                type="text"
                placeholder="3453 1243 3621 1211"
                required
                accepter={AccountNumberAccepter}
                onChange={handleAccountNumberType}
              />
            </div>

            <Button skin="inverse" onClick={handleSumbit}>
              Добавить
            </Button>
          </FormGroup>
        </Form>
        <div className="accounts-list-wrapper">
          <AccountsList />
        </div>
      </Modal.Body>
    </Modal>
  );
}
