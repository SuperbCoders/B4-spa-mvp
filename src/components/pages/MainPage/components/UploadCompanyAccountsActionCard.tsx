import * as React from 'react';
import { userCompanyDataSended } from '../../../../stores';
import {
  Card,
  CardIcon,
  CardContent,
  CardTitle,
  CardControls
} from '../../../common/Card';
import { SvgIcon } from '../../../common/SvgIcon';
import { ModalsOpenerService } from '../modals-opener.service';

import { ReactComponent as DocumentsSearch } from '../../../../assets/images/svg/documents-search.svg';
import { Button } from '../../../common/Button';
import { debounceTime } from 'rxjs/operators';
import { DEBOUNCE_TIME } from './consts';

export const UploadCompanyAccountsActionCard = React.memo(
  (): JSX.Element => {
    const [companyAccountsSended, setCompanyAccountsSended] = React.useState(
      true
    );

    React.useEffect((): VoidFunction => {
      const sub = userCompanyDataSended.companyAccountsSended$
        .pipe(debounceTime(DEBOUNCE_TIME))
        .subscribe(setCompanyAccountsSended);

      return (): void => sub.unsubscribe();
    }, []);

    if (companyAccountsSended) return <></>;

    return (
      <Card className="mvp-action-card" horizontal>
        <CardIcon className="mvp-action-card-icon">
          <SvgIcon round>
            <DocumentsSearch width="36" height="36" />
          </SvgIcon>
        </CardIcon>

        <CardContent>
          <CardTitle>Проверить и заполнить анкету компании</CardTitle>
          Добавьте контактные данные, банковские счета, сведения о ключевых
          персонах. Часть данных заполнена из открытых источников.
        </CardContent>

        <CardControls position="right">
          <Button
            theme="light"
            onClick={ModalsOpenerService.openCompanyAccountsForm}
          >
            Перейти
          </Button>
        </CardControls>
      </Card>
    );
  }
);

UploadCompanyAccountsActionCard.displayName = 'UploadCompanyAccountsActionCard';
