import { observer } from 'mobx-react-lite';
import type { IOctetKeys } from '@pwserver/types/builder';
import { COLORS, PreviewRenderProps } from './common';

const OtherOctetPreview = observer((props: PreviewRenderProps) => {

    const { data, store } = props;
    if (!store.item) { return null; }
    // const [cat, subCat] = store.getCategories() || [];
    const octetData1 = store.itemOctetData;
    const { itemColor } = data.item_extra;
    const itemDB = data.item_db.valueMap;
    const itemData = itemDB[store.item.id];

    return (
        <>
            <div style={{ paddingBottom: 6 }}>
                <span
                    className='whitespace-nowrap'
                    children={itemData?.name || 'Unknown'}
                    style={{ color: (itemData?.color && itemColor[itemData.color].code) || COLORS.NORMAL }}
                />
            </div>
           {Object.keys(octetData1).map((fieldId) => {
               const [label, value] = store.getText(fieldId as any as IOctetKeys);
               if (label.startsWith('Reserved')) { return null; }
               return (
                    <div style={{ paddingBottom: 6 }} key={fieldId}>
                        <span
                            className='whitespace-nowrap'
                            children={`${label} ${value}`}
                            style={{ color: COLORS.NORMAL }}
                        />
                    </div>
               );
           })}
        </>
    );
});

export default OtherOctetPreview;