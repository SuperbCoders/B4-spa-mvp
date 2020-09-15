import React from 'react';
import { ModalsStore } from 'stores';

const modalsStore = new ModalsStore();

export const ModalsContext = React.createContext(modalsStore);

export const ModalsContextProvider = ModalsContext.Provider;
