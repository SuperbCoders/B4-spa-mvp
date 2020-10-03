import * as React from 'react';
import { combineLatest } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  currentCompanyStorage,
  userCompanyDataSended
} from '../../../../stores';
import { ProcessNotification } from '../../../common/ProcessNotification';
import { DEBOUNCE_TIME } from './consts';

export const ProcessNotificationCard = React.memo(
  (): JSX.Element => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect((): VoidFunction => {
      const sub = combineLatest([
        userCompanyDataSended.companyAccountsSended$,
        userCompanyDataSended.documentsSended$,
        currentCompanyStorage.currentCompany$
      ])
        .pipe(debounceTime(DEBOUNCE_TIME))
        .subscribe((result): void => {
          const [
            companyAccountsSended,
            documentsSended,
            currentCompany
          ] = result;
          const wasProcessed = currentCompany
            ? currentCompany.wasProcessed
            : true;

          setIsVisible(
            Boolean(companyAccountsSended && documentsSended && !wasProcessed)
          );
        });

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
