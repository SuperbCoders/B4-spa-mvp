import { b4Transport, TGuaranteeRequest } from '../../../../transport';
import { TagManagerService } from '../../../../services';

class GuaranteeService {
  public sendGuarantee(guarantee: TGuaranteeRequest): Promise<void> {
    return b4Transport
      .sendGuarantee(guarantee)
      .then((): void => TagManagerService.pushEvent('guarantyLeadSend'));
  }
}

export const guaranteeService = new GuaranteeService();
