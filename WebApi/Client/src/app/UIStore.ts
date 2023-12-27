import { computed, makeObservable } from 'mobx';
import LoginModal from '@components/modal/LoginModal';
import RegisterModal from '@components/modal/RegisterModal';
import type { IAppStore, IUIStore } from '@ts/stores';

class UIStore implements IUIStore{
    public rootStore: IAppStore;

    @computed
    public get isLogged() {
        return Boolean(this.rootStore.userService.user);
    }

    @computed
    public get layoutType() {
        if (this.rootStore.userService.user) {
            return 'member';
        }
        return 'guest';
    }

    constructor(store: IAppStore) {
        this.rootStore = store;
        makeObservable(this);
    }

    public openLoginModal = () => {
        this.rootStore.modalService.open(LoginModal, { title: 'Login' });
    };

    public openRegisterModal = () => {
        this.rootStore.modalService.open(RegisterModal, { title: 'Register' });
    };

    public onLogout = () => {
        this.rootStore.userService.logout();
    };
}

export default UIStore;