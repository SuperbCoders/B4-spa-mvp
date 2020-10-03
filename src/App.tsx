import * as React from 'react';

import { Router, Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'rsuite';
import TagManager from 'react-gtm-module';

import { ErrorBoundary } from './ErrorBoundary';
import {
  Landing,
  GreetingPage,
  CabinetPage,
  LoadingPage
} from './components/pages';
import { COMPANY_INN_ROUTE_KEY } from './components/pages/Landing';

import { routerHistory } from './router-history';

import ruRU from 'rsuite/lib/IntlProvider/locales/ru_RU';
import { ModalWrapper } from './components/common/ModalWrapper';
import { firebaseStore } from './stores';

import './app.style.scss';
import { tagManagerArgs } from './tag-manager-args';

export function AppComponent(): JSX.Element {
  const [isLoginCheck, setIsLoginCheck] = React.useState(false);

  React.useEffect((): VoidFunction => {
    const sub = firebaseStore.isLoginCheck$.subscribe(setIsLoginCheck);
    TagManager.initialize(tagManagerArgs);

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
            <Route path="/greeting" exact component={GreetingPage} />
            <Route path="/cabinet" exact component={CabinetPage} />
          </Switch>
          <ModalWrapper />
        </Router>
      </ErrorBoundary>
    </IntlProvider>
  );
}
