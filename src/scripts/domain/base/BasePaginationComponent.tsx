import {
    getParamsValue,
    RequestParameter,
    Resource,
    upsertRequestParams
} from 'react-restful';

import { request } from '@/restful';
import { getUrlSearchParam } from '@/utilities';

import { BaseComponent } from './BaseComponent';

interface BasePaginationComponentState {
    readonly requestParams: RequestParameter[];
    readonly countItemResource: Resource<number>;
    readonly totalItem?: number;
}

export class BasePaginationComponent<P = {}, S = {}> extends BaseComponent<P, S & BasePaginationComponentState> {

    private readonly _unmounting = false;

    public readonly getDefaultRequestParams = (): RequestParameter[] => {
        return [{
            type: 'query',
            parameter: '_start',
            value: +(getUrlSearchParam('_start') || 0)
        }, {
            type: 'query',
            parameter: '_limit',
            value: +(getUrlSearchParam('_limit') || 10)
        }];
    }

    public readonly getPaginationMeta = (meta: '_start' | '_limit') => {
        return getParamsValue(this.state.requestParams, 'query', meta) as number;
    }

    public readonly getPagerUrl = (pageIndex: number) => {
        const url = new URL(location.href);

        const limit = this.getPaginationMeta('_limit') || 0;

        url.searchParams.set('_start', String(limit * pageIndex));

        return `${url.pathname}${url.search}`;
    }

    public componentDidMount() {
        request(this.state.countItemResource, this.state.requestParams).then(
            (totalItem) => {
                // tslint:disable-next-line:no-any
                this.setState({ totalItem: totalItem as any });
            }
        );

        this.context.history.listen((e) => {
            if (this._unmounting) {
                return;
            }

            const { requestParams } = this.state;

            let nextRequestParams = upsertRequestParams(
                requestParams, 'query', '_start', getUrlSearchParam('_start') || 0
            );

            nextRequestParams = upsertRequestParams(
                nextRequestParams, 'query', '_limit', getUrlSearchParam('_limit') || 10
            );

            this.setState({
                // tslint:disable-next-line:no-any
                requestParams: nextRequestParams as any
            });
        });
    }
}