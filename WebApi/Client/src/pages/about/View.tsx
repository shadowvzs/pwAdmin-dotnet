import { makeObservable } from 'mobx';

import { ViewStore } from '@shadowvzs/react-view-router';

export interface IView extends ViewStore {
    serverDetails: Record<string, string>;
}

class View extends ViewStore implements IView {
    public serverDetails: Record<string, string> = {};

    constructor() {
        super();
        makeObservable(this);
    }
}

export default View;