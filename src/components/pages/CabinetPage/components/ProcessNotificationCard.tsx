import * as React from 'react';
import { combineLatest } from 'rxjs';
import {
  currentCompanyStorage,
  userCompanyDataSended
} from '../../../../stores';
import { ProcessNotification } from '../../../common/ProcessNotification';
import { useRxStream } from '../../../../utils/hooks';

const dependendStreams$ = combineLatest([
  userCompanyDataSended.companyAccountsSended$,
  userCompanyDataSended.documentsSended$,
  currentCompanyStorage.currentCompany$
]);

export const ProcessNotificationCard = React.memo(
  (): JSX.Element => {
    const [
      companyAccountsSended,
      documentsSended,
      currentCompany
    ] = useRxStream(dependendStreams$, [true, true, null]);
    const wasProcessed = currentCompany ? currentCompany.wasProcessed : true;
    const isVisible = companyAccountsSended && documentsSended && !wasProcessed;

    if (!isVisible) return <></>;

    return (
      <ProcessNotification label="Фоновый процесс">
        Обратабываем ваши документы и анкету. Уведомим, как все будет готово.
      </ProcessNotification>
    );
  }
);
