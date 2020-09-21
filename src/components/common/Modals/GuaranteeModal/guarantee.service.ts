import { BehaviorSubject, Observable } from 'rxjs';

import { b4Transport, TGuaranteeRequest } from '../../../../transport';

class GuaranteeService {
  // @ts-ignore
  private _isSended$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public isSended$: Observable<boolean> = this._isSended$.asObservable();

  public sendGuarantee(guarantee: TGuaranteeRequest): void {
    b4Transport.sendGuarantee(guarantee);
  }
}

export const guaranteeService = new GuaranteeService();
