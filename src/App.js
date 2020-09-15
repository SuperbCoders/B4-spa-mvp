import React from 'react';
import { FirebaseContextProvider } from 'contexts/FirebaseContext';
import { ModalsContextProvider } from 'contexts/ModalsContext';
import { observer } from 'mobx-react';

import useFirebase from 'effects/useFirebase';
import RouterLayer from 'RouterLayer';

import { modalsStore } from 'stores';

const App = () => {
  const store = new modalsStore();

  const firebase = useFirebase();

  return (
    <FirebaseContextProvider value={ firebase }>
      <ModalsContextProvider value={ store }>
        <RouterLayer />
      </ModalsContextProvider>
    </FirebaseContextProvider>
  );
};


export default observer(App);
