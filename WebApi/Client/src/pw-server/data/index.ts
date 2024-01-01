import Addon from '@pwserver/model/Addon';
import PW_SERVER_DATA from '@pwserver/constants/server-data';
import { ArrayValueMap, type IArrayValueMap } from '@utility/arrayValueMap';
import type {
    IClassStaticData,
    IClassStaticDataWithValueMap,
    IElfStaticData,
    IElfStaticValueMapData,
    IItemData, IItemExtraData,
    IItemExtraValueMapData,
    IMenuCategoryValueMapData,
    IPetStaticData,
    IPetStaticValueMapData,
    IPwServerData,
    ISkillTextData
} from '@pwserver/types/responses';

const responseMappers = {
    classes: (data: IClassStaticData): IClassStaticDataWithValueMap => {
        const newData = JSON.parse(JSON.stringify(data)) as IClassStaticDataWithValueMap;
        newData.productionSkills = ArrayValueMap.create(data.productionSkills);
        newData.commonSkills = ArrayValueMap.create(data.commonSkills);
        newData.race = ArrayValueMap.create(data.race);
        newData.cultivations = ArrayValueMap.create(data.cultivations);
        newData.classes = ArrayValueMap.create(
            data.classes.map(x => ({ ...x, skills: ArrayValueMap.create(x.skills) }))
        );
        return newData;
    },
    item_db: (data: IItemData[]): IArrayValueMap<IItemData> => ArrayValueMap.create(data),
    item_extra: (data: IItemExtraData): IItemExtraValueMapData => {
        const newData = JSON.parse(JSON.stringify(data)) as IItemExtraValueMapData;
        PW_SERVER_DATA.item_extra = newData;
        newData.stats = ArrayValueMap.create(data.stats);
        newData.addons = ArrayValueMap.create(data.addons as Addon[]);
        newData.addonTypes = ArrayValueMap.create(data.addonTypes);
        newData.proctypes = ArrayValueMap.create(data.proctypes);
        newData.itemColor = ArrayValueMap.create(data.itemColor);
        newData.equipments = ArrayValueMap.create(data.equipments);
        newData.refine = {...data.refine, base: ArrayValueMap.create(data.refine.base)};
        const {flags} = data.octetBuilder;
        newData.octetBuilder = {
            addonIdModifier: data.octetBuilder.addonIdModifier,
            flags: data.octetBuilder.flags,
            fields: ArrayValueMap.create(
                data.octetBuilder.fields.map(x => ({
                    ...x,
                    flag: flags[x.flag as number || 0]
                }))
            ),
            profiles: ArrayValueMap.create(data.octetBuilder.profiles),
        };

        newData.menu = ArrayValueMap.create(
            data.menu.filter(x => !x.version || x.version <= PW_SERVER_DATA.item_extra.version).map(x => ({...x, subCategory: ArrayValueMap.create(x.subCategory) } as IMenuCategoryValueMapData)),
            'shortId'
        );
        return newData;
    },
    skills_text: (data: ISkillTextData[]): IArrayValueMap<ISkillTextData> => ArrayValueMap.create(data),
    pet: (data: IPetStaticData): IPetStaticValueMapData => ({ ...data, skills: ArrayValueMap.create(data.skills) }),
    elf: (data: IElfStaticData): IElfStaticValueMapData => {
        const newData = JSON.parse(JSON.stringify(data)) as IElfStaticValueMapData;
        newData.color = ArrayValueMap.create(data.color);
        newData.skills = ArrayValueMap.create(data.skills);
        return newData;
    },
};

export const afterResponseMapping = {
    item_extra: (data: IItemExtraValueMapData): void => {
        Reflect.defineProperty(data, 'addons', ArrayValueMap.create(data.addons.map(Addon.create)));
    }
};

export type IMappableTypes = keyof typeof responseMappers;
export type IPostMappableTypes = keyof typeof afterResponseMapping;

export const getProcessStaticData = async () => {
    const staticData: string[] = ['elf', 'classes', 'item_db', 'item_extra', 'pet', 'skills_text' ];
    const staticDataLoaderPromiseList = staticData.map(k => import(`@pwserver/data/${k}.json`));
    const staticDataList = await Promise.all(staticDataLoaderPromiseList);
    const processedData: IPwServerData = staticDataList.map(x => x.default).reduce((finalObj: IPwServerData, staticDataImportResult, index) => {
        const key = staticData[index] as IMappableTypes;
        if (responseMappers[key]) {
            Reflect.set(finalObj, key, responseMappers[key](staticDataImportResult));
        } else {
            Reflect.set(finalObj, key, staticDataImportResult);
        }
        return finalObj;
    }, {} as IPwServerData);
    console.log(processedData);

    Object.assign(PW_SERVER_DATA, processedData);
    return processedData;
};