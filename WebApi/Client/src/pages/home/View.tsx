import { action, makeObservable, observable } from 'mobx';

import { ViewStore } from '@shadowvzs/react-view-router';
import { ViewInjector } from '@ts/types';
import { Servers } from '@ts/dto';

export interface IView extends ViewStore {
    serverDetails: Servers['details']['Response'];
}

class View extends ViewStore<ViewInjector> implements IView {
    @observable
    public serverDetails: Servers['details']['Response'] = {
        online: false
    };

    @action.bound
    public setServerDetails(serverDetails: Servers['details']['Response']) { this.serverDetails = serverDetails;}

    constructor() {
        super();
        makeObservable(this);
    }

    beforeMount(): void {
        const { serverService } = this.injectedData.app;
        serverService.details().then(data => {
            this.setServerDetails(data);
        });
    }
}

export default View;