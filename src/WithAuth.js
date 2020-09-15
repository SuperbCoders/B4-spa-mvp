import React, { useContext } from 'react';

import AuthScreen from './components/screen/Auth';

import FirebaseContext from './contexts/FirebaseContext';

function WithAuth(Component) {
  return function WrappedComponent(props) {
    const firebase = useContext(FirebaseContext);

    console.log(':: fb', firebase);

    if (firebase.isLoggedIn) {
      return Component;
    }

    return <AuthScreen />;
  }
};

export default WithAuth;