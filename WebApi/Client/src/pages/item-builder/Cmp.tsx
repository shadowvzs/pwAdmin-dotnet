import { observer } from 'mobx-react-lite';
import ItemBuilder from '@pwserver/features/item-builder/ItemBuilder';
import OctetPreview from '@pwserver/features/item-builder/sub/octet/OctetPreview';
import ItemPreview from '@pwserver/features/item-preview/ItemPreview';
import type { IView } from './View';

const Cmp = observer(({ store }: { store: IView }) => {
    const { item, octets, onItemBuilderChange } = store;

    return (
        <div className='overflow-auto'>
            <div className="flex flex-nowrap gap-4 justify-between">
                <ItemBuilder onChange={onItemBuilderChange}/>
            </div>
            {item && (
                <div className="flex flex-col gap-8">
                    <div>
                        <OctetPreview octets={octets} />
                    </div>
                    <div>
                        <ItemPreview item={item} />
                    </div>
                </div>
            )}
        </div>
    );
});

export default Cmp;