import { observer } from 'mobx-react-lite';
import React from 'react';
import Item from '@pwserver/model/Item';
import PW_SERVER_DATA from '@pwserver/constants/server-data';
import ItemPreviewStore from './ItemPreviewStore';
import ArmorPreview from './sub/ArmorPreview';
import JewelryPreview from './sub/JewelryPreview';
import OtherOctetPreview from './sub/OtherOctetPreview';
import WeaponPreview from './sub/WeaponPreview';

interface ItemPreviewProps {
    item: Item;
}

const renderMap = {
    'W': WeaponPreview,
    'A': ArmorPreview,
    'J': JewelryPreview,
    'B': ArmorPreview,
    'O': OtherOctetPreview,
    'U': OtherOctetPreview,
    'Default': () => null
};

const ItemPreview = observer((props: ItemPreviewProps) => {
    const data = PW_SERVER_DATA;
    const store = React.useState(() => new ItemPreviewStore(data, props.item))[0];
    if (store.item?.id !== props.item?.id) {
        store.setItem(props.item);
    }

    React.useEffect(() => store.dispose, [store]);
    if (!store.item?.data) { return null; }
    const [mainCat, subCat] = store.getCategories() || [];

    let Render = renderMap[(subCat?.shortId || mainCat!.shortId) as keyof typeof renderMap];
    if (!Render) { Render = renderMap.Default; }

    return (
        <div
            className='pb-3 relative px-4 py-2 text-base select-none inline-block min-h-[100px] bg-black border-2 border-[#bbb] text-gray-100 rounded-lg'
        >
            <Render store={store} data={data} />
        </div>
    );
});

export default ItemPreview;