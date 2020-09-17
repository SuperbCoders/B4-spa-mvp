import { BehaviorSubject, Observable } from 'rxjs';
import { b4Transport, TCompanyInn, TCompanyLandingInfo } from '../transport';
import { firebaseStore } from './firebase';

class UserCurrentCompanyStorage {
  // @ts-ignore
  private _allCompanies$: BehaviorSubject<
    TCompanyLandingInfo[]
  > = new BehaviorSubject([]);
  // @ts-ignore
  private _currentCompany$: BehaviorSubject<TCompanyLandingInfo | null> = new BehaviorSubject(
    null
  );

  public currentCompany$: Observable<TCompanyLandingInfo | null> = this._currentCompany$.asObservable();
  public currentCompany: TCompanyLandingInfo | null = this._currentCompany$
    .value;

  public allCompanies$: Observable<
    TCompanyLandingInfo[]
  > = this._allCompanies$.asObservable();

  constructor() {
    firebaseStore.isLoggedIn$.subscribe((isLoggedIn: boolean): void => {
      if (isLoggedIn) {
        b4Transport
          .getCurrentUserCompanies()
          .then((companies: TCompanyLandingInfo[]): void => {
            this._allCompanies$.next(companies);
            this._currentCompany$.next(companies[0]);
          });
      } else {
        this._allCompanies$.next([]);
      }
    });
  }

  public setCurrentCompany(currentCompany: TCompanyInn): void {
    const fullInfo: TCompanyLandingInfo = this._allCompanies$.value.find(
      ({ inn }: TCompanyLandingInfo): boolean => inn === currentCompany
    ) as TCompanyLandingInfo;
    this._currentCompany$.next(fullInfo);
  }
}

export const currentCompanyStorage = new UserCurrentCompanyStorage();
