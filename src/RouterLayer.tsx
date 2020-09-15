import React from 'react';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import { ErrorBoundary } from './ErrorBoundary';
import { Landing, MVP01, MVP02, MVP03 } from './components/pages';

import { LoginModal } from './components/common/Modals';
import { ModalsStore } from './stores';

export const RouterLayer = observer(
  (): JSX.Element => {
    return (
      <ErrorBoundary>
        <Router>
          <Switch>
            <Route exact path="/:company">
              <Landing />
            </Route>
            <Route exact path="/dashboard/01">
              <MVP01 />
            </Route>
            <Route exact path="/dashboard/02">
              <MVP02 />
            </Route>
            <Route exact path="/dashboard/03">
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
