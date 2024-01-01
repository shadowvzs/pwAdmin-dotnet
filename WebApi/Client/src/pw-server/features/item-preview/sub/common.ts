import { IPwServerData } from '@pwserver/types/responses';
import ItemPreviewStore from '@pwserver/features/item-preview/ItemPreviewStore';

export const COLORS = {
    NORMAL: '#DDDDDD', // normal text color
    BLUE: '#7777FF', // rare gear, calculated state
    YELLOW: '#FFFF00', // crafter or refine color, yellow item quality ex. molder
    RED: '#FF7777', // legendary gear name
    CYAN: '#00FFFF', // socker amount on armor/weapon, sub category name
};

export interface PreviewRenderProps {
    data: IPwServerData;
    store: ItemPreviewStore;
}
