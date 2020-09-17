import firebase from 'firebase';
import { firebaseConfig } from './firebase.config';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthStore } from '../auth.store';

class FireBaseStore {
  private firebaseInstance: firebase.app.App;
  // @ts-ignore
  private _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoggedIn$: Observable<boolean> = this._isLoggedIn$.asObservable();

  constructor() {
    this.firebaseInstance = firebase.initializeApp(firebaseConfig);
    this.onAuthStateChanged();
  }

  public setCurrentUser(user: firebase.User | null): Promise<void> {
    if (user) {
      return user.getIdToken().then((token: string): void => {
        console.log('1');
        AuthStore.saveUserJWTToken(token);
        this._isLoggedIn$.next(true);
      });
    } else {
      AuthStore.deleteUserJSWToken();
      this._isLoggedIn$.next(false);

      return Promise.resolve();
    }
  }

  public signOut(): void {
    this.firebaseInstance
      .auth()
      .signOut()
      .then((): Promise<void> => this.setCurrentUser(null));
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

  private onAuthStateChanged(): void {
    this.firebaseInstance
      .auth()
      .onAuthStateChanged(
        (user: firebase.User | null): Promise<void> => this.setCurrentUser(user)
      );
  }
}

export const firebaseStore = new FireBaseStore();
