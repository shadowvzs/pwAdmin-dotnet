import React from 'react';

import { IconButton } from '@pwserver/features/item-builder/sub/icons/';
import type { OctetChunk } from '@pwserver/types/builder';

interface OctetPreviewProps {
    octets: OctetChunk[];
}

const OctetPreview = ({ octets }: OctetPreviewProps) => {
    const inputRef = React.useRef<HTMLInputElement>();

    const onCopyToClipboard = React.useCallback(() => {
        const i = inputRef.current;
        if (!i) { return null; }
        i.value = octets.map(x => x.value).join('');
        i.select();
        i.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(i.value);
        alert('Octet was copied to clipboard!');
    }, [inputRef, octets]);

    return (
        <div className='mt-4 text-xs'>
            <div className='flex gap-2 whitespace-nowrap'>
                Final Octet:
                <input
                    className='hidden'
                    type='text'
                    ref={e => { inputRef.current = e!; }}
                />
            </div>
            <div
                className='flex flex-wrap mt-2 gap-1'
            >
                {octets.map((x, idx) => (
                    <span
                        key={idx}
                        title={x.label}
                        children={x.value}
                        className='hover:text-blue-400 hover:text-bold transition-all'
                    />
                ))}
                <IconButton
                    icon='copy'
                    title='Copy'
                    size={18}
                    onClick={onCopyToClipboard}
                />
            </div>
        </div>
    );
};

export default OctetPreview;