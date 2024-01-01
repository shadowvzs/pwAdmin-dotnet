import { makeObservable, observable } from 'mobx';

import { ViewStore } from '@shadowvzs/react-view-router';
import { ViewInjector } from '@ts/types';
import Item from '@pwserver/model/Item';
import type { OctetChunk } from '@pwserver/types/builder';

export interface IView extends ViewStore {
    item: Item;
    octets: OctetChunk[];
    onItemBuilderChange: (item: Item, octets: OctetChunk[]) => void;
}

class View extends ViewStore<ViewInjector> implements IView {
    @observable
    public item!: Item;
    public setItem(item: Item) { this.item = item; }

    @observable
    public octets: OctetChunk[] = [];
    public setOctets(octets: OctetChunk[]) { this.octets = octets; }

    constructor() {
        super();
        makeObservable(this);
    }

    public onItemBuilderChange = (item: Item, octets: OctetChunk[]) => {
        this.setItem(item);
        this.setOctets(octets);
    };
}

export default View;