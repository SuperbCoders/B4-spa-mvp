import React from 'react';
import { LoginForm } from 'components/common/Forms';

import './style.scss';

export default function Auth() {
  return (
    <div className="auth">
      <LoginForm />
    </div>
  );
}
