import * as React from 'react';
import { observer } from 'mobx-react';

import { Router, Switch, Route, Redirect } from 'react-router-dom';

import { ErrorBoundary } from './ErrorBoundary';
import { Landing, MVP01, MVP02, MVP03 } from './components/pages';
import { COMPANY_INN_ROUTE_KEY } from './components/pages/Landing';

import { LoginModal } from './components/common/Modals';
import { ModalsStore } from './stores';
import { routerHistory } from './router-history';

function AppComponent(): JSX.Element {
  return (
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
      </Router>
    </ErrorBoundary>
  );
}

export const App = observer(AppComponent);
