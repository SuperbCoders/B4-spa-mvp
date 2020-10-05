import { Subject, Observable } from 'rxjs';
import {
  TCompanyLandingInfo,
  b4Transport,
  TCompanyInn
} from '../../../transport';

class LandingDataService {
  private _data$: Subject<TCompanyLandingInfo> = new Subject();

  public data$: Observable<TCompanyLandingInfo> = this._data$.asObservable();

  public getLandingDataByInn(inn: TCompanyInn): void {
    b4Transport
      .getCompanyLandingInfoByINN(inn)
      .then((companyInfo: TCompanyLandingInfo): void =>
        this._data$.next(companyInfo)
      );
  }
}

export const landingDataService = new LandingDataService();
