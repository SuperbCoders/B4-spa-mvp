import * as React from 'react';

import { PageLayout } from '../../common/PageLayout';
import { WithAuth } from '../../../WithAuth';
import {
  ProcessNotificationCard,
  TendersList,
  UploadCompanyAccountsActionCard,
  UploadDocumentsActionCard,
  WarriantyClaimFormOpenButton
} from './components';

import './style.scss';

export const MainPage = WithAuth(
  (): JSX.Element => {
    return (
      <PageLayout background="main">
        <div className="mvp-content">
          <div className="mvp-action-cards">
            <UploadCompanyAccountsActionCard />
            <UploadDocumentsActionCard />
          </div>
          <ProcessNotificationCard />
          <TendersList />
        </div>
        <WarriantyClaimFormOpenButton />
      </PageLayout>
    );
  }
);
