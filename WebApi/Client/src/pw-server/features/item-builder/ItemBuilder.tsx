import React from 'react';
import { observer } from 'mobx-react-lite';
import type { IItem } from '@pwserver/types/common';
import type { EntityId } from '@pwserver/model/BaseEntity';
import Item from '@pwserver/model/Item';
import { OctetChunk } from '@pwserver/types/builder';
import { ProctypeBuilderPopover } from './sub/ProctypeBuilder';
import ItemSelect from './sub/ItemSelect';
import GuidSelects from './sub/GuidSelects';
import { ExpireDateSelectPopover } from './sub/ExpireDateSelect';
import CountSelect from './sub/CountSelect';
import { OctetBuilder } from './sub/OctetBuilder';
import { MaskBuilderPopover } from './sub/octet/MaskSelect';
import ItemBuilderStore from './ItemBuilderStore';

interface ItemBuilderProps {
    selectedUserId?: EntityId;
    initItemData?: Partial<IItem>;

    onChange?: (item: Item, octets: OctetChunk[]) => void;
}
/*
petEggLevelReq
petEggClassMask //219 or 8 depends on pet type
petEggClassLoyality // max 999
petEggPetId
emptyInt32
petEggEggId
petEggPetType // 0 mount, 1 battle, 2 all class baby
petEggPetLevel
emptyInt32
emptyInt32
emptyInt16
petEggSkills // skills - skills itself will be at last place
emptyInt32
emptyInt32
emptyInt32
emptyInt32
// individual skills int32 skill id + int32 skill level (1-5)
*/
const ItemBuilder = observer((props: ItemBuilderProps) => {
    const store = React.useState(() => new ItemBuilderStore(props))[0];
    const { item, data, loading } = store;

    if (loading) { return <div>loading....</div>; }
    if (!data) { return <div>Data not loaded yet </div>; }

    return (
        <div className='min-w-[200px] w-full max-w-[320px] p-4 flex flex-col gap-1'>
            <div>
                <div className="flex items-center justify-between px-4">
                    <div>
                        <h6>Item Builder</h6>
                    </div>
                    <div className='flex gap-2'>
                        <input
                            id='show-advanced-UI'
                            type='checkbox'
                            checked={store.showAdvancedUI}
                            onChange={store.toggleAdvancedUI}
                        />
                        <label htmlFor='show-advanced-UI'>
                            Advanced UI
                        </label>
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
                    <OctetBuilder store={store} />
                </div>
            )}
        </div>
    );
});

export default ItemBuilder;