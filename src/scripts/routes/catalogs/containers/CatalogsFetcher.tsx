import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Loading } from '@/components';
import { BaseHistoryListenComponent } from '@/domain';
import { catalogResources, ProductTypeGroup } from '@/restful';
import { getUrlSearchParam } from '@/utilities';

import { CatalogList } from './catalogs-fetcher';

interface CatalogsFetcherProps {
    readonly productTypeGroup: ProductTypeGroup;
}

export class CatalogsFetcher extends BaseHistoryListenComponent<CatalogsFetcherProps> {
    constructor(props: CatalogsFetcherProps) {
        super(props);
        
        const { productTypeGroup } = props;
        const productType = getUrlSearchParam('productType');

        this.state = {
            params: [{
                type: 'path',
                parameter: 'productTypeGroup',
                value: productTypeGroup.id
            }],
            defaultParams: {
                productType: productType || productTypeGroup.productTypes[0].id
            }
        };
    }

    public render() {
        const { params } = this.state;

        return (
            <RestfulRender
                resource={catalogResources.find}
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
