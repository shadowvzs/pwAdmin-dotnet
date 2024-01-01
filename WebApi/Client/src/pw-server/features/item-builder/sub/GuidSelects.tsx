import React from 'react';
import { observer } from 'mobx-react-lite';
import { ItemKey } from '@pwserver/types/common';
import Input from './core/Input';

interface GuidSelectsProps {
    value1: number;
    value2: number;
    onChange: (key: ItemKey, value: string | number) => void;
}

const GuidSelects = observer((props: GuidSelectsProps) => {
    const onChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = ev.currentTarget;
        const v = Number.isNaN((parseInt(value, 10))) ? 0 : parseInt(value, 10);
        props.onChange(name as 'guid1' | 'guid2', v);
    }, [props]);

    return (
        <div className='flex gap-2 text-xs py-1 px-4'>
            <div className='flex flex-nowrap items-center gap-1'>
                <div>
                    <span
                        children='Guid1: '
                    />
                </div>
                <div>
                    <Input
                        name='guid1'
                        type='number'
                        value={props.value1}
                        style={{ fontSize: 12, width: 50, padding: '2px 4px' }}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className='flex flex-nowrap items-center gap-1'>
                <div>
                    <span
                        children='Guid2: '
                    />
                </div>
                <div>
                    <Input
                        name='guid2'
                        type='number'
                        value={props.value2}
                        style={{ fontSize: 12, width: 50, padding: '2px 4px' }}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
});

export default GuidSelects;