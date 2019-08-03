import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Loading } from '@/components';
import { BaseHistoryListenComponent } from '@/domain';
import { catalogResources } from '@/restful';

import { CatalogDetails } from './catalog-fetcher';

export interface CatalogFetcherProps {
    readonly catalogId: string;
}

export class CatalogFetcher extends BaseHistoryListenComponent<CatalogFetcherProps> {
    constructor(props: CatalogFetcherProps) {
        super(props);

        this.state = {
            params: [{
                type: 'path',
                parameter: 'id',
                value: props.catalogId
            }]
        };
    }

    public render() {
        const { params } = this.state;

        return (
            <RestfulRender
                resource={catalogResources.findOne}
                parameters={params}
            >
                {(render) => {
                    const { data, fetching } = render;
                    if (!data && fetching) {
                        return <Loading />;
                    }

                    return (
                        <CatalogDetails catalog={data!}/>
                    );
                }}
            </RestfulRender>
        );
    }
}
