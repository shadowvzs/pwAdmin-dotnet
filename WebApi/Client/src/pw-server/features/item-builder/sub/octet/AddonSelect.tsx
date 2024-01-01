import React from 'react';
import { observer } from 'mobx-react-lite';
import { RenderComponentProps } from '@pwserver/types/builder';
import Addon from '@pwserver/model/Addon';
import PW_SERVER_DATA from '@pwserver/constants/server-data';
import { AddonTypeEnum } from '@pwserver/types/responses';
import Input from '../core/Input';
import Select from '../core/Select';
import Popover from '../core/Popover';
import { IconButton } from '../icons';
import Button from '../core/Button';

interface AddonListItemProps {
    addonDataString: string;
    onDelete: () => void;
}

const AddonListItem = (props: AddonListItemProps) => {
    const { addonDataString, onDelete } = props;
    const addon = React.useState(() => {
        const a = new Addon();
        a.deserialize(addonDataString);
        return a;
    })[0];

    return (
        <div className='flex flex-nowrap items-center justify-between gap-1 px-4 w-full'>
            <div className='text-xs'>
                {addon.$name}
            </div>
            <IconButton
                icon='delete'
                className='text-red-600'
                onClick={onDelete}
            />
        </div>
    );
};

const AddonList = (props: RenderComponentProps<string[]>) => {
    const { value, onChange } = props;

    const onDelete = React.useCallback((index: number) => {
          const v = [...value];
        v.splice(index, 1);
        onChange(v);
    }, [value, onChange]);

    return (
        <div
            className='flex flex-col px-4'
        >
            {value.map((x, idx) => (
                <div key={idx}>
                    <div>
                        <AddonListItem
                            key={idx}
                            onDelete={() => onDelete(idx)}
                            addonDataString={x}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export const AddonSelectBase = (props: RenderComponentProps<string[]>) => {

    const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

    const onOpenClick = React.useCallback((event: React.MouseEvent<Element>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const onClose = React.useCallback(() => { setAnchorEl(null); }, []);
    const count = props.value.filter(Boolean).length;
    return (

        <div className='flex flex-col text-xs'>
            <div
                className='flex flex-nowrap items-center justify-between gap-2'
            >
                <div>
                    Addons ({count}):
                </div>
                <IconButton
                    title='add new addon'
                    icon='add'
                    onClick={onOpenClick}
                />
            </div>
            <Popover
                open={Boolean(anchorEl)}
            >
                <AddAddon {...props} onClose={onClose} />
            </Popover>
            {count > 0 && (
                <AddonList {...props} />
            )}
        </div>
    );
};

export const AddAddon = observer((props: RenderComponentProps<string[]> & { onClose: () => void }) => {
    const { addons, version } = PW_SERVER_DATA.item_extra;
    const addonList = React.useState(() => {
        const filteredAddons = addons
            .filter(x => (!x.version || x.version <= version) && !x.isHidden)
            .filter(x => x.supportedEquipment.includes(props.category));
        return filteredAddons;
    })[0];

    const addon = React.useState(() => {
        const a = new Addon();
        a.setId(addonList[0]?.id || 0, true);
        return a;
    })[0];

    const [timeUnit, setTimeUnit] = React.useState(1);

    const onAdd = React.useCallback(() => {
        const v = props.value;
        props.onChange([addon.serialize, ...v]);
    }, [addon, props]);

    const isDisabled = Number.isNaN(addon.value1) || Number.isNaN(addon.value2) || (
        !addon.isSkill && addon.value1 <= 0
    ) || (
        addon.isRune && addon.value2 <= 0
    );

    return (
        <div
            className='flex flex-col text-xs'
            style={{ width: 240, padding: 16 }}
        >
            <h4>Add new addon</h4>
            <div
                className='flex items-center flex-nowrap justify-between'
            >
                <div>
                    Addon:
                </div>
                <div>
                    <Select
                        value={String(addon.id)}
                        onChange={ev => addon.setId(parseInt(ev.currentTarget.value, 10), true)}
                        style={{ fontSize: 12 }}
                    >
                        {addonList.map(addon => (
                            <option
                                value={String(addon.id)}
                                key={addon.id}
                            >
                                {addon.$name ?? addon.id}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>
            {!addon.isSkill && (
                <div style={{ marginTop: 6 }}>
                    <div
                        className='flex items-center justify-between gap-1 flex-nowrap'
                    >
                        <div>
                            <span
                                children={'Value'}
                            />
                        </div>
                        <div>
                            <Input
                                type='number'
                                max={props.config.type.includes('int32') ? 65535 : 255}
                                style={{ width: 60, textAlign: 'right' }}
                                value={String(addon.value1)}
                                disabled={addon.type === AddonTypeEnum.Skill}
                                onChange={ev => addon.setValue1(parseInt(ev.currentTarget.value, 10))}
                            />
                        </div>
                    </div>
                </div>
            )}
            {addon.isRune && (
                <div style={{ marginTop: 4 }}>
                    <div
                        className='flex items-center justify-between gap-1 flex-nowrap'
                    >
                        <div>
                            <span
                                children={'Duration'}
                            />
                        </div>
                        <div>
                            <Input
                                type='number'
                                value={String(addon.value2 / timeUnit)}
                                onChange={ev => addon.setValue2(parseInt(ev.currentTarget.value, 10) * timeUnit)}
                                style={{ width: 50, textAlign: 'right' }}
                                disabled={addon.type !== AddonTypeEnum.Rune}
                                min='0'
                            />
                        </div>
                        <div>
                            <Select
                                value={String(timeUnit)}
                                onChange={ev => setTimeUnit(parseInt(ev.currentTarget.value, 10))}
                                disabled={addon.type !== AddonTypeEnum.Rune}
                                style={{ fontSize: 12 }}
                            >
                                <option value={1}>minute</option>
                                <option value={60}>hour</option>
                                <option value={1440}>day</option>
                            </Select>
                        </div>
                    </div>
                </div>
            )}
            <div style={{ marginTop: addon.isSkill ? 16 : 8 }}>
                <span
                    children={addon.$name}
                />
            </div>
            {addon.isSkill && (
                <div style={{ marginTop: 6 }}>
                    <span
                        children={addon.description}
                    />
                </div>
            )}
            <div style={{ marginTop: 12, textAlign: 'right' }}>
                <div className='flex justify-end gap-2'>
                        <div>
                            <Button
                                type='button'
                                children='Add'
                                disabled={isDisabled}
                                onClick={onAdd}
                            />
                        </div>
                        <div>
                            <Button
                                type='button'
                                children='Close'
                                onClick={props.onClose}
                            />
                        </div>
                </div>
            </div>
        </div>
    );
});
