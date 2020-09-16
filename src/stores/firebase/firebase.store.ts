import firebase from 'firebase';
import { firebaseConfig } from './firebase.config';

export class FireBaseStore {
  private static _instance: FireBaseStore | null = null;

  private firebaseInstance: firebase.app.App;
  private currentUser: firebase.User | null = null;
  private _isLoggedIn: boolean = false;

  static get instance(): FireBaseStore {
    if (!this._instance) {
      this._instance = new FireBaseStore();
    }

    return this._instance;
  }

  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  private constructor() {
    this.firebaseInstance = firebase.initializeApp(firebaseConfig);
  }

  public setCurrentUser(user: firebase.User | null): void {
    this.currentUser = user;
    this._isLoggedIn = this.currentUser !== null;
  }

  public signInWithPhoneNumber(
    phone: string,
    recapthaVerifier: firebase.auth.RecaptchaVerifier
  ): Promise<firebase.auth.ConfirmationResult> {
    return this.firebaseInstance
      .auth()
      .signInWithPhoneNumber(phone, recapthaVerifier);
  }

  public getRecaptchaVerifier(
    container: HTMLDivElement
  ): firebase.auth.RecaptchaVerifier {
    return new firebase.auth.RecaptchaVerifier(container, {
      size: 'invisible',
      callback: (response: unknown): void => console.log(response, 'callback'),
      'expired-callback': (anything: unknown): void =>
        console.log(anything, 'expired-callback')
    });
  }
}
