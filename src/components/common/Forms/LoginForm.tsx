import React, { useState, useRef } from 'react';

import { Form, FormGroup, FormControl, ControlLabel } from 'rsuite';
import { auth } from 'firebase';
import { Button } from '../Button';

import { initRecaptcha } from 'effects/useRecaptcha';
import { FireBaseStore } from '../../../stores';

const enum STEPS {
  PHONE_NUMBER_STEP = 'phone',
  SMS_CODE_STEP = 'code'
}

type TLoginFormProps = {
  done: VoidFunction;
};

export function LoginForm(props: TLoginFormProps): JSX.Element {
  const { done, ...forwardingProps } = props;

  const [appVerifier, setAppVerifier] = useState<auth.RecaptchaVerifier | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState(STEPS.PHONE_NUMBER_STEP);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, updateSubmittingState] = useState(false);

  const recaptchaRef = useRef<HTMLDivElement | null>();
  const codeConsumer = useRef(null);

  const setRef = (ref: HTMLDivElement): void => {
    if (!ref || appVerifier) {
      return;
    }

    recaptchaRef.current = ref;

    const recaptchaVerifier = initRecaptcha(recaptchaRef.current);
    setAppVerifier(recaptchaVerifier);
  };

  const onLogin = (
    _: boolean,
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    if (!appVerifier) {
      throw new Error('App verifier is not defined');
    }

    updateSubmittingState(true);

    const form = event.nativeEvent.target;

    switch (true) {
      default:
      case currentStep === STEPS.PHONE_NUMBER_STEP:
        const phone = form && form.elements.phone.value;

        FireBaseStore.instance
          .auth()
          .signInWithPhoneNumber(phone, appVerifier)
          .then(confirmationResult => {
            setCurrentStep(STEPS.SMS_CODE_STEP);
            updateSubmittingState(false);

            codeConsumer.current = confirmationResult;
          })
          .catch(err => {
            setErrorMessage(err.message);
            updateSubmittingState(false);
          });
        break;

      case currentStep === STEPS.SMS_CODE_STEP:
        const code = form && form.elements.code.value;

        codeConsumer.current
          .confirm(code)
          .then(result => {
            FireBaseStore.instance.recheck();

            updateSubmittingState(false);

            done && done();
          })
          .catch(err => {
            setErrorMessage(err.message);
            updateSubmittingState(false);
          });
        break;
    }
  };

  return (
    <Form className="form login-form" onSubmit={onLogin} {...forwardingProps}>
      {currentStep === STEPS.PHONE_NUMBER_STEP && (
        <FormGroup className="form-group">
          <ControlLabel className="form-label">Номер телефона</ControlLabel>
          <FormControl
            errorMessage={errorMessage}
            type="text"
            name="phone"
            placeholder="+7 900 123 4565"
            required
          />
        </FormGroup>
      )}

      {currentStep === STEPS.SMS_CODE_STEP && (
        <FormGroup className="form-group">
          <ControlLabel className="form-label">
            Код, отправленный вам по SMS
          </ControlLabel>
          <FormControl
            errorMessage={errorMessage}
            type="text"
            name="code"
            placeholder="123456"
            required
          />
        </FormGroup>
      )}

      <FormGroup className="form-footer">
        {currentStep === STEPS.PHONE_NUMBER_STEP && (
          <>
            <Button
              loading={isSubmitting}
              block
              className="login-form-submit"
              skin="inverse"
              type="submit"
            >
              Выслать код
            </Button>
            <Button
              block
              loading={isSubmitting}
              className="login-form-alternate"
              skin="light"
              appearance="ghost"
            >
              Вход по ЭЦП
            </Button>
          </>
        )}

        {currentStep === STEPS.SMS_CODE_STEP && (
          <Button
            block
            loading={isSubmitting}
            className="login-form-submit"
            skin="inverse"
            type="submit"
          >
            Войти
          </Button>
        )}
      </FormGroup>

      <div className="form-recaptcha-container" ref={setRef} />
    </Form>
  );
}
