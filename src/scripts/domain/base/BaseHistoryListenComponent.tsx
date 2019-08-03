// tslint:disable:no-any

import { Location, UnregisterCallback } from 'history';
import { RequestParameter, upsertRequestParams } from 'react-restful';

import { getSearchParamsObj } from '@/utilities';

import { BaseComponent } from './BaseComponent';

interface BaseHistoryListenComponentState {
    readonly params: RequestParameter[];
    readonly defaultParams?: {};
    readonly url?: string;
}

export class BaseHistoryListenComponent<P = {}, S = {}> extends BaseComponent<P, S & BaseHistoryListenComponentState> {
    public _isUnmouting = false;
    public _unregisterListen: UnregisterCallback;

    private readonly upsertParams = (obj: {}) => {
        const { params } = this.state;

        let nextParams = [...params];

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const val = obj[key];

                nextParams = upsertRequestParams(nextParams, 'query', key, val);
            }
        }

        return nextParams;
    }

    private readonly tryUpdateParams = (e?: Location) => {
        const { defaultParams, url } = this.state;

        const nextUrl = e
            ? e.pathname + e.search
            : location.pathname + location.search;
        
        if (nextUrl === url) {
            return;
        }

        if (this._isUnmouting) {
            return;
        }

        const urlSearchObj = {
            ...defaultParams,
            ...getSearchParamsObj()
        };

        const nextParams = this.upsertParams(urlSearchObj);

        this.setState({
            params: nextParams as any,
            url: nextUrl as any
        });
    }

    public componentWillMount() {
        const { history } = this.context;
        const { defaultParams } = this.state;

        if (defaultParams) {
            this.tryUpdateParams();
        }

        this._unregisterListen = history.listen(this.tryUpdateParams);
    }

    public componentWillUnmount() {
        this._isUnmouting = true;
        this._unregisterListen();
    }
}
