import React from 'react';

import type { RenderComponentProps } from '@pwserver/types/builder';
import Input from '../core/Input';

const TextSelect = (props: RenderComponentProps<string>) => {
    const { value, onChange, config } = props;

    const onChangeHandler = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        onChange(ev.currentTarget.value);
    }, [onChange]);

    return (
        <div className='flex text-xs items-center justify-between'>
            <div className='whitespace-nowrap'>
                {config.label}
            </div>
            <div>
                <div className='flex justify-end gap-1'>
                    <div>
                        <Input
                            type='text'
                            value={value || ''}
                            onChange={onChangeHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextSelect;