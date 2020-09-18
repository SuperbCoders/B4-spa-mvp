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
  // @ts-ignore
  private _allDataSended$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  public allDataSended$: Observable<
    boolean
  > = this._allDataSended$.asObservable();

  constructor() {
    this.checkDocumentsSended();
    this.checkCompanyAccountsSended();
    this.subscribeOnSendChange();
  }

  public setDocumentsSended(): void {
    this._documentsSended$.next(true);
  }

  public setCompanyAccountsSended(): void {
    this._companyAccountsSended$.next(true);
  }

  private checkDocumentsSended(): void {}

  private checkCompanyAccountsSended(): void {}

  private subscribeOnSendChange(): void {
    this._documentsSended$.subscribe((res: boolean): void =>
      this._allDataSended$.next(res && this._companyAccountsSended$.value)
    );
    this._companyAccountsSended$.subscribe((res: boolean): void =>
      this._allDataSended$.next(res && this._documentsSended$.value)
    );
  }
}

export const userCompanyDataSended = new UserCompanyDataSended();
