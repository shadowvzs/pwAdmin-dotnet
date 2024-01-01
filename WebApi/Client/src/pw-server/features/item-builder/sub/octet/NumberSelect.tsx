import React from 'react';

import { RenderComponentProps } from '@pwserver/types/builder';
import Input from '../core/Input';

const NumberSelect = (props: RenderComponentProps<number | number[]>) => {
    const { value, onChange, config } = props;
    const isRange = config.flag === 'range' || config.flag === 'pair';
    const value1 = isRange ? (value as number[])[0] : value as number;
    const value2 = isRange ? (value as number[])[1] : value as number;

    const onChangeHandler = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const { value, dataset: { index } } = ev.currentTarget;
        const v = parseFloat(value) / (config.multiplier || 1);
        if (isRange) {
            const finalValue = [value1, value2];
            finalValue[parseFloat(index!)] = v;
            // eslint-disable-next-line prefer-destructuring
            if (finalValue[0] > finalValue[1]) { finalValue[0] = finalValue[1]; }
            onChange(finalValue);
        } else if (config.min && !v && v < config.min) {
                onChange(config.min);
            } else if (config.max && v > config.max) {
                onChange(config.max);
            } else {
                onChange(v);
            }
    }, [isRange, value1, value2, config, onChange]);

    return (
        <div className='flex text-xs items-center justify-between w-full gap-4'>
            <div className='whitespace-nowrap'>
                {config.label}
            </div>
            <div className='flex justify-center gap-2'>
                <div>
                    <Input
                        data-index={0}
                        type='number'
                        value={value1 * (config.multiplier || 1)}
                        onChange={onChangeHandler}
                        max={config.id.startsWith('grade') ? 20 : undefined}
                        min={config.id.startsWith('grade') ? 1 : 0}
                        size={8}
                        className='text-right max-w-[80px]'
                    />
                </div>
                {isRange && (
                    <div>
                        <Input
                            data-index={1}
                            type='number'
                            value={value2 * (config.multiplier || 1)}
                            onChange={onChangeHandler}
                            min='0'
                            size={8}
                            className='text-right max-w-[80px]'
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default NumberSelect;