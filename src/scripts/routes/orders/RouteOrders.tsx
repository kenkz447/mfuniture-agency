import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Container } from 'reactstrap';

import { ORDERS_URL } from '@/configs';
import { AppPageProps, BasePageComponent, policies } from '@/domain';

import { OrdersFetcher } from './containers';

export class RouteOrders extends BasePageComponent<AppPageProps> {
    public static readonly routeInfo: RouteInfo = {
        path: ORDERS_URL,
        title: 'Đơn hàng',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public render() {
        return (
            <Container>
                <h1 className="h3 mb-4">Đơn hàng</h1>
                <OrdersFetcher />
            </Container>
        );
    }
}