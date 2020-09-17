import { b4Transport, TCompanyAccount } from '../../../../transport';
import { BehaviorSubject, Observable } from 'rxjs';

class CompanyAccountsService {
  // @ts-ignore
  private _accounts$: BehaviorSubject<TCompanyAccount[]> = new BehaviorSubject(
    []
  );

  public accounts$: Observable<
    TCompanyAccount[]
  > = this._accounts$.asObservable();

  public getCompanyAccounts(): void {
    b4Transport
      .getCompanyAccounts()
      .then((accounts: TCompanyAccount[]): void =>
        this._accounts$.next(accounts)
      );
  }

  public setNewCompanyAccount(newAccount: Partial<TCompanyAccount>): void {
    b4Transport
      .setCompanyAccount(newAccount)
      .then((data: TCompanyAccount): void => {
        const newList = this._accounts$.value.map(
          (account: TCompanyAccount): TCompanyAccount =>
            // @ts-ignore
            account.accountNumber === newAccount.accountNumber
              ? { ...newAccount, id: account.id }
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
