import { action, makeObservable, observable } from 'mobx';

import { ViewStore } from '@shadowvzs/react-view-router';
import { InstanceActionEnum, InstanceTypeEnum } from '@ts/api';
import type { ViewInjector } from '@ts/types';
import type { Servers } from '@ts/dto';

export interface IView extends ViewStore {
    serverStatuses: Servers['checkInstancesStatus']['Response'];
    isLoading: boolean;

    onToggleMapStatus: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onToggleServerStatus: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

class View extends ViewStore<ViewInjector> implements IView {
    private timerId = 0;

    @observable
    public serverStatuses: Servers['checkInstancesStatus']['Response'] = [];

    @action.bound
    private setServerStatuses(serverStatuses: Servers['checkInstancesStatus']['Response']) { this.serverStatuses = serverStatuses; }

    @observable
    public isLoading = false;

    @action.bound
    private setIsLoading(isLoading: boolean) { this.isLoading = isLoading; }

    constructor() {
        super();
        makeObservable(this);
    }

    public onToggleMapStatus = async (ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
        ev.preventDefault();
        const { id } = ev.currentTarget.dataset;
        if (!id) { console.error('Missing the id from the event'); return; }
        const instance = this.serverStatuses.find(x => x.id === id);
        if (!instance) { console.error(`Instance not found, id: ${id}`); return; }
        await this.injectedData.app.serverService.manageInstances({
            instances: [id],
            action: instance.isRunning ? InstanceActionEnum.STOP : InstanceActionEnum.START
        });
    };

    public onToggleServerStatus = async (ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
        ev.preventDefault();
        const { action } = ev.currentTarget.dataset;
        const apps = this.serverStatuses.filter(x => x.type === InstanceTypeEnum.App && x.isRunning === (action !== 'start'));

        // eslint-disable-next-line no-restricted-syntax
        for (const app of apps) {
            // eslint-disable-next-line no-await-in-loop
            await this.injectedData.app.serverService.manageInstances({
                instances: [app.id],
                action: InstanceActionEnum.START
            });
        }
    };

    private fetchServerStatuses = async () => {
        const { serverService } = this.injectedData.app;
        this.setIsLoading(true);
        const responese = await serverService
            .checkInstancesStatus({ instances: [] })
                .finally(() => { this.setIsLoading(false); });
        this.setServerStatuses(responese);
    };

    public canMount(): Promise<boolean> {
        const { user } = this.injectedData.app.userService;
        console.log('can mount', !!user);
        return Promise.resolve(!!user);
    }

    public beforeMount() {
        const { user } = this.injectedData.app.userService;
        if (!user) { this.router.history.navigate('/'); }
        this.startTimer();
    }

    public beforeUnmount() {
        clearInterval(this.timerId);
    }

    private startTimer = () => {
        if (this.timerId) { clearInterval(this.timerId); }
        this.timerId = window.setInterval(() => {
            this.fetchServerStatuses();
        }, 2000);
    };
}

export default View;