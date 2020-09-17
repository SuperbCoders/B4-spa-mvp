import {
  b4Transport,
  TCompanyAccount,
  TCompanyAccountRequest,
  TCompanyInn
} from '../../../../transport';
import { BehaviorSubject, Observable } from 'rxjs';
import { currentCompanyStorage } from '../../../../stores';

class CompanyAccountsService {
  private currentCompany: TCompanyInn = '';
  // @ts-ignore
  private _accounts$: BehaviorSubject<TCompanyAccount[]> = new BehaviorSubject(
    []
  );

  public accounts$: Observable<
    TCompanyAccount[]
  > = this._accounts$.asObservable();

  constructor() {
    currentCompanyStorage.currentCompany$.subscribe(
      (company: TCompanyInn): void => {
        this.currentCompany = company;
      }
    );
  }

  public getCompanyAccounts(): void {
    b4Transport
      .getCompanyAccounts()
      .then((accounts: TCompanyAccount[]): void =>
        this._accounts$.next(accounts)
      );
  }

  public setNewCompanyAccount(
    newAccount: Omit<TCompanyAccountRequest, 'company'>
  ): void {
    b4Transport
      .setCompanyAccount({ ...newAccount, company: this.currentCompany })
      .then((data: TCompanyAccount): void => {
        const newList = this._accounts$.value.map(
          (account: TCompanyAccount): TCompanyAccount =>
            account.accountNumber === newAccount.accountNumber
              ? {
                  ...newAccount,
                  id: data.id,
                  dadata: data.dadata,
                  company: this.currentCompany
                }
              : account
        );

        this._accounts$.next(newList);
      });
  }

  public editCompanyAccount(editedAccount: TCompanyAccount): void {
    const newList = this._accounts$.value.map(
      (account: TCompanyAccount): TCompanyAccount =>
        account.id === editedAccount.id ? editedAccount : account
    );
    b4Transport
      .editCompanyAccount(editedAccount)
      .then((): void => this._accounts$.next(newList));
  }
}

export const companyAccountsService = new CompanyAccountsService();
