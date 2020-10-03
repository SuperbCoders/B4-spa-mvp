import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { currentCompanyStorage, firebaseStore } from 'stores';
import {
  b4Transport,
  TCompanyLandingInfo,
  TCompanyRecommendsResponse
} from '../../../../../transport';

class TendersService {
  // @ts-ignore
  private _tenders$: BehaviorSubject<
    TCompanyRecommendsResponse[]
  > = new BehaviorSubject([]);

  public tenders$: Observable<
    TCompanyRecommendsResponse[]
  > = this._tenders$.asObservable();

  constructor() {
    this.getCompanyTenders();
  }

  private getCompanyTenders(): void {
    firebaseStore.isLoggedIn$.subscribe((isLoggedIn: boolean): void => {
      let sub: Subscription | undefined;

      if (isLoggedIn) {
        sub = currentCompanyStorage.currentCompany$.subscribe((currentCompany: TCompanyLandingInfo | null): void => {
          const inn = currentCompany?.inn || null;
          const wasProcessed = currentCompany?.wasProcessed || false;

          if (inn && wasProcessed) {
            b4Transport
            .getRecommends(inn)
            .then((recommends: TCompanyRecommendsResponse[]): void => {
              this._tenders$.next(recommends);
            });
          }
        });
      } else {
        sub && sub.unsubscribe();
      }
    });
  }
}

export const tendersService = new TendersService();
