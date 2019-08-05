import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Container } from 'reactstrap';

import { PRODUCT_URL } from '@/configs';
import { AppPageProps, BasePageComponent, policies } from '@/domain';

import { CatalogFetcher, RelatedProductsFetcher } from './containers';

type RouteCatalogDetailsProps = AppPageProps<{ readonly catalogId: string }>;

export class RouteCatalogDetails extends BasePageComponent<RouteCatalogDetailsProps> {
    public static readonly routeInfo: RouteInfo = {
        path: PRODUCT_URL,
        title: 'Xem sản phẩm',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public render() {
        const { match } = this.props;

        return (
            <Container>
                <div className="mb-5">
                    <CatalogFetcher catalogId={match.params.catalogId} />
                </div>
                <div>
                    <h5 className="mb-4">Sản phẩm liên quan</h5>
                    <RelatedProductsFetcher catalogId={match.params.catalogId} />
                </div>
            </Container>
        );
    }
}