import { modalWrapperService } from '../../../services';
import { WarrantyClaimForm } from '../../common/Modals';
import * as React from 'react';

export abstract class ModalsOpenerService {
  public static openWarrantyModal(): void {
    modalWrapperService.openModal({ component: <WarrantyClaimForm /> });
  }
}
