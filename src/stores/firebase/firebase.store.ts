import firebase from 'firebase';
import { firebaseConfig } from './firebase.config';

export class FireBaseStore {
  private static _instance: FireBaseStore | null = null;

  private firebaseInstance: firebase.app.App;
  readonly currentUser: firebase.auth.Auth | null = null;
  readonly isLoggedIn: boolean = false;

  static get instance(): FireBaseStore {
    if (!this._instance) {
      this._instance = new FireBaseStore();
    }

    return this._instance;
  }

  private constructor() {
    this.firebaseInstance = firebase.initializeApp(firebaseConfig);
  }

  auth = (): firebase.auth.Auth => {
    return this.firebaseInstance.auth();
  }

  recheck(): void {
    this.firebaseInstance.auth();
  }
}
