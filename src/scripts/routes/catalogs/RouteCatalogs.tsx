import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Container } from 'reactstrap';

import { CALALOG_URL } from '@/configs';
import { AppPageProps, BasePageComponent, policies } from '@/domain';

import { CatalogsFetcher, ProductTypeList } from './containers';

type RouteCatalogsProps = AppPageProps<{ readonly productTypeGroupId: string }>;

export class RouteCatalogs extends BasePageComponent<RouteCatalogsProps> {
    public static readonly routeInfo: RouteInfo = {
        path: CALALOG_URL,
        title: 'Catalog',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public render() {
        const { allProductTypeGroup } = this.context;
        const { productTypeGroupId } = this.props.match.params;
        const productTypeGroup = allProductTypeGroup.find(o => o.id === productTypeGroupId);

        if (!productTypeGroup) {
            return null;
        }

        return (
            <Container>
                <h1 className="h3 mb-3">{productTypeGroup.name}</h1>
                <div className="mb-4">
                    <ProductTypeList productTypeGroup={productTypeGroup} />
                </div>
                <CatalogsFetcher productTypeGroup={productTypeGroup} />
            </Container>
        );
    }
}