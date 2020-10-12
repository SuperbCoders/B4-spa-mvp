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

import './app-rs-override.style.scss';
import { useRxStream } from './utils/hooks';
import { TagManagerService } from './services';
import { PrivateRoute } from './utils';

export function AppComponent(): JSX.Element {
  const isLoginCheck = useRxStream(firebaseStore.isLoginCheck$, false);
  const isLoggedIn = useRxStream(firebaseStore.isLoggedIn$, void 0);

  React.useEffect((): void => {
    TagManagerService.initialize();
  }, []);

  if (!isLoginCheck || isLoggedIn === void 0) return <LoadingPage />;

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
            <PrivateRoute enabled={isLoggedIn} path="/greeting" exact component={GreetingPage} />
            <PrivateRoute enabled={isLoggedIn} path="/cabinet" exact component={CabinetPage} />
          </Switch>
          <ModalWrapper />
        </Router>
      </ErrorBoundary>
    </IntlProvider>
  );
}
