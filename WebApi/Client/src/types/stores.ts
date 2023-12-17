import type { Container } from 'inversify';
import type { ModalService } from 'src/modal';

import type { NavigationFunction } from '@ts/types';
import type { IDisposable } from '@ts/utilities';
import type { IRoleService, IServerService, IUserService } from './services';

export interface IUIStore {
    rootStore: IAppStore;
    isLogged: boolean;
    layoutType: 'guest' | 'member';

    openLoginModal: () => void;
    openRegisterModal: () => void;
    onLogout: () => void;
}

export interface IAppStore extends IDisposable {
    modalService: ModalService;
    navigate: NavigationFunction;
    container: Container;

    uiStore: IUIStore;

    userService: IUserService;
    roleService: IRoleService;
    serverService: IServerService;
    loading: boolean;
    setLoading: (loading: boolean) => void;

    init: () => void;
}