import * as React from 'react';
import { combineLatest } from 'rxjs';
import { userCompanyDataSended } from '../../../../stores';
import { ProcessNotification } from '../../../common/ProcessNotification';

export const ProcessNotificationCard = React.memo(
  (): JSX.Element => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect((): VoidFunction => {
      const sub = combineLatest([
        userCompanyDataSended.companyAccountsSended$,
        userCompanyDataSended.documentsSended$
      ]).subscribe((result): void => setIsVisible(result[0] && result[1]));

      return (): void => sub.unsubscribe();
    }, []);

    if (!isVisible) return <></>;

    return (
      <ProcessNotification label="Фоновый процесс">
        Обратабываем ваши документы и анкету. Уведомим, как все будет готово.
      </ProcessNotification>
    );
  }
);
