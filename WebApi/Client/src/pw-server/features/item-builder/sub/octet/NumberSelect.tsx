import React from 'react';

import { RenderComponentProps } from '../../../../interfaces/builder';

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
        <Grid container className='text-xs' alignItems='center' justifyContent='space-between'>
            <Grid item>
                <Typography
                    variant='body2'
                    children={config.label}
                />
            </Grid>
            <Grid item>
                <Grid container spacing={1} justifyContent='flex-end'>
                    <Grid item>
                        <input
                            data-index={0}
                            type='number'
                            value={value1 * (config.multiplier || 1)}
                            onChange={onChangeHandler}
                            className={classes.input}
                            max={config.id.startsWith('grade') ? 20 : undefined}
                            min={config.id.startsWith('grade') ? 1 : 0}
                        />
                    </Grid>
                    {isRange && (
                        <Grid item>
                            <input
                                data-index={1}
                                type='number'
                                value={value2 * (config.multiplier || 1)}
                                onChange={onChangeHandler}
                                className={classes.input}
                                min='0'
                            />
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default NumberSelect;