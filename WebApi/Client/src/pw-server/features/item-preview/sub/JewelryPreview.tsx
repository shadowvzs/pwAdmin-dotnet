import { observer } from 'mobx-react-lite';
import { COLORS, PreviewRenderProps } from './common';

// eslint-disable-next-line complexity
const JewelryPreview = observer((props: PreviewRenderProps) => {

    const { data, store } = props;
    if (!store.item) { return null; }
    const [cat, subCat] = store.getCategories() || [];
    const octetData1 = store.itemOctetData;
    const octetData2 = store.itemOctetDataWithAddons;
    const { itemColor } = data.item_extra;
    const { maxMask } = data.classes;
    const itemDB = data.item_db.valueMap;
    const itemData = itemDB[store.item.id];

    if (cat?.shortId !== 'J') { return null; }

    return (
        <>
            <div style={{ paddingBottom: 6 }}>
                <span
                    className='whitespace-nowrap'
                    children={itemData?.name || 'Unknown'}
                    style={{ color: (itemData?.color && itemColor[itemData.color].code) || COLORS.NORMAL }}
                />
                {octetData2.refine > 0 && (
                    <span
                        className='whitespace-nowrap'
                        children={` +${octetData2.refine}`}
                        style={{ color: COLORS.YELLOW, marginRight: 4 }}
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
                    style={{ color: COLORS.NORMAL }}
                />
                <span

                    children={octetData2.grade32}
                    style={{ color: octetData1.grade32 !== octetData2.grade32 ? COLORS.BLUE : COLORS.NORMAL }}
                />
            </div>
            {octetData2.pAttack > 0 && (
                <div>
                    <span

                        children={`Physical Attack: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span

                        children={octetData2.pAttack}
                        style={{ color: octetData1.pAttack !== octetData2.pAttack ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData2.mAttack > 0 && (
                <div>
                    <span

                        children={`Magic Attack: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span

                        children={octetData2.mAttack}
                        style={{ color: octetData1.mAttack !== octetData2.mAttack ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData2.pDef > 0 && (
                <div key={`pDef${octetData2.pDef}`}>
                    <span

                        children={`Physical Defense: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span

                        children={octetData2.pDef}
                        style={{ color: octetData1.pDef !== octetData2.pDef ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData1.dodge > 0 && (
                <div key={`dodge${octetData2.dodge}`}>
                    <span

                        children={`Dodge: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span

                        children={octetData2.dodge}
                        style={{ color: octetData1.dodge !== octetData2.pDef ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData1.metalDef > 0 && (
                <div key={`metalDef${octetData2.metalDef}`}>
                    <span

                        children={`Metal Defense: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span

                        children={octetData2.metalDef}
                        style={{ color: octetData1.metalDef !== octetData2.metalDef ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData1.woodDef > 0 && (
                <div key={`woodDef${octetData2.woodDef}`}>
                    <span

                        children={`Wood Defense: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span

                        children={octetData2.woodDef}
                        style={{ color: octetData1.woodDef !== octetData2.woodDef ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData1.waterDef > 0 && (
                <div key={`waterDef${octetData2.waterDef}`}>
                    <span

                        children={`Water Defense: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span

                        children={octetData2.waterDef}
                        style={{ color: octetData1.waterDef !== octetData2.waterDef ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData1.fireDef > 0 && (
                <div key={`fireDef${octetData2.fireDef}`}>
                    <span

                        children={`Fire Defense: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span

                        children={octetData2.fireDef}
                        style={{ color: octetData1.fireDef !== octetData2.fireDef ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData1.earthDef > 0 && (
                <div key={`earthDef${octetData2.earthDef}`}>
                    <span

                        children={`Earth Defense: `}
                        style={{ color: COLORS.NORMAL }}
                    />
                    <span

                        children={octetData2.earthDef}
                        style={{ color: octetData1.earthDef !== octetData2.earthDef ? COLORS.BLUE : COLORS.NORMAL }}
                    />
                </div>
            )}
            {octetData2.durability && (
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
            {octetData2.lvReq && (
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
                <div style={{ marginTop: 16 }}>
                    <span

                        children={`Crafter: ${octetData2.crafter}`}
                        style={{ color: COLORS.YELLOW }}
                    />
                </div>
            )}
        </>
    );
});

export default JewelryPreview;