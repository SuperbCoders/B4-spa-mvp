import * as React from 'react';
import { observer } from 'mobx-react';

import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { IntlProvider } from 'rsuite';

import { ErrorBoundary } from './ErrorBoundary';
import { Landing, MVP01, MVP02, MVP03 } from './components/pages';
import { COMPANY_INN_ROUTE_KEY } from './components/pages/Landing';

import { LoginModal } from './components/common/Modals';
import { ModalsStore } from './stores';
import { routerHistory } from './router-history';

import ruRU from 'rsuite/lib/IntlProvider/locales/ru_RU';
import { ModalWrapper } from './components/common/ModalWrapper';

function AppComponent(): JSX.Element {
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
            <Route path="/dashboard/01" component={MVP01} />
            <Route path="/dashboard/02" component={MVP02} />
            <Route path="/dashboard/03" component={MVP03} />
            <Redirect from="/" to="/dashboard/02" />
          </Switch>
          <LoginModal
            show={ModalsStore.instance.isLoginModalOpened}
            toggle={ModalsStore.instance.toggleLoginModal}
          />
          <ModalWrapper/>
        </Router>
      </ErrorBoundary>
    </IntlProvider>
  );
}

export const App = observer(AppComponent);
