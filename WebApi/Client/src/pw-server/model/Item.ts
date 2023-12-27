import { makeAutoObservable } from 'mobx';
import { IItem, ItemKey } from '../types/common';

class Item implements IItem {
    public id!: number;
    public grade = 1;
    public mask = 0;
    public pos = 0;
    public proctype = 0;
    public count = 1;
    public max_count = 1;
    public expire_date = 0;
    public guid1 = 0;
    public guid2 = 0;
    public data = '';

    public set(field: ItemKey | Partial<Record<ItemKey, any>>, value?: Item[ItemKey]) {
        const item = (this as Record<ItemKey, any>);
        if (typeof field === 'object') {
            Object.entries<IItem>(field).forEach(([k, v]) => {
                item[k as ItemKey] = v;
            });
        } else {
            item[field] = value;
        }
    }

    constructor(initData?: Partial<Record<ItemKey, any>>) {
        makeAutoObservable(this);
        if (initData) { this.set(initData); }
    }
}

export default Item;