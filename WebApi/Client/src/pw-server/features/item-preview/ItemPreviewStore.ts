import { action, IReactionDisposer, makeObservable, observable, reaction } from 'mobx';

import Item from '@pwserver/model/Item';
import Converter from '@pwserver/utility/converter';
import type { IOctetData, IOctetKeys } from '@pwserver/types/builder';
import type { IMenuCategoryValueMapData, IMenuSubCategoryData, IPwServerData, IRefineBaseData } from '@pwserver/types/responses';

interface IOctetDataUI extends IOctetData {
    refine: number;
    refineValue: number;
}

interface IOctetDataUIV2 extends IOctetDataUI {
    helper: Record<string, any>
}

class ItemPreviewStore {
    public data: IPwServerData;
    private categoryIds: string | undefined;
    private converter: Converter;
    public item!: Item;
    public itemOctetData: IOctetDataUI = {} as IOctetDataUI;
    public itemOctetDataWithAddons: IOctetDataUIV2 = {} as IOctetDataUIV2;

    public setItem(item: Item) {
        this.item = item;
        this.categoryIds = '';
        this.getItemProperties(item);
        this.calculateOctetString();
    }

    private getItemProperties(item: Item) {
        this.categoryIds = this.idToCategory(item) || this.posToCategory(item) || this.maskToCategory(item) || undefined;
    }

    private idToCategory(item: Item): string | null {
        const itemData = this.data.item_db.valueMap[item.id];
        if (!itemData) { return null; }
        return itemData.category;
    }

    private posToCategory(item: Item): string | null {
        const {pos} = item;
        if (!pos) { return null; }
        const { menu, equipments } = this.data.item_extra;
        const equipment = equipments.find(x => x.pos === pos);
        if (!equipment) { return null; }
        // eslint-disable-next-line no-restricted-syntax
        for (const m of menu) {
            const subCat = m.subCategory.find(x => x.equipmentId === equipment.id);
            if (subCat) {
                return m.shortId + subCat.id;
            }
        }
        return null;
    }

    private maskToCategory(item: Item): string | null {
        const {mask} = item;
        if (!mask) { return null; }
        const { menu, equipments } = this.data.item_extra;
        const equipment = equipments.find(x => x.mask === mask);
        if (!equipment) { return null; }
        // eslint-disable-next-line no-restricted-syntax
        for (const m of menu) {
            const subCat = m.subCategory.find(x => x.equipmentId === equipment.id);
            if (subCat) {
                return m.shortId + subCat.id;
            }
        }
        return null;
    }

    public getCategories(): [IMenuCategoryValueMapData, IMenuSubCategoryData] | null {
        if (!this.categoryIds) { return null; }
        const menu = this.data.item_extra.menu.valueMap[this.categoryIds[0]];
        if (!menu) { return null; }
        return [menu, menu.subCategory.find(x => x.id === parseInt(this.categoryIds!.substr(1),10))!];
    }

    public getText = (fieldId: IOctetKeys): [string, string | number] => {
        const octetFieldMap = this.data.item_extra.octetBuilder.fields.valueMap;
        const value = this.itemOctetData[fieldId];
        return [octetFieldMap[fieldId]?.label || fieldId, Array.isArray(value) ? value.join('-') : value];
    };

    // eslint-disable-next-line complexity
    public calculateOctetString() {
        const {octetBuilder} = this.data.item_extra;
        const fieldMap = octetBuilder.fields.valueMap;
        const [/* mainCategory */, subCategory] = (this.getCategories() || []);
        if (!subCategory?.octetBuilderId) {
            this.itemOctetData = {} as IOctetDataUI;
            return console.info(this.item.id, ' has no data for decompose into data');
        }
        let refineOctetName: IRefineBaseData['octetName'] | '' = '';
        const octetBuildProfile = octetBuilder.profiles.valueMap[subCategory.octetBuilderId];
        const fieldsForBuild = octetBuildProfile.octetOrder.map(id => fieldMap[id]);
        const { octetBuilder: { addonIdModifier }, refine } = this.data.item_extra;
        const finalData: Record<keyof IOctetDataUI, any> = {} as Record<keyof IOctetDataUI, any>;
        const {data} = this.item;
        if (!data) {
            this.itemOctetData = finalData;
            return;
        }

        // position where we work with octet string
        let pos = 0;
        // till here, here we go over on all octet field which required for octet calculation
        // eslint-disable-next-line no-restricted-syntax
        for (const field of fieldsForBuild) {
            const methodName = `from${field.type[0].toUpperCase()}${field.type.substr(1)}` as 'fromInt8' | 'fromInt16' | 'fromInt32' | 'fromFloat';
            const converterMethod = this.converter[methodName];
            const getNumberFromType = field.type.match(/\d+/);
            let len = 0;
            if (getNumberFromType) {
                len = parseInt(getNumberFromType[0], 10) / 4;
            } else if (field.type.replace('LE', '') === 'float') {
                len = 8;
            }

            switch (field.flag) {
                case 'virtual':
                    // do nothing
                    break;
                case 'special':
                    // non generic logic
                    if (field.id === 'addon') {
                        const str = data.substr(pos, 8);
                        pos += 8;
                        const addonLen = this.converter.fromInt32LE(str);
                        const addons = new Array(addonLen);
                        const socketCount = (finalData.socket || []).filter(Boolean).length;

                        // eslint-disable-next-line no-plusplus
                        for (let i = 0; i < addons.length; i++) {
                            const str = data.substr(pos);
                            const addonType = this.converter.getAddonType(str);
                            const addonLen = [addonIdModifier.normal, addonIdModifier.socket].includes(addonType) ? 16 : 24;
                            const addon = this.converter.fromAddon(data.substr(pos, addonLen));
                            addons[i] = addon;
                            pos += addonLen;
                        }

                        // remove sockets
                        if (socketCount) { addons.splice(-socketCount); }

                        if (addons.length) {
                            const idx = addons.length - 1;
                            const [ addonId ] = addons[idx];
                            // eslint-disable-next-line no-restricted-syntax
                            for (const { grade, octetName } of refine.base) {
                                const grIdx = grade.findIndex(x => x.addonId === addonId);
                                // eslint-disable-next-line max-depth
                                if (grIdx >= 0) {
                                    const [, refineValue, refineLv] = addons.pop();
                                    refineOctetName = octetName;
                                    finalData.grade32 = grIdx;
                                    finalData.refineValue = refineValue;
                                    finalData.refine = refineLv;
                                    break;
                                }
                            }
                        }
                        finalData.addon = addons;
                    }
                    break;
                case 'pair':
                    // eslint-disable-next-line no-case-declarations
                    const value1 = converterMethod(data.substr(pos, len));
                    pos += len;
                    // eslint-disable-next-line no-case-declarations
                    const value2 = converterMethod(data.substr(pos, len));
                    pos += len;
                    finalData[field.id] = [value1, value2];
                    break;
                case 'array':
                    // eslint-disable-next-line no-case-declarations
                    const arr = this.converter.fromArray(data.substr(pos), len);
                    finalData[field.id] = arr;
                    pos += (arr.length + 1) * len;
                    break;
                case 'advanced':
                case 'constant':
                case 'normal':
                    // if integer values
                    if (len) {
                        finalData[field.id] = converterMethod(data.substr(pos, len));
                        pos += len;
                    } else {
                        finalData[field.id] = this.converter.fromText(data.substr(pos));
                        pos += finalData[field.id].length * 4 + 2;
                    }
                    break;
                default:
                    console.error('not handled', field);
                    break;
            }
        }

        this.itemOctetData = finalData;

        const ammoName = finalData.ammo && octetBuilder.fields.valueMap.ammo
            .options?.find(([, id]) => id === finalData.ammo)![1];

        this.itemOctetDataWithAddons = {...finalData, helper: {
            ammo: ammoName
        } };

        if (finalData.refine && refineOctetName !== '') {
            const {refineValue} = finalData;
            const iOD = this.itemOctetDataWithAddons;
            if (refineOctetName === 'mDef') {
                iOD.metalDef += refineValue;
                iOD.woodDef += refineValue;
                iOD.waterDef += refineValue;
                iOD.fireDef += refineValue;
                iOD.earthDef += refineValue;
            } else if (Array.isArray(iOD[refineOctetName])) {
                    iOD[refineOctetName as 'pDmg'] = iOD[refineOctetName as 'pDmg']
                        .map(x => x + refineValue) as [number, number];
                } else {
                    iOD[refineOctetName] += refineValue;
                }
        }
    }

    public getAddonText(id: number, value: number): string {
        const { addons, stats, statType } = this.data.item_extra;
        const addon = addons.valueMap[id];

        if (addon.isSkill) {
            return `${addon.description}`;
        }

        const stat = stats.valueMap[addon?.attributeId!];
        if (!addon || !stat) { return ''; }

        switch (statType[stat.type]) {
            case 'flat':
                return `${stat.name}: ${stat.isNegative ? '-' : '+'} ${value}`;
            case 'percentage':
                return `${stat.name}: ${stat.isNegative ? '-' : '+'} ${value}%`;
            case 'period':
                return `${stat.name}: ${stat.isNegative ? '-' : '+'} ${value}/sec`;
            case 'range':
                return `${stat.name}: ${stat.isNegative ? '-' : '+'} ${value}m`;
            case 'speed':
                return `${stat.name}: ${stat.isNegative ? '-' : '+'} ${value}m/sec`;
            case 'interval':
                return `${stat.name}: ${stat.isNegative ? '-' : '+'} ${value / 20}`;
            case 'no-value':
                return `${stat.name}`;
            default:
                console.warn('missing addon data', addon, stat);
                return `Addon [${addon.id}] - value ${value}`;
        }
    }

    public get isPhysicalWeapon(): boolean {
        const mDmg = this.itemOctetData.mDmg || [];
        return !mDmg[0];
    }

    public itemClassReq = (cMask: number) => {
        const { classes, maxMask } = this.data.classes;
        if (maxMask === this.item.mask){
            return 'All Class';
        }
            const classNames: string[] = classes
                .filter(cls => Boolean(cls.mask & cMask))
                .map(cls => cls.name);

            return classNames.join(', ') || 'Not useable';

    };

    private disposers: IReactionDisposer[] = [];

    public dispose = () => {
        this.disposers.forEach(x => x());
    };

    constructor(
        data: IPwServerData,
        _item: Item
    ) {
        this.data = data;
        this.converter = new Converter();
        makeObservable(this, {
            itemOctetDataWithAddons: observable,
            calculateOctetString: action.bound
        });

        this.setItem(_item);

        this.disposers = [
            reaction(() => _item.id, (next: number, prev: number) => {
                if (next === prev) { return; }
                this.setItem(_item);
            }),
            reaction(() => _item.data, (next: string, prev: string) => {
                if (next === prev) { return; }
                try {
                    this.setItem(_item);
                } catch (err) {
                    console.warn('octet issue');
                }
            })
        ];
    }
}

export default ItemPreviewStore;