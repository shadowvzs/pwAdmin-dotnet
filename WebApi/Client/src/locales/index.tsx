import { i18n } from '@lingui/core';
import { Trans } from '@lingui/react';

/* eslint-disable */
// import { messages as enUS } from './en-US.mjs';
// import { messages as deDE } from './de-DE.mjs';

const enUS = {};
const deDE = {};

/* eslint-enable */
export const catalog = {
    enUS: enUS as Record<string, string>,
    deDE: deDE as Record<string, string>,
};

export const t = (id: string, values?: Record<string, string>) => i18n._(id, values);

interface TrProps extends Record<string, string | undefined> {
    children?: string;
    id?: string;
}

export const Tr = ({ children, id, ...values }: TrProps): JSX.Element => {
    if (!children && !id) {
        // eslint-disable-next-line no-param-reassign
        id = '';
        console.error('Must have id or children', children, id, values);
    }
    return <Trans id={id ?? children ?? ''} values={values} />;
};
