import * as React from 'react';
import { TCompanyAccount } from '../../../../../../transport';
import { companyAccountsService } from '../../services';
import './style.scss';
import { AccountsListItem } from './AccountsListItem';

type TAccountsListProps = {
  onSelectEdit: (account: TCompanyAccount) => void;
};

export const AccountsList = React.memo(
  ({ onSelectEdit }: TAccountsListProps): JSX.Element => {
    const [accounts, setAccounts] = React.useState<TCompanyAccount[]>([]);

    React.useEffect((): VoidFunction => {
      const sub = companyAccountsService.accounts$.subscribe(setAccounts);

      return (): void => sub.unsubscribe();
    }, []);

    return (
      <div className="accounts-list">
        {accounts.map(
          (account: TCompanyAccount): JSX.Element => (
            <AccountsListItem
              account={account}
              onSelectEdit={onSelectEdit}
              key={account.id}
            />
          )
        )}
      </div>
    );
  }
);
