import React from 'react';
import { observer } from 'mobx-react-lite';
import PW_SERVER_DATA from '@pwserver/constants/server-data';
import ItemBuilderStore from '../ItemBuilderStore';
import Input from './core/Input';
import Select from './core/Select';

interface ItemSelectProps {
    hideTitle?: boolean
    value: number;
    store: ItemBuilderStore;
}

class ItemSelectStore {
    public onChange: (id: number) => void;
    public onSelectItem = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
        const id = parseInt(ev.target.value, 10);
        this.onChange(id);
    };

    public onChangeInput = (ev: React.ChangeEvent<HTMLInputElement>): void => {
        const id = parseInt(ev.currentTarget.value.trim() || '0', 10);
        if (!Number.isNaN(id)) {
            this.onChange(id);
        }
    };

    public onError = (err: React.SyntheticEvent<HTMLImageElement, Event>): void => {
        const path = this.getIconPath(0);
        if (err.currentTarget.src !== path) {
            Reflect.set(err.currentTarget, 'src', path);
        }
    };

    // eslint-disable-next-line class-methods-use-this
    public getIconPath(id: number): string {
        return `./images/icons/items/${id || '0'}.gif`;
    }

    constructor(
        onChange: (id: number) => void,
    ) {
        this.onChange = onChange;
    }
}

const ItemSelect = observer((props: ItemSelectProps) => {
    const iBStore = props.store;
    const { version } = PW_SERVER_DATA.item_extra;
    const store = React.useState(() => new ItemSelectStore(v => iBStore.set('id', v), ))[0];
    const menu = iBStore.category;
    const items = iBStore.menuSubCategoryItems[iBStore.currentSubCatId];

    return (
        <div className='min-w-[200px] p-4 font-xs border-1'>
           <div className='flex flex-col gap-1'>
                <div className='flex flex-nowrap gap-4 items-center justify-between'>
                    <div>
                        <img
                            src={store.getIconPath(props.value)}
                            onError={store.onError}
                            alt={String(props.value || 'None')}
                            width={32}
                        />
                    </div>
                    <div>
                        <Input
                            className='text-right text-xs py-1 px-2 w-full'
                            type='number'
                            value={props.value}
                            onChange={store.onChangeInput}
                        />
                    </div>
                </div>
                <div className='flex flex-nowrap gap-4 justify-between'>
                    <div>
                        <Select
                            value={iBStore.categoryId}
                            onChange={iBStore.onSelectCategory}
                        >
                            {iBStore.menuCategories.map(menu => (
                                <option key={menu.id} value={menu.shortId}>{menu.label}</option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <Select
                            value={iBStore.subCategoryId}
                            onChange={iBStore.onSelectSubCategory}
                        >
                            {menu.subCategory.filter(x => !x.version || x.version <= version).map(menu => (
                                <option key={menu.id} value={menu.id}>{menu.label}</option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div>
                    <Select
                        onChange={store.onSelectItem}
                        className='w-full'
                    >
                         <option
                            key={'none'}
                            value={0}
                            children={'None'}
                        />
                        {items.map(item => (
                            <option
                                key={item.id}
                                value={item.id}
                                children={item.name}
                                style={{ backgroundColor: iBStore.getItemColor(item) }}
                            />
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    );
});

export default ItemSelect;