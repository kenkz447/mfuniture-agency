import { RequestParameter } from 'react-restful';

export interface FetchEventArgs {
    readonly url: string;
    readonly method?: string;
}

export interface DefaultMeta {
    readonly message?: string;
}

export const getDefaultParamsForUpdate = (params: RequestParameter[]): RequestParameter | never => {
    const requestBody = params.find(o => o.type === 'body')!;
    if (!requestBody) {
        throw new Error('Missing body params!');
    }

    const bodyValue = requestBody.value as {
        readonly id: number,
        readonly _id?: number;
    };
    if (!requestBody) {
        throw new Error('Missing body value!');
    }

    return {
        type: 'path',
        parameter: 'id',
        value: bodyValue.id || bodyValue._id!
    };
};

export const getDefaultParams = (): RequestParameter => ({
    type: 'query',
    parameter: '_sort',
    value: '_id:DESC'
});

interface IsRecordEqualRecord {
    readonly id: string;
}

export const isRecordEqual = (
    item1: IsRecordEqualRecord | string,
    item2: IsRecordEqualRecord | string
) => {
    if (!item1 || !item2) {
        return false;
    }

    if (
        typeof item2 === 'string' &&
        typeof item1 === 'string'
    ) {
        return item1 === item2;
    }

    if (
        typeof item2 === 'string' &&
        typeof item1 !== 'string'
    ) {
        return item1.id === item2;
    }

    if (
        typeof item2 !== 'string' &&
        typeof item1 === 'string'
    ) {
        return item1 === item2.id;
    }

    if (
        typeof item2 !== 'string' &&
        typeof item1 !== 'string'
    ) {
        return item1.id === item2.id;
    }

    return false;
};