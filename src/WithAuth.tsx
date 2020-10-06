import * as React from 'react';
import { firebaseStore } from './stores';
import { Auth } from './components/pages';
import { useRxStream } from './utils/hooks';

export function WithAuth(Component: React.ElementType): () => JSX.Element {
  return function WrappedComponent(): JSX.Element {
    const isLoggedIn = useRxStream(firebaseStore.isLoggedIn$, false);

    return isLoggedIn ? <Component /> : <Auth />;
  };
}
