import React from 'react';

import type { RenderComponentProps } from '@pwserver/types/builder';

const TextSelect = (props: RenderComponentProps<string>) => {
    const classes = useStyles();
    const { value, onChange, config } = props;

    const onChangeHandler = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        onChange(ev.currentTarget.value);
    }, [onChange]);

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
                            type='text'
                            value={value || ''}
                            onChange={onChangeHandler}
                            className={classes.input}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TextSelect;