import * as React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import { ErrorBoundary } from './ErrorBoundary';
import { Landing, MVP01, MVP02, MVP03 } from './components/pages';
import { COMPANY_INN_ROUTE_KEY } from './components/pages/Landing';

import { LoginModal } from './components/common/Modals';
import { ModalsStore } from './stores';

export const RouterLayer = observer(
  (): JSX.Element => {
    console.log('hjere');
    return (
      <ErrorBoundary>
        <Router>
          <Switch>
            <Route
              exact
              path={`/:${COMPANY_INN_ROUTE_KEY}`}
              component={Landing}
            />
            <Route exact path="/dashboard/01">
              <MVP01 />
            </Route>
            <Route path="/dashboard/02">
              <MVP02 />
            </Route>
            <Route path="/dashboard/03">
              <MVP03 />
            </Route>
          </Switch>

          <LoginModal
            show={ModalsStore.instance.isLoginModalOpened}
            toggle={ModalsStore.instance.toggleLoginModal}
          />
        </Router>
      </ErrorBoundary>
    );
  }
);
