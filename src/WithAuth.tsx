import * as React from 'react';
import { FireBaseStore } from './stores';
import { Auth } from './components/pages';

export function WithAuth(Component: React.ElementType): () => JSX.Element {
  return function WrappedComponent(): JSX.Element {
    console.log(':: fb', FireBaseStore.instance);

    return FireBaseStore.instance.isLoggedIn ? <Component /> : <Auth />;
  };
}
