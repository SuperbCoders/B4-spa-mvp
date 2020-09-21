import * as React from 'react';

import { PageLayout } from '../../../components/common/PageLayout';
import { Button } from '../../../components/common/Button';
import { SvgIcon } from '../../../components/common/SvgIcon';
import { ProcessNotification } from '../../../components/common/ProcessNotification';
import { Tooltip, Whisper } from 'rsuite';
import { IconButton } from '../../../components/common/IconButton';
import { ReactComponent as Plus } from '../../../assets/images/svg/plus.svg';

import {
  CompanyAccounts,
  GuaranteeModal,
  UploadModal
} from '../../../components/common/Modals';
import {
  Card,
  CardTitle,
  CardContent,
  CardIcon,
  CardControls
} from '../../../components/common/Card';

import { ReactComponent as DocumentsSearch } from '../../../assets/images/svg/documents-search.svg';
import { ReactComponent as DocumentsAdd } from '../../../assets/images/svg/documents-add.svg';

import './style.scss';
import { WithAuth } from '../../../WithAuth';
import { userCompanyDataSended } from '../../../stores';
import { TendersList } from './components';

export const MVP02 = WithAuth(
  (): JSX.Element => {
    const [modalOpen, processModalOpen] = React.useState(false);
    const [modalResultOpen, processModalResultOpen] = React.useState(false);
    const [documentsSended, setDocumentsSended] = React.useState(false);
    const [companyAccountsSended, setCompanyAccountsSended] = React.useState(
      false
    );

    const modalToggle = (): void => processModalOpen(!modalOpen);
    const handleOpenResultModal = (): void => processModalResultOpen(true);
    const handleOpenModal = (): void => processModalOpen(true);
    const modalResultToggle = (): void =>
      processModalResultOpen(!modalResultOpen);

    React.useEffect((): VoidFunction => {
      const sub1 = userCompanyDataSended.documentsSended$.subscribe(
        setDocumentsSended
      );

      const sub2 = userCompanyDataSended.companyAccountsSended$.subscribe(
        setCompanyAccountsSended
      );

      return (): void => {
        sub1.unsubscribe();
        sub2.unsubscribe();
      };
    }, []);

    return (
      <PageLayout>
        <div className="mvp-content">
          <div className="mvp-action-cards">
            {!companyAccountsSended && (
              <Card className="mvp-action-card" horizontal>
                <CardIcon className="mvp-action-card-icon">
                  <SvgIcon round>
                    <DocumentsSearch width="36" height="36" />
                  </SvgIcon>
                </CardIcon>

                <CardContent>
                  <CardTitle>Проверить и заполнить анкету компании</CardTitle>
                  Добавьте контактные данные, банковские счета, сведения о
                  ключевых персонах. Часть данных заполнена из открытых
                  источников.
                </CardContent>

                <CardControls position="right">
                  <Button theme="light" onClick={handleOpenResultModal}>
                    Перейти
                  </Button>
                </CardControls>
              </Card>
            )}

            {!documentsSended && (
              <Card className="mvp-action-card" horizontal>
                <CardIcon className="mvp-action-card-icon">
                  <SvgIcon round>
                    <DocumentsAdd width="36" height="36" />
                  </SvgIcon>
                </CardIcon>

                <CardContent>
                  <CardTitle>Приложить сканы документов</CardTitle>
                  Вам потребуются сканы устава, паспорта генерального директора,
                  отчетность за пошлый год – и другие стандартные документы о
                  компании.
                </CardContent>

                <CardControls position="right">
                  <Button theme="light" onClick={handleOpenModal}>
                    Приложить
                  </Button>
                </CardControls>
              </Card>
            )}
          </div>
          {documentsSended && companyAccountsSended && (
            <ProcessNotification label="Фоновый процесс">
              Обратабываем ваши документы и анкету. Уведомим, как все будет
              готово.
            </ProcessNotification>
          )}
        </div>
        <TendersList />
        <Whisper
          placement="topEnd"
          trigger="hover"
          speaker={
            <Tooltip className="mvp-tooltip">Заявка на гарантию</Tooltip>
          }
        >
          <IconButton
            onClick={modalToggle}
            className="guarantee-add-button"
            skin="primary"
            circle
            icon={<Plus width="24" height="24" />}
          />
        </Whisper>
        <GuaranteeModal show={modalOpen} toggle={modalToggle} />
        <UploadModal show={modalOpen} toggle={modalToggle} />
        <CompanyAccounts show={modalResultOpen} toggle={modalResultToggle} />
      </PageLayout>
    );
  }
);
