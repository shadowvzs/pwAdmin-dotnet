import React from 'react';

import { RenderComponentProps } from '@pwserver/types/builder';
import PW_SERVER_DATA from '@pwserver/constants/server-data';
import Select from '../core/Select';

export const SocketSelectedItemList = (props: RenderComponentProps<number[]>) => {
    const { value, onChange } = props;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { item_extra, item_db } = PW_SERVER_DATA;
    const stones = Object.values(item_extra.soulStones).flat();
    const itemDbMap = item_db.valueMap;

    const onChangeSocketItem = React.useCallback((inputValue: string, idx: number) => {
        value[idx] = parseInt(inputValue, 10);
        onChange([...value]);
    }, [value, onChange]);

    return (
        <div className='flex flex-col px-4'>
            {value.map((socket, idx) => (
                <div key={idx}>
                    <div className='flex flex-nowrap items-center gap-1'>
                        <div className='text-xs whitespace-nowrap'>
                            {`Slot ${idx}: `}
                        </div>
                        <div>
                            <Select
                                value={socket || 0}
                                onChange={ev => onChangeSocketItem(ev.currentTarget.value, idx)}
                                style={{ fontSize: 12 }}
                                data-idx={idx}
                            >
                                <option value={0}>{'Empty'}</option>
                                {stones.map(stone => (
                                    <option
                                        value={stone}
                                        key={stone}
                                    >
                                        {itemDbMap[stone].name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const SocketSelectBase = (props: RenderComponentProps<number[]>) => {

    const { value, onChange } = props;

    const onChangeSocketAmount = React.useCallback((ev: React.ChangeEvent<HTMLSelectElement>) => {
        value.length = parseInt(ev.currentTarget.value, 10);
        onChange([...value]);
    }, [value, onChange]);

    let title: string;
    if (value.length > 0) {
        title = `Socket (${value.filter(Boolean).length}/${value.length}): `;
    } else {
        title = `Socket (0): `;
    }

    return (
        <div className='flex flex-col'>
            <div className='flex flex-nowrap items-center justify-between gap-1 w-full'>
                <div className='text-xs whitespace-nowrap'>
                    {title}
                </div>
                <div>
                    <Select
                        value={value.length}
                        onChange={onChangeSocketAmount}
                        style={{ fontSize: 12 }}
                    >
                        <option value={0}>{'No socket'}</option>
                        <option value={1}>{'1 socket'}</option>
                        <option value={2}>{'2 socket'}</option>
                        <option value={3}>{'3 socket'}</option>
                        <option value={4}>{'4 socket'}</option>
                    </Select>
                </div>
            </div>
            {value.length > 0 && (
                <SocketSelectedItemList {...props} />
            )}
        </div>
    );
};