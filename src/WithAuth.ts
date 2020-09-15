import React, { useContext } from 'react';

import { Auth } from './components/screen/Auth';

import FirebaseContext from './contexts/FirebaseContext';

export function WithAuth(Component: React.Component): React.ReactNode {
  return function WrappedComponent(): React.ReactNode {
    const firebase = useContext(FirebaseContext);
    console.log(':: fb', firebase);

    return firebase.isLoggedIn ? Component : Auth;
  };
}
