import {
  b4Transport,
  TCompanyAccount,
  TCompanyAccountRequest,
  TCompanyInn,
  TCompanyLandingInfo
} from '../../../../transport';
import { BehaviorSubject, Observable } from 'rxjs';
import { currentCompanyStorage } from '../../../../stores';

class CompanyAccountsService {
  private currentCompany: TCompanyInn | null = null;
  // @ts-ignore
  private _accounts$: BehaviorSubject<TCompanyAccount[]> = new BehaviorSubject(
    []
  );

  public accounts$: Observable<
    TCompanyAccount[]
  > = this._accounts$.asObservable();

  constructor() {
    currentCompanyStorage.currentCompany$.subscribe(
      (company: TCompanyLandingInfo | null): void => {
        this.currentCompany = company?.inn || null;
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
    if (!this.currentCompany) {
      throw new Error(
        'InvalidProgrammState: компания должна быть уже назначена к этому моменту'
      );
    }
    b4Transport
      .setCompanyAccount({ ...newAccount, company: this.currentCompany })
      .then((data: TCompanyAccount): void => {
        const newList = this._accounts$.value.map(
          (account: TCompanyAccount): TCompanyAccount =>
            // @ts-ignore тайпскрипт не раздупляет, что проверка уже была
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
