import React from 'react';
import { IconButton } from './icons';
import Input from './core/Input';
import Popover from './core/Popover';

export interface PopoverWrapperProps<T> {
    value: T;
    onChange: (value: T) => void;
    hideTitle?: boolean;
    title?: string;

    BaseCmp?: () => JSX.Element;
    Cmp: (props: Pick<PopoverWrapperProps<T>, 'value' | 'onChange' | 'hideTitle'>) => JSX.Element;
    inputStyle?: React.CSSProperties;
    boxStyle?: React.CSSProperties;
    tooltip?: string;
    editable?: boolean;
}

export function PopoverWrapper(props: PopoverWrapperProps<any>) {
    const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
    const {
        BaseCmp,
        Cmp,
        inputStyle,
        boxStyle,
        tooltip,
        title,
        editable,
        ...rest
    } = props;

    const handleClick = React.useCallback((event: React.MouseEvent<Element>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }, [anchorEl]);

    // const handleClose = React.useCallback(() => {
    //     setAnchorEl(null);
    // }, []);

    const onChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const v = ev.currentTarget.value;
        if (typeof props.value === 'number') {
            props.onChange(parseInt(v, 10));
        } else {
            props.onChange(v);
        }
    }, [props]);

    const open = Boolean(anchorEl);

    return (
        <div className='relative'>
            <div className="flex justify-between items-center">
                {title && (
                    <div className='text-xs'>
                        {title}
                    </div>
                )}
                <div className="flex flex-nowrap items-center gap-1">
                    <div>
                        { BaseCmp ? (
                            <BaseCmp />
                        ) : (
                            <Input
                                disabled={!editable}
                                onChange={onChange}
                                value={props.value}
                                style={{
                                    textAlign: 'right',
                                    padding: '2px 4px',
                                    width: 70,
                                    ...inputStyle
                                }}
                            />
                        )}
                    </div>
                    <IconButton
                        size={20}
                        icon='settings'
                        title={tooltip}
                        onClick={handleClick}
                        disabled={!editable}
                    />
                </div>
            </div>
            <Popover
                open={open}
                boxStyle={boxStyle}
            >
                <Cmp {...rest} />
            </Popover>
        </div>
    );
};