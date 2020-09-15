import React from 'react';
import { FirebaseContextProvider } from 'contexts/FirebaseContext';
import { ModalsContext } from './contexts/ModalsContext';
import { observer } from 'mobx-react';

import useFirebase from 'effects/useFirebase';
import RouterLayer from 'RouterLayer';

import { ModalsStore } from './stores';

const store = new ModalsStore();

function AppComponent(): JSX.Element {
  const firebase = useFirebase();

  return (
    <FirebaseContextProvider value={firebase}>
      <ModalsContext.Provider value={store}>
        <RouterLayer />
      </ModalsContext.Provider>
    </FirebaseContextProvider>
  );
}

export const App = observer(AppComponent);
