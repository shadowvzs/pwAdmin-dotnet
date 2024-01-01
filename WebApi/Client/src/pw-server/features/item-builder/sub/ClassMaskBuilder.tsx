import React from 'react';

import PW_SERVER_DATA from '@pwserver/constants/server-data';
import { PopoverWrapper } from './PopoverWrapper';
import Input from './core/Input';

interface ClassMaskProps {
    value: number;
    onChange: (mask: number) => void;

    hideTitle?: boolean
}

export const ClassMaskBuilder = (props: ClassMaskProps) => {
    const { maxClass, maxMask, classes: pwClasses } = PW_SERVER_DATA.classes;

    const onCheckboxChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const { value, onChange } = props;
        const t = ev.currentTarget;
        const isChecked = t.checked;
        const v = parseInt(t.value || '0', 10);
        const newMask = value + (isChecked ? v : -v);
        onChange(newMask);
    }, [props]);

    const onToggleAll = React.useCallback((_ev: React.ChangeEvent<HTMLInputElement>) => {
        const { value, onChange } = props;
        const newMask = value === maxMask ? 0 : maxMask;
        onChange(newMask);
    }, [props, maxMask]);

    return (
        <div className='min-w-[200px] p-4'>
           <div>
                {!props.hideTitle && (
                    <div className='text-lg'>
                        Class Mask
                    </div>
                )}
                <div className='grid grid-cols-2 gap-1 py-2'>
                    {pwClasses.slice(0, maxClass).map(x => (
                        <div key={x.mask} className='flex gap-2 items-center'>
                            <input
                                type='checkbox'
                                checked={Boolean(props.value & x.mask)}
                                value={x.mask}
                                onChange={onCheckboxChange}
                            />
                            <label className='text-xs'>
                                {x.name}
                            </label>
                        </div>
                    ))}
                    <div key='all' className='flex gap-2 items-center'>
                        <input
                            type='checkbox'
                            checked={Boolean(props.value === maxMask)}
                            onChange={onToggleAll}
                        />
                        <label className='text-xs'>
                            Select All
                        </label>
                    </div>
                </div>
                <div key='value' className='flex justify-end'>
                    <div>
                        <Input disabled value={String(props.value || 0)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ClassMaskBuilderPopover = (props: ClassMaskProps) => (
        <PopoverWrapper
            editable
            Cmp={ClassMaskBuilder}
            {...props}
            title='Class Mask: '
            tooltip='Edit class mask'
        />
    );