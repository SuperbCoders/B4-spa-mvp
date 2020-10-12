import firebase from 'firebase';
import { firebaseConfig } from './firebase.config';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthStore } from '../auth.store';

class FireBaseStore {
  private firebaseInstance: firebase.app.App;
  // @ts-ignore
  private _isLoggedIn$: BehaviorSubject<boolean | void> = new BehaviorSubject(
    void 0
  );

  public isLoggedIn$: Observable<
    boolean | void
  > = this._isLoggedIn$.asObservable();

  constructor() {
    this.firebaseInstance = firebase.initializeApp(firebaseConfig);
    this.onAuthStateChanged();
  }

  public get isLoggedIn(): boolean {
    return Boolean(this._isLoggedIn$.value);
  }

  public setCurrentUser(
    user: firebase.User | null,
    cb?: () => Promise<void>
  ): Promise<void> {
    if (user) {
      return user.getIdToken().then(
        (token: string): Promise<void> => {
          AuthStore.saveUserJWTToken(token);
          if (cb) {
            return cb().then(
              (): Promise<void> => {
                this._isLoggedIn$.next(true);

                return Promise.resolve();
              }
            );
          } else {
            this._isLoggedIn$.next(true);

            return Promise.resolve();
          }
        }
      );
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
      .onAuthStateChanged((user: firebase.User | null): void => {
        this.setCurrentUser(user);
      });
  }
}

export const firebaseStore = new FireBaseStore();
