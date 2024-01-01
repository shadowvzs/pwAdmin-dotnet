import { observer } from 'mobx-react-lite';
import { COLORS, PreviewRenderProps } from './common';

// eslint-disable-next-line complexity
const WeaponPreview = observer((props: PreviewRenderProps) => {

    const { data, store } = props;
    if (!store.item) { return null; }
    const [cat, subCat] = store.getCategories() || [];
    const octetData1 = store.itemOctetData;
    const octetData2 = store.itemOctetDataWithAddons;
    const { itemColor } = data.item_extra;
    const { maxMask } = data.classes;
    const itemDB = data.item_db.valueMap;
    const itemData = itemDB[store.item.id];

    if (cat?.shortId !== 'W') { return null; }

    return (
        <>
            <div className='pb-2'>
                <span
                    className='whitespace-nowrap'
                    children={itemData?.name || 'Unknown'}
                    style={{ color: (itemData?.color && itemColor[itemData.color].code) || COLORS.NORMAL }}
                />
                {octetData2.refine > 0 && (
                    <span
                        className='whitespace-nowrap mr-1'
                        children={` +${octetData2.refine}`}
                        style={{ color: COLORS.YELLOW }}
                    />
                )}
                {octetData2.socket?.length > 0 && (
                    <span
                        className='whitespace-nowrap mr-1'
                        children={` (${octetData2.socket.length} socket)`}
                        style={{ color: '#00FFFF' }}
                    />
                )}
            </div>
            <div>
                <span
                    children={subCat?.label}
                    style={{ color: COLORS.CYAN }}
                />
            </div>
            <div>
                <span
                    children={`Grade Rank `}
                />
                <span
                    children={octetData2.grade32}
                    style={{ color: octetData1.grade32 !== octetData2.grade32 ? COLORS.BLUE : COLORS.NORMAL }}
                />
            </div>
            {octetData2.aSpeed > 0 && (
                <div>
                    <span
                        children={`Attack Freq.: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span
                        children={(20 / octetData2.aSpeed).toFixed(2)}
                        style={{ color: octetData1.aSpeed !== octetData2.aSpeed ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData2.range > 0 && (
                <div>
                    <span
                        children={`Range:`}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span
                        children={octetData2.range}
                        style={{ color: octetData1.range !== octetData2.range ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData2.minRange > 0 && (
                <div>
                    <span
                        children={`Min. Range:`}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span
                        children={octetData1.minRange}
                        style={{ color: COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData2.pDmg?.[0] > 0 && (
                <div key={`pdmg${octetData1.pDmg[0]}-${octetData2.pDmg[1]}`}>
                    <span
                        children={`Physical Attack: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span
                        children={`${octetData2.pDmg[0]}-${octetData2.pDmg[1]}`}
                        style={{ color: octetData1.pDmg[0] !== octetData2.pDmg[0] ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData2.mDmg?.[0] > 0 && (
                <div key={`pdmg${octetData1.mDmg[0]}-${octetData2.mDmg[1]}`}>
                    <span
                        children={`Magic Attack: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span
                        children={`${octetData2.mDmg[0]}-${octetData2.mDmg[1]}`}
                        style={{ color: octetData1.mDmg[0] !== octetData2.mDmg[0] ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData2.durability?.[0] > 0 && (
                <div>
                    <span
                        children={`Durability: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                  <span
                        children={octetData2.durability.map(x => Math.floor(x / 100)).join('-')}
                        style={{ color: octetData1.durability[0] !== octetData2.durability[0] ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData2.ammo > 0 && (
                <div>
                    <span
                        children={`Ammo Type: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                  <span
                        children={octetData2.helper.ammo}
                        style={{ color: COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData2.classReq !== maxMask && (
                <div>
                    <span
                        children={`Class Req.: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span
                        children={store.itemClassReq(octetData2.classReq)}
                        style={{ color: COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData2.lvReq > 0 && (
                <div>
                    <span
                        children={`Level Req.: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span
                        children={octetData2.lvReq}
                        style={{ color: octetData1.lvReq !== octetData2.lvReq ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData2.strReq > 0 && (
                <div>
                    <span
                        children={`Strength Req.: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span
                        children={octetData2.strReq}
                        style={{ color: octetData1.strReq !== octetData2.strReq ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData2.agiReq > 0 && (
                <div>
                    <span
                        children={`Agility Req.: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span
                        children={octetData2.agiReq}
                        style={{ color: octetData1.agiReq !== octetData2.agiReq ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData2.intReq > 0 && (
                <div>
                    <span
                        children={`Intelligent Req.: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span
                        children={octetData2.intReq}
                        style={{ color: octetData1.intReq !== octetData2.intReq ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData2.conReq > 0 && (
                <div>
                    <span
                        children={`Constitute Req.: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span
                        children={octetData2.conReq}
                        style={{ color: octetData1.conReq !== octetData2.conReq ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData2.socket?.filter(Boolean).map((x, idx) => (
                <div style={{ marginLeft: 16 }} key={`socket${idx}`}>
                    <span
                        children={itemDB[x]?.name || 'Unknown stone'}
                        style={{ color: COLORS.YELLOW }}
                    />
                </div>
            ))}
            {(octetData2.addon as unknown as [number, number][]).filter(Boolean).map((x, idx) => (
                <div style={{ marginTop: 8 }} key={`addon${idx}`}>
                    <span
                        children={store.getAddonText(...x)}
                        style={{ color: COLORS.BLUE }}
                    />
                </div>
            ))}
            {Boolean(octetData2.crafter) && (
                <div className='mt-4'>
                    <span
                        children={`Crafter: ${octetData2.crafter}`}
                        style={{ color: COLORS.YELLOW }}
                    />
                </div>
            )}
        </>
    );
});

export default WeaponPreview;