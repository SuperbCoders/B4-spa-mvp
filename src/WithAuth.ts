import React from 'react';
import { FireBaseStore } from './stores';
import { Auth } from './components/pages';

export function WithAuth(Component: React.Component): React.ReactNode {
  return function WrappedComponent(): React.ReactNode {
    console.log(':: fb', FireBaseStore.instance);

    return FireBaseStore.instance.isLoggedIn ? Component : Auth;
  };
}
