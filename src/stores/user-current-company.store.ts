import { BehaviorSubject, Observable } from 'rxjs';
import { b4Transport, TCompanyInn, TCompanyLandingInfo } from '../transport';
import { firebaseStore } from './firebase';

class UserCurrentCompanyStorage {
  // @ts-ignore
  private _allCompanies$: BehaviorSubject<
    TCompanyLandingInfo[]
  > = new BehaviorSubject([]);
  private _currentCompany$: BehaviorSubject<TCompanyInn> = new BehaviorSubject(
    ''
  );

  public currentCompany$: Observable<
    TCompanyInn
  > = this._currentCompany$.asObservable();

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
          });
      } else {
        this._allCompanies$.next([]);
      }
    });
  }

  public setCurrentCompany(currentCompany: TCompanyInn): void {
    this._currentCompany$.next(currentCompany);
  }
}

export const currentCompanyStorage = new UserCurrentCompanyStorage();
