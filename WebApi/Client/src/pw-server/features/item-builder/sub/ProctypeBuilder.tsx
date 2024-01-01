import React from 'react';
import { observer } from 'mobx-react-lite';
import PW_SERVER_DATA from '@pwserver/constants/server-data';
import { PopoverWrapper } from './PopoverWrapper';
import Select from './core/Select';

interface ProctypeProps {
    value: number;
    onChange: (proctype: number) => void;
    hideTitle?: boolean
}

export const ProctypeBuilder = observer((props: ProctypeProps) => {
    const { proctypes } = PW_SERVER_DATA.item_extra;
    const onCheckboxChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = ev.currentTarget;
        const v = parseInt(value || '0', 10);
        const newMask = props.value + (checked ? v : -v);
        props.onChange(newMask);
    }, [props]);

    const onChange = React.useCallback((ev: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(ev.currentTarget.value || '0', 10);
        props.onChange(value);
    }, [props]);

    return (
        <div className='min-w-[200px] p-4'>
           <div className='flex flex-col gap-4'>
                {!props.hideTitle && (
                    <div className='w-full'>
                        <span className='text-lg'> Proctype </span>
                    </div>
                )}
                <div className='grid grid-cols-2 gap-2'>
                    {proctypes.map(x => (
                        <div key={x.id} className='flex flex-nowrap gap-2'>
                            <input
                                type='checkbox'
                                checked={Boolean(props.value & x.id)}
                                value={x.id}
                                onChange={onCheckboxChange}
                            />
                            <label className='text-xs'>
                                {x.name}
                            </label>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between gap-4'>
                    <div key='select'>
                        <Select
                            value={props.value.toString()}
                            onChange={onChange}
                        >
                            <option value={'0'}>Free</option>
                            <option value={'1'}>Revival Scroll</option>
                            <option value={'8'}>Fashion, Flyer</option>
                            <option value={'19'}>No drop, trade</option>
                            <option value={'64'}>Bind Equip</option>
                            <option value={'32791'}>Soulbound</option>
                        </Select>
                    </div>
                    <div key='value'>
                        <div className='flex justify-center'>
                            <div>
                                <input
                                    className='w-full'
                                    disabled
                                    defaultValue={props.value}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export const ProctypeBuilderPopover = (props: ProctypeProps) => (
        <PopoverWrapper
            editable
            Cmp={ProctypeBuilder}
            {...props}
            boxStyle={{ width: 320 }}
            title='Proctype: '
            tooltip='Edit proctype'
        />
    );