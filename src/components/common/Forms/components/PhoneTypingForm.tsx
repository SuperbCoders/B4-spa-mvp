import * as React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  FormControlProps
} from 'rsuite';
import { Button } from '../../Button';
import { TFormProps } from './prop-types';
import MaskedInput from 'react-text-mask';

function PhoneMaskInput(
  props: Omit<FormControlProps, 'onChange'>
): JSX.Element {
  return (
    <MaskedInput
      mask={[
        '+',
        '7',
        ' ',
        /[1-9]/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      className="rs-input"
      {...props}
    />
  );
}

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
          accepter={PhoneMaskInput}
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
      </FormGroup>
    </Form>
  );
}
