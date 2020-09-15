import React, { useContext } from 'react';

import ModalsContext from 'contexts/ModalsContext';

import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { observer } from "mobx-react";

import ErrorBoundary from 'ErrorBoundary';
import Landing from 'components/screen/Landing';
import Mvp01 from 'components/screen/Mvp01';
import Mvp02 from 'components/screen/Mvp02';
import Mvp03 from 'components/screen/Mvp03';

// import PageLayout from 'components/common/PageLayout';

import { LoginModal } from 'components/common/Modals';

const RouterLayer = (props) => {
  const store = useContext(ModalsContext);

  return (
    <ErrorBoundary>
      <Router>
        <Switch>
          <Route exact path="/:company">
            <Landing />
          </Route>
          <Route exact path="/dashboard/01">
            <Mvp01 />
          </Route>
          <Route exact path="/dashboard/02">
            <Mvp02 />
          </Route>
          <Route exact path="/dashboard/03">
            <Mvp03 />
          </Route>
        </Switch>

        <LoginModal show={ store.isLoginModalOpened } toggle={ store.toggleLoginModal } />
      </Router>
    </ErrorBoundary>
  );
};


export default observer(RouterLayer);
