import { BehaviorSubject, Observable } from 'rxjs';
import {
  b4Transport,
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

  public getCompanyTenders(): void {
    b4Transport
      .getRecommends()
      .then((recommends: TCompanyRecommendsResponse[]): void => {
        this._tenders$.next(recommends);
      });
  }
}

export const tendersService = new TendersService();
