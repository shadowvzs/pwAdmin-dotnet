import React from 'react';

import PW_SERVER_DATA from '@pwserver/constants/server-data';
import { PopoverWrapper } from '../PopoverWrapper';
import Input from '../core/Input';

interface MaskSelectsProps {
    value: number;
    onChange: (mask: number) => void;
}

export const MaskSelect = (props: MaskSelectsProps) => {
    const { equipments, version } = PW_SERVER_DATA.item_extra;

    const onChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const t = ev.currentTarget;
        const v = parseInt(t.value || '0', 10);
        props.onChange(v);
    }, [props]);

    return (
        <div className='flex flex-col text-xs p-4 gap-4'>
            <div>
                <h4 className='text-base' children='Mask: ' />
            </div>
            <div className='grid grid-cols-2'>
                {equipments.filter(x => !x.version || x.version <= version).map(x => (
                    <div className='flex gap-2 items-center' key={x.id}>
                        <input
                            type='radio'
                            value={x.mask}
                            onChange={onChange}
                            name="mask"
                            checked={props.value === x.mask}
                        />
                        <label className='text-xs max-w-[80px] whitespace-nowrap'>{x.name}</label>
                    </div>
                ))}
            </div>
            <div key='value' className='text-right flex justify-end'>
                <Input
                    disabled
                    value={String(props.value || 0)}
                    style={{ padding: '2px 4px', width: 100, textAlign:'right' }}
                />
            </div>
        </div>
    );
};

export const MaskBuilderPopover = (props: MaskSelectsProps) => (
        <PopoverWrapper
            editable
            Cmp={MaskSelect}
            {...props}
            title='Mask: '
            tooltip='Edit mask'
        />
    );