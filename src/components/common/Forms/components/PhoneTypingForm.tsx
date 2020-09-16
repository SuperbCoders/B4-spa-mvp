import * as React from 'react';
import { Form, FormGroup, FormControl, ControlLabel } from 'rsuite';
import { Button } from '../../Button';
import { TFormProps } from './prop-types';

export function PhoneTypingForm({
  isRequestProcessing,
  errorText,
  onSubmit,
  controlName
}: TFormProps): JSX.Element {
  return (
    <Form className="form login-form" onSubmit={onSubmit}>
      <FormGroup className="form-group">
        <ControlLabel className="form-label">Номер телефона</ControlLabel>
        <FormControl
          errorMessage={errorText}
          type="text"
          required
          name={controlName}
          placeholder="+7 900 123 4565"
        />
      </FormGroup>

      <FormGroup className="form-footer">
        <Button
          loading={isRequestProcessing}
          block
          className="login-form-submit"
          skin="inverse"
          type="submit"
        >
          Выслать код
        </Button>
        <Button
          block
          loading={isRequestProcessing}
          className="login-form-alternate"
          skin="light"
          appearance="ghost"
        >
          Вход по ЭЦП
        </Button>
      </FormGroup>
    </Form>
  );
}
