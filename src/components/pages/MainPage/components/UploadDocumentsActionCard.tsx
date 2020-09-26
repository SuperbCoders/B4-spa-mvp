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

import { ReactComponent as DocumentsAdd } from '../../../../assets/images/svg/documents-add.svg';
import { Button } from '../../../common/Button';

export const UploadDocumentsActionCard = React.memo(
  (): JSX.Element => {
    const [documentsSended, setDocumentsSended] = React.useState(true);

    React.useEffect((): VoidFunction => {
      const sub = userCompanyDataSended.documentsSended$.subscribe(
        setDocumentsSended
      );

      return (): void => sub.unsubscribe();
    }, []);

    if (documentsSended) return <></>;

    return (
      <Card className="mvp-action-card" horizontal>
        <CardIcon className="mvp-action-card-icon">
          <SvgIcon round>
            <DocumentsAdd width="36" height="36" />
          </SvgIcon>
        </CardIcon>

        <CardContent>
          <CardTitle>Приложить сканы документов</CardTitle>
          Вам потребуются сканы устава, паспорта генерального директора,
          отчетность за пошлый год – и другие стандартные документы о компании.
        </CardContent>

        <CardControls position="right">
          <Button
            theme="light"
            onClick={ModalsOpenerService.openUploadCompanyDocumentsForm}
          >
            Приложить
          </Button>
        </CardControls>
      </Card>
    );
  }
);

UploadDocumentsActionCard.displayName = 'UploadDocumentsActionCard';
