import { BehaviorSubject, Observable } from 'rxjs';

class UserCompanyDataSended {
  // @ts-ignore
  private _documentsSended$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  // @ts-ignore
  private _companyAccountsSended$: BehaviorSubject<
    boolean
  > = new BehaviorSubject(false);

  public companyAccountsSended$: Observable<
    boolean
  > = this._companyAccountsSended$.asObservable();

  public documentsSended$: Observable<
    boolean
  > = this._documentsSended$.asObservable();

  public setDocumentsSended(isSended: boolean): void {
    this._documentsSended$.next(isSended);
  }

  public setCompanyAccountsSended(isSended: boolean): void {
    this._companyAccountsSended$.next(isSended);
  }
}

export const userCompanyDataSended = new UserCompanyDataSended();
