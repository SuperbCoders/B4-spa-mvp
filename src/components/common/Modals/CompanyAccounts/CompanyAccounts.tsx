import * as React from 'react';

import { Modal, Form, FormGroup, ControlLabel, FormControl } from 'rsuite';
import { TCompanyAccountRequest } from '../../../../transport';

import { Button } from '../../Button';
import { AccountsList } from './AccountsList';
import { AccountNumberAccepter } from './field-accepters';
import { BankSelect } from './BankSelect';
import { accountsServiceEditor } from './accounts-editor.service';

type TGuaranteeModalProps = {
  toggle: VoidFunction;
  show: boolean;
};

const initialState = {
  bankName: '',
  accountNumber: '',
  bik: ''
};

export function CompanyAccounts({
  show,
  toggle
}: TGuaranteeModalProps): JSX.Element {
  const [state, setState] = React.useState<
    Omit<TCompanyAccountRequest, 'company'>
  >(initialState);
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect((): VoidFunction => {
    const sub = accountsServiceEditor.account$.subscribe(setState);
    const sub2 = accountsServiceEditor.isEditing$.subscribe(setIsEditing);

    return (): void => {
      accountsServiceEditor.reset();
      sub.unsubscribe();
      sub2.unsubscribe();
    };
  }, []);

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
              <BankSelect
                onSelect={accountsServiceEditor.handleSelectBank}
                value={{ bankName: state.bankName, bik: state.bik }}
              />
            </div>
            <div className="form-field-row">
              <ControlLabel className="form-label">Номер счета</ControlLabel>
              <FormControl
                type="text"
                required
                accepter={AccountNumberAccepter}
                onChange={accountsServiceEditor.handleTypeAccountNumber}
                value={state.accountNumber}
              />
            </div>
          </FormGroup>
          <Button skin="inverse" onClick={accountsServiceEditor.saveAccount}>
            {isEditing ? 'Сохранить' : 'Добавить'}
          </Button>
        </Form>
        <div className="accounts-list-wrapper">
          <AccountsList
            onSelectEdit={accountsServiceEditor.handleSelectEditAccount}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}
