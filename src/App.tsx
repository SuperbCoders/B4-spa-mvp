import React from 'react';
import { observer } from 'mobx-react';

import { RouterLayer } from './RouterLayer';

function AppComponent(): JSX.Element {
  return <RouterLayer />;
}

export const App = observer(AppComponent);
