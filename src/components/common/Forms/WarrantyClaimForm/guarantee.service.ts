import { b4Transport, TGuaranteeRequest } from '../../../../transport';

class GuaranteeService {
  public sendGuarantee(guarantee: TGuaranteeRequest): Promise<void> {
    return b4Transport.sendGuarantee(guarantee);
  }
}

export const guaranteeService = new GuaranteeService();
