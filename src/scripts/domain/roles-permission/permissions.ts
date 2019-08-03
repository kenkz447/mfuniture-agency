import { Permission } from 'qoobee';

export const permissions: { readonly [key: string]: Permission } = {
    ALL: {
        key: 'ALL',
        url: /\/*/i
    }
};