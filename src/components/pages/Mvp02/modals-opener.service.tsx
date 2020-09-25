import { modalWrapperService } from '../../../services';
import {
  UploadCompanyDocumentsForm,
  WarrantyClaimForm
} from '../../common/Modals';
import * as React from 'react';

export abstract class ModalsOpenerService {
  public static openWarrantyModal(): void {
    modalWrapperService.openModal({ component: <WarrantyClaimForm /> });
  }

  public static openUploadCompanyDocumentsForm(): void {
    modalWrapperService.openModal({
      component: <UploadCompanyDocumentsForm />
    });
  }
}
