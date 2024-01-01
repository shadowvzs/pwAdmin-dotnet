import React from 'react';
import { observer } from 'mobx-react-lite';
import Input from './core/Input';

interface CountSelectsProps {
    value1: number;
    value2: number;
    onChange: (count: number) => void;
}

const CountSelect = observer((props: CountSelectsProps) => {
    const onChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = ev.currentTarget;
        const v = Number.isNaN((parseInt(value, 10))) ? 0 : parseInt(value, 10);
        props.onChange(v);
    }, [props]);

    return (
        <div className='text-xs px-4 flex gap=2'>
            <div>
                <div className='flex flex-nowrap items-center gap-1'>
                    <div>
                        <span
                            children='Qty.: '
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
            </div>
            <div>
                <div className='flex flex-nowrap items-center gap-1'>
                    <div>
                        <span
                            children='Max: '
                        />
                    </div>
                    <div>
                        <Input
                            readOnly
                            disabled
                            type='number'
                            defaultValue={props.value2}
                            style={{ fontSize: 12, width: 50, padding: '2px 4px' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CountSelect;