import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Container } from 'reactstrap';

import { ORDER_DETAIL_URL } from '@/configs';
import { AppPageProps, BasePageComponent, policies } from '@/domain';

import { OrderDetailsFetcher, OrderFetcher } from './containers';

type RouteOrderDetailProps = AppPageProps<{ readonly orderId: string }>;

export class RouteOrderDetail extends BasePageComponent<RouteOrderDetailProps> {
    public static readonly routeInfo: RouteInfo = {
        path: ORDER_DETAIL_URL,
        title: 'Order',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public render() {
        const { orderId } = this.props.match.params;

        return (
            <Container>
                <OrderFetcher orderId={orderId} />
                <OrderDetailsFetcher orderId={orderId} />
            </Container>
        );
    }
}