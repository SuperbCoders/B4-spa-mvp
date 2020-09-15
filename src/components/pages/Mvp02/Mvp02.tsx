import * as React from 'react';

import { WithAuth } from '../../../WithAuth';

import { PageLayout } from '../../../components/common/PageLayout';
import { Button } from '../../../components/common/Button';
import { SvgIcon } from '../../../components/common/SvgIcon';
import { ProcessNotification } from '../../../components/common/ProcessNotification';
import { InfoModal, UploadModal } from '../../../components/common/Modals';
import {
  Card,
  CardTitle,
  CardContent,
  CardIcon,
  CardControls
} from '../../../components/common/Card';

import { ReactComponent as DocumentsSearch } from 'assets/images/svg/documents-search.svg';
import { ReactComponent as DocumentsAdd } from 'assets/images/svg/documents-add.svg';

import './style.scss';

export const MVP02 = WithAuth(
  (): JSX.Element => {
    const processState = true;

    const [modalOpen, processModalOpen] = React.useState(false);
    const [modalResultOpen, processModalResultOpen] = React.useState(false);

    const modalToggle = (): void => processModalOpen(!modalOpen);
    const modalResultToggle = (): void =>
      processModalResultOpen(!modalResultOpen);

    return (
      <PageLayout>
        <div className="mvp-content">
          <div className="mvp-action-cards">
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
                <Button
                  theme="light"
                  onClick={() => processModalResultOpen(true)}
                >
                  Перейти
                </Button>
              </CardControls>
            </Card>

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
                <Button theme="light" onClick={() => processModalOpen(true)}>
                  Перейти
                </Button>
              </CardControls>
            </Card>
          </div>

          {(() => {
            if (!processState) {
              return null;
            }

            // :todo: add animation
            return (
              <ProcessNotification label="Фоновый процесс">
                Обратабываем ваши документы и анкету. Уведомим, как все будет
                готово.
              </ProcessNotification>
            );
          })()}
        </div>

        <UploadModal show={modalOpen} toggle={modalToggle} />
        <InfoModal show={modalResultOpen} toggle={modalResultToggle} />
      </PageLayout>
    );
  }
);
