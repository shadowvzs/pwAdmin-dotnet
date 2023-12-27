import React from 'react';
// import { makeStyles } from '@mui/styles';
// import { Grid, NativeSelect } from '@mui/material';

import { observer } from 'mobx-react-lite';
import ItemBuilderStore from '../ItemBuilderStore';
import { RootStoreContext } from '../../../contexts/RootStoreContext';

const useStyles = makeStyles({
    input: {
        width: 50,
        textAlign: 'right',
        padding: '2px 4px',
        marginTop: 2
    }
});

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
        if (!isNaN(id)) {
            this.onChange(id);
        }
    };

    public onError = (err: React.SyntheticEvent<HTMLImageElement, Event>): void => {
        if (err.currentTarget.src !== this.getIconPath(0)) {
            err.currentTarget.src = this.getIconPath(0);
        }
    };

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
    const { pwServerStore } = React.useContext(RootStoreContext);
    const {version} = pwServerStore.data.item_extra;
    const classes = useStyles();
    const store = React.useState(() => new ItemSelectStore(v => iBStore.set('id', v), ))[0];
    const menu = iBStore.category;
    const items = iBStore.menuSubCategoryItems[iBStore.currentSubCatId];

    return (
        <div className='min-w-[200px] p-4 font-xs'>
           <div className='flex flex-col gap-2'>
                <div>
                    <div className='flex flex-nowrap gap-4 justify-between'>
                        <div item>
                            <NativeSelect
                                size='small'
                                variant='filled'
                                value={iBStore.categoryId}
                                onChange={iBStore.onSelectCategory}
                            >
                                {iBStore.menuCategories.map(menu => (
                                    <option key={menu.id} value={menu.shortId}>{menu.label}</option>
                                ))}
                            </NativeSelect>
                        </div>
                        <div item>
                            <NativeSelect
                                size='small'
                                variant='standard'
                                value={iBStore.subCategoryId}
                                onChange={iBStore.onSelectSubCategory}
                            >
                                {menu.subCategory.filter(x => !x.version || x.version <= version).map(menu => (
                                    <option key={menu.id} value={menu.id}>{menu.label}</option>
                                ))}
                            </NativeSelect>
                        </div>
                    </div>
                </div>
                <div>
                    <NativeSelect
                        size='small'
                        value={props.value}
                        onChange={store.onSelectItem}
                        fullWidth
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
                    </NativeSelect>
                </div>
               <div>
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
                            <input
                                type='number'
                                value={props.value}
                                style={{ fontSize: 12, textAlign:'right', padding: '2px 4px', width: '100%' }}
                                onChange={store.onChangeInput}
                            />
                        </div>
                    </div>
               </div>
            </div>
        </div>
    );
});

export default ItemSelect;