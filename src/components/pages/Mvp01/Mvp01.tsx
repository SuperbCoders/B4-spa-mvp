import * as React from 'react';

import { PageLayout } from '../../../components/common/PageLayout';
import { AttentionAlert } from '../../../components/common/AttentionAlert';
import { Button } from '../../../components/common/Button';

import './style.scss';
import { WithAuth } from '../../../WithAuth';

export const MVP01 = WithAuth(
  (): JSX.Element => {
    return (
      <PageLayout>
        <div className="mvp-01-content">
          <AttentionAlert
            title={'👋  Добро пожаловать!'}
            className="mvp-01-welcome"
          >
            <p className="mvp-01-welcome-content">
              Вы зарегистрированы B4. Наш сервис поможет вам улучшить свои
              результаты в тендерах. 
              <br />
              Чтобы начать работу нужно заполнить анкету компании и приложить
              основные документы.
            </p>
            <Button skin="inverse" className="mvp-01-welcome-button">
              Начать
            </Button>
          </AttentionAlert>
        </div>
      </PageLayout>
    );
  }
);
