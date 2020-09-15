import firebase from 'firebase';

export function initRecaptcha(
  ref: HTMLElement
): firebase.auth.RecaptchaVerifier {
  const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(ref, {
    size: 'invisible',
    callback: (response: unknown): void => {},
    'expired-callback': (): void => {}
  });

  return recaptchaVerifier;
}
