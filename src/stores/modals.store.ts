import { observable, computed, action } from 'mobx';

const LOGIN_MODAL_ID = 'modals:login';

export class ModalsStore {
  private static _instance: ModalsStore | null = null;

  @observable modals: string[] = [];

  static get instance(): ModalsStore {
    if (!this._instance) {
      this._instance = new ModalsStore();
    }

    return this._instance;
  }
  private constructor() {}

  @computed get isLoginModalOpened(): boolean {
    return this.modals.includes(LOGIN_MODAL_ID);
  }

  @action toggleLoginModal = (): void => {
    if (this.modals.includes(LOGIN_MODAL_ID)) {
      const index = this.modals.indexOf(LOGIN_MODAL_ID);

      // tslint:disable-next-line:no-bitwise
      if (~index) {
        this.modals.splice(index, 1);
      }
    } else {
      this.openLoginModal();
    }
  }

  @action openLoginModal(): void {
    if (this.modals.includes(LOGIN_MODAL_ID)) {
      return;
    }

    this.modals.push(LOGIN_MODAL_ID);
  }
}
