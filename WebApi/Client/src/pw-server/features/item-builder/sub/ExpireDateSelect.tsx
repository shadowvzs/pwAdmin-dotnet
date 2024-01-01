import React from 'react';
import { observer } from 'mobx-react-lite';

import { PopoverWrapper } from './PopoverWrapper';
import Input from './core/Input';

interface ExpireDateSelectProps {
    value: number;
    onChange: (expire: number) => void;

    hideTitle?: boolean
}

export const ExpireDateSelect = observer((props: ExpireDateSelectProps) => {
    const onChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(ev.currentTarget.value || '0', 10);
        props.onChange(value);
    }, [props]);

    return (
        <div className='flex flex-col text-xs gap-2 p-4'>
            <div className='text-lg'>
                <span children={'Expire'} />
            </div>
            <div className='flex gap-2 justify-between'>
                <label className='whitespace-nowrap' htmlFor='expire-date-select'>
                    Next appointment
                </label>
                <Input
                    id='expire-date-select'
                    className='text-xs'
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    onChange={onChange}
                />
            </div>
            <div className='flex justify-end'>
                <Input
                    className='text-right'
                    disabled
                    defaultValue={props.value}
                />
            </div>
        </div>
    );
});

export const ExpireDateSelectPopover = (props: ExpireDateSelectProps) => (
        <PopoverWrapper
            editable
            Cmp={ExpireDateSelect}
            {...props}
            boxStyle={{ width: 320 }}
            title='Expire: '
            tooltip='Edit expire'
        />
    );