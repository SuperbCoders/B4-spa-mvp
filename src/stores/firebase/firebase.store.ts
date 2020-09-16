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

  setCurrentUser(user: firebase.User | null): void {
    this.currentUser = user;
    this._isLoggedIn = this.currentUser !== null;
  }

  auth = (): firebase.auth.Auth => {
    return this.firebaseInstance.auth();
  }

  recheck(): void {
    this.firebaseInstance.auth();
  }
}
