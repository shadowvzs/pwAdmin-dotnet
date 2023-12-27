import React from 'react';
import { observer } from 'mobx-react-lite';
import type { IItem } from '@pwserver/types/common';
import { EntityId } from '@pwserver/model/BaseEntity';
import { RootStoreContext } from '../../contexts/RootStoreContext';
import { ProctypeBuilderPopover } from './sub/ProctypeBuilder';
import ItemSelect from './sub/ItemSelect';
import GuidSelects from './sub/GuidSelects';
import { ExpireDateSelectPopover } from './sub/ExpireDateSelect';
import CountSelect from './sub/CountSelect';
import { MaskBuilderPopover } from './sub/octet/MaskSelect';
import ItemBuilderStore from './ItemBuilderStore';
import { OctetBuilder } from './sub/OctetBuilder';
import { ItemPreview } from '../itemPreview.tsx/ItemPreview';
import OctetPreview from './sub/octet/OctetPreview';

interface ItemBuilderProps {
    selectedUserId?: EntityId;
    initItemData?: Partial<IItem>;
}

const ItemBuilder = observer((props: ItemBuilderProps) => {
    const rootStore = React.useContext(RootStoreContext);
    const store = React.useState(() => new ItemBuilderStore(rootStore.pwServerStore.data, props.initItemData))[0];

    // if (!rootStore.authStore.currentUser) { return null; }
    const {item} = store;

    return (
        <div className="flex flex-col">
            <div className='min-w-[200px] max-w-[320px] p-4'>
                <div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Typography
                                variant='h6'
                                children='Item Builder'
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={(
                                    <Checkbox
                                        size='small'
                                        checked={store.showAdvancedUI}
                                        onChange={store.toggleAdvancedUI}
                                    />
                                )}
                                label={(
                                    <Typography
                                        variant='body2'
                                        children='Advanced UI'
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <ItemSelect
                        value={store.item.id}
                        store={store}
                    />
                </div>
                {!['W', 'A', 'J'].includes(store.categoryId) && (
                    <div>
                        <CountSelect
                            value1={item.count}
                            value2={item.max_count}
                            onChange={(count: number) => store.set('count', count)}
                        />
                    </div>
                )}
                {store.showAdvancedUI && (
                <div>
                    <GuidSelects
                        value1={item.guid1}
                        value2={item.guid2}
                        onChange={store.set}
                    />
                </div>
                )}
                {store.showAdvancedUI && (
                    <div style={{ padding: '0 16px' }}>
                        <MaskBuilderPopover
                            value={item.mask}
                            onChange={(mask: number) => store.set('mask', mask)}
                        />
                    </div>
                )}
                {store.showAdvancedUI && (
                    <div style={{ padding: '0 16px' }}>
                        <ExpireDateSelectPopover
                            value={item.expire_date}
                            onChange={(v: number) => store.set('expire_date', v)}
                        />
                    </div>
                )}
                {store.showAdvancedUI && (
                    <div style={{ padding: '0 16px' }}>
                        <ProctypeBuilderPopover
                            value={item.proctype}
                            onChange={(v: number) => store.set('proctype', v)}
                        />
                    </div>
                )}
                {store.octetBuildData.length > 0 && (
                    <div>
                        <OctetBuilder
                            store={store}
                        />
                    </div>
                )}
            </div>
            <div className={classes.builder}>
                <div className="flex flex-col">
                    <div>
                        <OctetPreview store={store} />
                    </div>
                    <div>
                        <ItemPreview item={store.item} />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ItemBuilder;