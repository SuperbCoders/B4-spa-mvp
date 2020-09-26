import { BehaviorSubject, Observable } from 'rxjs';

export type TModalWrapperState = {
  component: JSX.Element | null;
  isOpened: boolean;
  animateWrapper?: boolean;
  backgroundColor?: string;
};

class ModalWrapperService {
  private state: TModalWrapperState = {
    animateWrapper: true,
    backgroundColor: void 0,
    component: null,
    isOpened: false
  };

  private _modalState$: BehaviorSubject<
    TModalWrapperState
  > = new BehaviorSubject(this.state);

  public modalState$: Observable<
    TModalWrapperState
  > = this._modalState$.asObservable();

  public openModal(newState: Omit<TModalWrapperState, 'isOpened'>): void {
    this.state = { ...this.state, ...newState };

    this._modalState$.next({
      ...this.state,
      isOpened: true
    });
  }

  public closeModal = (): void => {
    this.state = { ...this.state, isOpened: false, backgroundColor: void 0 };

    this._modalState$.next(this.state);
  }
}

export const modalWrapperService = new ModalWrapperService();
