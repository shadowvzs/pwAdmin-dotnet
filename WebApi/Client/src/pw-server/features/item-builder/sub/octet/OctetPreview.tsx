import React from 'react';
import { observer } from 'mobx-react-lite';
import ItemBuilderStore from '../../ItemBuilderStore';

interface OctetPreviewProps {
    store: ItemBuilderStore;
}

const OctetPreview = observer((props: OctetPreviewProps) => {

    const {store} = props;
    const inputRef = React.useRef<HTMLInputElement>();
    const { enqueueSnackbar } = useSnackbar();

    const onCopyToClipboard = React.useCallback(() => {
        const i = inputRef.current!;
        i.select();
        i.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(i.value);
        enqueueSnackbar('Octet was copied to clipboard!', { variant: 'success' });
    }, [inputRef, enqueueSnackbar]);

    return (
        <Grid container style={{ marginTop: 16 }}>
            <Grid item xs={12}>
                <Typography
                    variant='body2'
                    children='Final Octet:'
                />
            </Grid>
            <Grid item xs={12}>
                <Input
                    fullWidth
                    type={'text'}
                    value={store.item.data}
                    inputProps={{ ref: inputRef }}
                    style={{ marginTop: 6, fontSize: 12 }}
                    endAdornment={(
                        <InputAdornment position="end">
                            <IconButton
                                onClick={onCopyToClipboard}
                                edge='end'
                                children={<ContentCopyIcon style={{ fontSize: 18 }} />}
                                size='small'
                                title='Copy octet to clipboard'
                            />
                        </InputAdornment>
                    )}
                />
            </Grid>
            <Grid
                item
                style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap' }}
                xs={12}
            >
                {store.finalOctetData.map((x, idx) => (
                    <span
                        key={idx}
                        className={classes.octetChunk}
                        title={x.label}
                        children={x.value}
                    />
                ))}
            </Grid>
        </Grid>
    );
});

export default OctetPreview;