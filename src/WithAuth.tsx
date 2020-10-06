import * as React from 'react';
import { firebaseStore } from './stores';
import { Auth } from './components/pages';

export function WithAuth(Component: React.ElementType): () => JSX.Element {
  return function WrappedComponent(): JSX.Element {
    const [isLoggedIn, setLoggedIn] = React.useState(false);

    React.useEffect((): VoidFunction => {
      const sub = firebaseStore.isLoggedIn$.subscribe(setLoggedIn);

      return (): void => sub.unsubscribe();
    }, []);

    return isLoggedIn ? <Component /> : <Auth />;
  };
}
