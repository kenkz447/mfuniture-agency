import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Container } from 'reactstrap';

import { PRODUCT_URL } from '@/configs';
import { AppPageProps, BasePageComponent, policies } from '@/domain';

import { CatalogFetcher } from './containers';

type RouteCatalogDetailsProps = AppPageProps<{ readonly catalogId: string }>;

export class RouteCatalogDetails extends BasePageComponent<RouteCatalogDetailsProps> {
    public static readonly routeInfo: RouteInfo = {
        path: PRODUCT_URL,
        title: 'B+ Furniture',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public render() {
        const { match } = this.props;

        return (
            <Container>
                <CatalogFetcher catalogId={match.params.catalogId} />
            </Container>
        );
    }
}