import * as React from 'react';

import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { IntlProvider } from 'rsuite';

import { ErrorBoundary } from './ErrorBoundary';
import {
  Landing,
  GreetingPage,
  MainPage,
  LoadingPage
} from './components/pages';
import { COMPANY_INN_ROUTE_KEY } from './components/pages/Landing';

import { routerHistory } from './router-history';

import ruRU from 'rsuite/lib/IntlProvider/locales/ru_RU';
import { ModalWrapper } from './components/common/ModalWrapper';
import { firebaseStore } from './stores';

import './app.style.scss';

export function AppComponent(): JSX.Element {
  const [isLoginCheck, setIsLoginCheck] = React.useState(false);

  React.useEffect((): VoidFunction => {
    const sub = firebaseStore.isLoginCheck$.subscribe(setIsLoginCheck);

    return (): void => sub.unsubscribe();
  }, []);

  if (!isLoginCheck) return <LoadingPage />;

  return (
    <IntlProvider locale={ruRU}>
      <ErrorBoundary>
        <Router history={routerHistory}>
          <Switch>
            <Route
              exact
              path={`/company/:${COMPANY_INN_ROUTE_KEY}`}
              component={Landing}
            />
            <Route path="/greeting" component={GreetingPage} />
            <Route path="/main" component={MainPage} />
            <Redirect from="/" to="/main" />
          </Switch>
          <ModalWrapper />
        </Router>
      </ErrorBoundary>
    </IntlProvider>
  );
}
