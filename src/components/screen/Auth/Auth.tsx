import React from 'react';
import { LoginForm } from 'components/common/Forms';

import './style.scss';

export function Auth(): JSX.Element {
  return (
    <div className="auth">
      <LoginForm />
    </div>
  );
}
