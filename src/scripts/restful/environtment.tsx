import { isMoment } from 'moment';
import { RequestInfo, setupEnvironment, Store } from 'react-restful';
import { isDate } from 'util';

import { showError } from '@/effects';
import { getToken } from '@/utilities';

import { DefaultMeta } from './base';

const commonParser = (value) => {
    if (value && (value._id || value.id)) {
        return value._id || value.id;
    }

    if (isDate(value) || isMoment(value)) {
        return value.toISOString();
    }

    return value;
};

const environment = setupEnvironment({
    entry: API_ENTRY,
    store: new Store(),
    requestUrlParamParser: commonParser,
    requestBodyParser: (key, value) => commonParser(value),
    beforeFetch: (url: string, requestInit: RequestInit) => {
        const token = getToken();

        if (requestInit.headers instanceof Headers) {
            if (token) {
                requestInit.headers.append('Authorization', `Bearer ${token}`);
            }
        }

        return requestInit;
    },
    onRequestSuccess: async (requestInfo: RequestInfo<DefaultMeta>) => {
        const { meta } = requestInfo;

        if (meta && meta.message) {
            console.info(meta.message);
        }
    },
    onRequestFailed: async (requestInfo) => {
        const { response } = requestInfo;
        const clonedResponse = response.clone();

        if (clonedResponse.status === 401) {
            return;
        }

        const responseContentType = response.headers.get('Content-Type');

        if (!responseContentType) {
            showError(response.statusText);

            return;
        }

        const error = responseContentType!.startsWith('text/plain')
            ? await clonedResponse.text()
            : await clonedResponse.json();

        console.error(error);
        showError('Opp, you got an error. Open console to view details!');

        return error;
    }
});

export const request = environment.request;

export const restfulStore = environment.store;