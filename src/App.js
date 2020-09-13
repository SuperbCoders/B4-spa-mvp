import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Landing from './components/screen/Landing';
import Mvp01 from './components/screen/Mvp01';
import Mvp02 from './components/screen/Mvp02';
import Mvp03 from './components/screen/Mvp03';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/mvp/01">
          <Mvp01 />
        </Route>
        <Route exact path="/mvp/02">
          <Mvp02 />
        </Route>
        <Route exact path="/mvp/03">
          <Mvp03 />
        </Route>
      </Switch>
    </Router>
  );
};
