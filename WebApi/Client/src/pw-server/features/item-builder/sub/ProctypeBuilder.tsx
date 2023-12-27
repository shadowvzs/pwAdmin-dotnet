import React from 'react';
import { observer } from 'mobx-react-lite';
import { PopoverWrapper } from './PopoverWrapper';
import { RootStoreContext } from '../../../contexts/RootStoreContext';

interface ProctypeProps {
    value: number;
    onChange: (proctype: number) => void;

    hideTitle?: boolean
}

export const ProctypeBuilder = observer((props: ProctypeProps) => {

    const classes = useStyles();
    const { pwServerStore } = React.useContext(RootStoreContext);
    const { proctypes } = pwServerStore.data.item_extra;

    const onCheckboxChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = ev.currentTarget;
        const v = parseInt(value || '0', 10);
        const newMask = props.value + (checked ? v : -v);
        props.onChange(newMask);
    }, [props]);

    const onChange = React.useCallback((ev: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(ev.currentTarget.value || '0', 10);
        props.onChange(value);
    }, [props]);

    return (
        <div className='min-w-[200px] p-4'>
           <div className='flex'>
                {!props.hideTitle && (
                    <div className='w-full'>
                        <span className='text-lg'> Proctype </span>
                    </div>
                )}
                {proctypes.map(x => (
                    <div key={x.id} className='w-1/2'>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={Boolean(props.value & x.id)}
                                    onChange={onCheckboxChange}
                                    value={x.id}
                                    color='primary'
                                    size='small'
                                    style={{ padding: 4 }}
                                />
                            }
                            label={<Typography children={x.name} style={{ fontSize: 12 }} />}
                        />
                    </div>
                ))}

                <div item key='select' xs={6}>
                    <NativeSelect
                        size='small'
                        value={props.value.toString()}
                        onChange={onChange}
                        variant='standard'
                        className={classes.select}
                    >
                        <option value={'0'}>Free</option>
                        <option value={'1'}>Revival Scroll</option>
                        <option value={'8'}>Fashion, Flyer</option>
                        <option value={'19'}>No drop, trade</option>
                        <option value={'64'}>Bind Equip</option>
                        <option value={'32791'}>Soulbound</option>
                    </NativeSelect>
                </div>
                <div item key='value' xs={6}>
                    <div container justifyContent='center'>
                        <div item>
                            <input
                                disabled
                                value={props.value}
                                className={classes.input}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export const ProctypeBuilderPopover = (props: ProctypeProps) => (
        <PopoverWrapper
            editable
            Cmp={ProctypeBuilder}
            {...props}
            boxStyle={{ width: 320 }}
            title='Proctype: '
            tooltip='Edit proctype'
        />
    );