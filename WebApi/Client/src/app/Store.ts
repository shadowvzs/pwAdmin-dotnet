import { Container } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { i18n } from '@lingui/core';

import TOKEN from '@app/di/token';
import getContainer from '@app/di/container';
import Disposable from '@utility/Disposable';
import { catalog } from '@locales/index';
import type { ModalService } from 'src/modal';
import type { IAppStore, IUIStore } from '@ts/stores';
import type { NavigationFunction } from '@ts/types';
import type { IRoleService, IServerService, IUserService } from '@ts/services';
import UIStore from './UIStore';

i18n.load(catalog);

export const REMOTE_API = 'http://localhost:3333/';

export class AppStore extends Disposable implements IAppStore {

    public modalService!: ModalService;
    public locale: string = 'en-US'.replace('_', '').replace('-', '');

    public navigate!: NavigationFunction;
    public container: Container;
    public uiStore: IUIStore;

    public userService!: IUserService;
    public roleService!: IRoleService;
    public serverService!: IServerService;

    @observable
    public loading = false;

    @action.bound
    public setLoading(loading: boolean) { this.loading = loading; }

    constructor() {
        super();
        makeObservable(this);
        this.container = getContainer();
        this.uiStore = new UIStore(this);
        this.init();
        (window as unknown as { appStore: IAppStore }).appStore = this;
    }

    public async init() {
        if (this.loading) { return; }
        this.setLoading(true);
        i18n.activate(this.locale);
        /**
         * Dynamic imports for core files
         */
        const { ModalService } = await import('../modal/index');

        /**
         * Init and settings
         */
        const modalService = new ModalService();
        this.modalService = modalService.init({ app: this, containerSelector: '#modalRoot' });
        this.container = getContainer();
        this.userService = this.container.get<IUserService>(TOKEN.IUserService);
        this.serverService = this.container.get<IServerService>(TOKEN.IServerService);

        setTimeout(() => {
            this.setLoading(false);
        }, 200);
    }
}