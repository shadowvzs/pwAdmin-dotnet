import React from 'react';
import { IconButton } from './icons';

export interface CollapseWrapperProps<T> {
    value: T;
    onChange: (value: T) => void;

    BaseCmp: () => JSX.Element;
    Cmp: (props: Omit<CollapseWrapperProps<T>, 'Cmp' | 'BaseCmp'>) => JSX.Element;
    disabled?: boolean;
}

export function CollapseWrapper<T>(props: CollapseWrapperProps<T>) {
    const [open, setOpen] = React.useState<boolean>(false);
    const {
        BaseCmp,
        Cmp,
        disabled,
        ...rest
    } = props;

    const onToggle = React.useCallback((_event: React.MouseEvent<Element>) => {
        setOpen(!open);
    }, [open]);

    return (
        <div className='flex flex-col'>
            <div className='flex items-center flex-nowrap w-full'>
                <div className='flex items-center justify-between w-full'>
                    <BaseCmp />
                </div>
                <IconButton
                    size={20}
                    icon={open ? 'collapse' : 'expand'}
                    onClick={disabled ? undefined : onToggle}
                    style={{ opacity: disabled ? 0.56 : 1 }}
                    disabled={disabled}
                />
            </div>
            {open && (
                <div className='w-full'> {/* open and close */}
                    <Cmp {...rest} />
                </div>
            )}
        </div>
    );
};