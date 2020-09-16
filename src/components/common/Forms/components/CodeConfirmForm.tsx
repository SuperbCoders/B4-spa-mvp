import * as React from 'react';
import { Form, FormGroup, FormControl, ControlLabel } from 'rsuite';
import { Button } from '../../Button';
import { TFormProps } from './prop-types';

export function CodeConfirmForm({
  isRequestProcessing,
  errorText,
  onSubmit,
  controlName
}: TFormProps): JSX.Element {
  return (
    <Form className="form login-form" onSubmit={onSubmit}>
      <FormGroup className="form-group">
        <ControlLabel className="form-label">
          Код, отправленный вам по SMS
        </ControlLabel>
        <FormControl
          errorMessage={errorText}
          type="text"
          name={controlName}
          required
          placeholder="123456"
        />
      </FormGroup>

      <FormGroup className="form-footer">
        <Button
          block
          loading={isRequestProcessing}
          className="login-form-submit"
          skin="inverse"
          type="submit"
        >
          Войти
        </Button>
      </FormGroup>
    </Form>
  );
}
