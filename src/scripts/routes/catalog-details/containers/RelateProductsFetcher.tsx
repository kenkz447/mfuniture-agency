import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Loading } from '@/components';
import { BaseHistoryListenComponent } from '@/domain';
import { catalogResources } from '@/restful';
import { CatalogList } from '@/routes/catalogs/containers/catalogs-fetcher';

export interface RelatedProductsFetcherProps {
    readonly catalogId: string;
}

export class RelatedProductsFetcher extends BaseHistoryListenComponent<RelatedProductsFetcherProps> {
    constructor(props: RelatedProductsFetcherProps) {
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
                resource={catalogResources.findRelated}
                parameters={params}
            >
                {(render) => {
                    const { data, fetching } = render;
                    if (!data && fetching) {
                        return <Loading />;
                    }

                    return (
                        <CatalogList catalogs={data!} />
                    );
                }}
            </RestfulRender>
        );
    }
}
