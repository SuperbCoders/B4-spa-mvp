import React from 'react';
import { useRef, useEffect  } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Landing from './components/screen/Landing';
import Mvp01 from './components/screen/Mvp01';
import Mvp02 from './components/screen/Mvp02';
import Mvp03 from './components/screen/Mvp03';

const App = () => {
  const ref = useRef();

  let appVerifier;

  useEffect(() => {
    if (!appVerifier) {
      appVerifier = initReCaptcha(ref.current);
    }
  });

  return <>
    <UserForm onSubmit={async phone => {
      firebase.auth().signInWithPhoneNumber(phone, appVerifier).then(confirmationResult => {
        window.confirmationResult = confirmationResult;

        const code = prompt('Enter sms code');

        confirmationResult.confirm(code).then(result => {
          console.log('::: HURRAAA', result);
        }).catch(err => {
          throw err;
        });

      }).catch(err => {
        console.log(':: err', err);

        throw err;
      });
    }} />

    <div ref={ ref }></div>
  </>;

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



export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
