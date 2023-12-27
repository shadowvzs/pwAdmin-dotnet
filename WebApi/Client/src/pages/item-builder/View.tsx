import { makeObservable } from 'mobx';

import { ViewStore } from '@shadowvzs/react-view-router';
import { ViewInjector } from '@ts/types';

export interface IView extends ViewStore {
    test: number;
}

class View extends ViewStore<ViewInjector> implements IView {
    public test = 1;
    constructor() {
        super();
        makeObservable(this);
    }
}

export default View;