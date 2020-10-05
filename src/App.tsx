import * as React from 'react';

import { Router, Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'rsuite';

import { ErrorBoundary } from './ErrorBoundary';
import {
  Landing,
  GreetingPage,
  CabinetPage,
  LoadingPage,
  MainPage
} from './components/pages';
import { COMPANY_INN_ROUTE_KEY } from './components/pages/Landing';

import { routerHistory } from './router-history';

import ruRU from 'rsuite/lib/IntlProvider/locales/ru_RU';
import { ModalWrapper } from './components/common/ModalWrapper';
import { firebaseStore } from './stores';

import './app.style.scss';
import { useRxStream } from './utils/hooks';
import { TagManagerService } from './services';

export function AppComponent(): JSX.Element {
  const isLoginCheck = useRxStream(firebaseStore.isLoginCheck$, false);

  React.useEffect((): void => {
    TagManagerService.initialize();
  }, []);

  if (!isLoginCheck) return <LoadingPage />;

  return (
    <IntlProvider locale={ruRU}>
      <ErrorBoundary>
        <Router history={routerHistory}>
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route
              exact
              path={`/company/:${COMPANY_INN_ROUTE_KEY}`}
              component={Landing}
            />
            <Route path="/greeting" exact component={GreetingPage} />
            <Route path="/cabinet" exact component={CabinetPage} />
          </Switch>
          <ModalWrapper />
        </Router>
      </ErrorBoundary>
    </IntlProvider>
  );
}
