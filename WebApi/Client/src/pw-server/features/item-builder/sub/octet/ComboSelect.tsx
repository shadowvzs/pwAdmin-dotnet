import React from 'react';

import { RenderComponentProps } from '@pwserver/types/builder';
import Select from '../core/Select';
import Input from '../core/Input';

const ComboSelect = (props: RenderComponentProps<number>) => {
    // const classes = useStyles();
    const { onChange, config } = props;

    const onChangeHandler = React.useCallback((ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = ev.currentTarget;
        onChange(config.type.includes('float') ? parseFloat(value) : parseInt(value, 10));
    }, [onChange, config]);

    return (
        <div className='text-xs flex gap-1 items-center justify-between flex-nowrap'>
            <div className='whitespace-nowrap'>
                {config.label}
            </div>
            <div className='flex items-center justify-end flex-nowrap gap-1'>
                {Boolean(config.options) && (
                    <div>
                        <Select
                            value={props.value}
                            onChange={onChangeHandler as () => void}
                            style={{ fontSize: 12, maxWidth: 100 }}
                        >
                            {config.options!.map(([label, val], idx) => (
                                <option key={idx} value={val}>{label}</option>
                            ))}
                        </Select>
                    </div>
                )}
                {config.showInput && (
                    <div>
                        <Input
                            data-index={0}
                            type='number'
                            value={props.value}
                            onChange={onChangeHandler as () => void}
                            min='0'
                            step={config.type.includes('float') ? 0.01 : 1}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComboSelect;