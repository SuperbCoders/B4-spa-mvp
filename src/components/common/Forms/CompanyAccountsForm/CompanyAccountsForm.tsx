import * as React from 'react';

import { Form, FormGroup, ControlLabel, FormControl } from 'rsuite';
import { TCompanyAccountRequest } from '../../../../transport';

import { Button } from '../../Button';
import { FormWrapper } from '../components';
import { AccountsList, BankSelect } from './components';
import { AccountNumberAccepter } from './field-accepters';
import { accountsServiceEditor } from './services';

import './style.scss';

const initialState = {
  bankName: '',
  accountNumber: '',
  bik: ''
};

export function CompanyAccountsForm(): JSX.Element {
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
    <FormWrapper title="Счета в компании">
      <Form>
        <FormGroup className="company-accounts-form-fields">
          <div className="form-field-row">
            <ControlLabel>Банк</ControlLabel>
            <BankSelect
              onSelect={accountsServiceEditor.handleSelectBank}
              value={{ bankName: state.bankName, bik: state.bik }}
            />
          </div>
          <div className="form-field-row">
            <ControlLabel>Номер счета</ControlLabel>
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
    </FormWrapper>
  );
}
