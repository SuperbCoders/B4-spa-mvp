import * as React from 'react';
import { ProcessNotification } from '../../../common/ProcessNotification';
import { useRxStream } from '../../../../utils/hooks';
import { processNotificationCardVisibilityStreams$ } from './consts';

export const ProcessNotificationCard = React.memo(
  (): JSX.Element => {
    const [
      companyAccountsSended,
      documentsSended,
      currentCompany
    ] = useRxStream(processNotificationCardVisibilityStreams$, [
      true,
      true,
      null
    ]);
    const wasProcessed = currentCompany ? currentCompany.wasProcessed : true;
    const isVisible = companyAccountsSended && documentsSended && !wasProcessed;

    if (!isVisible) return <></>;

    return (
      <ProcessNotification label="Фоновый процесс">
        Обратабываем ваши документы и&nbsp;анкету. Уведомим, как все будет
        готово.
      </ProcessNotification>
    );
  }
);
