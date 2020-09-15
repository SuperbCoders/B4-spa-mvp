import { observable, computed, decorate, action } from 'mobx';

const LOGIN_MODAL_ID = 'modals:login';

export class ModalsStore {
  modals: Array<string> = [];

  constructor() {
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
  }

  openLoginModal(): void {
    if (this.modals.includes(LOGIN_MODAL_ID)) {
      return;
    }

    this.modals.push(LOGIN_MODAL_ID);
  }

  toggleLoginModal(): void {
    if (this.modals.includes(LOGIN_MODAL_ID)) {
      const index = this.modals.indexOf(LOGIN_MODAL_ID);

      if (~index) {
        this.modals.splice(index, 1);
      }
    } else {
      this.openLoginModal();
    }
  }

  get isLoginModalOpened(): boolean {
    return this.modals.includes(LOGIN_MODAL_ID);
  }
}

decorate(ModalsStore, {
  modals: observable,
  openLoginModal: action,
  toggleLoginModal: action,
  isLoginModalOpened: computed
});
