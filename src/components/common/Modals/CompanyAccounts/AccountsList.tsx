import { SvgIcon } from '../../SvgIcon';
import * as React from 'react';
import { TCompanyAccount } from '../../../../transport';
import { companyAccountsService } from './company-accounts.service';
import { ReactComponent as Pencil } from './shape.svg';
import './style.scss';

export const AccountsList = React.memo(
  (): JSX.Element => {
    const [accounts, setAccounts] = React.useState<TCompanyAccount[]>([]);

    React.useEffect((): VoidFunction => {
      const sub = companyAccountsService.accounts$.subscribe(setAccounts);

      return (): void => sub.unsubscribe();
    }, []);

    return (
      <div className="accounts-list">
        {accounts.map(
          ({
            bankName,
            accountNumber,
            bik,
            id
          }: TCompanyAccount): JSX.Element => (
            <div key={id} className="accounts-list__item">
              <div className="accounts-list__item--column">
                <div className="accounts-list__item--column-name">
                  Наименование банка
                </div>
                <div className="accounts-list__item--column-value">
                  {bankName}
                </div>
              </div>
              <div className="accounts-list__item--column">
                <div className="accounts-list__item--column-name">
                  Номер счета
                </div>
                <div className="accounts-list__item--column-value">
                  {accountNumber}
                </div>
              </div>
              <div className="accounts-list__item--column">
                <div className="accounts-list__item--column-name">БИК</div>
                <div className="accounts-list__item--column-value">{bik}</div>
              </div>
              <div className="accounts-list__item--column accounts-list__item--column-button-wrap">
                <div className="accounts-list__item--column-button">
                  <SvgIcon>
                    <Pencil
                      width="20"
                      height="20"
                      className="accounts-list__item--column-button__icon"
                    />
                  </SvgIcon>
                  <div className="accounts-list__item--column-button__text">
                    Изменить
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
);
