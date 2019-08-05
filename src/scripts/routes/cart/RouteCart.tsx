import { RootContext, RouteInfo } from 'qoobee';
import * as React from 'react';
import { Container } from 'reactstrap';

import { CART_URL } from '@/configs';
import {
    AppPageProps,
    BasePageComponent,
    policies,
    WithDomainContext
} from '@/domain';

import { CartOrderDetailTable, CartOrderNowBtn } from './containers';

export class RouteCart extends BasePageComponent<AppPageProps> {
    public static readonly routeInfo: RouteInfo = {
        path: CART_URL,
        title: 'Giỏ hàng',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public render() {
        return (
            <Container>
                <h4 className="h4 mb-4">Giỏ hàng của bạn</h4>
                <div className="mb-4">
                    <CartOrderNowBtn />
                </div>
                <RootContext.Consumer>
                    {({ cartOrderDetails }: WithDomainContext) => {
                        return (
                            <CartOrderDetailTable cartOrderDetails={cartOrderDetails} />
                        );
                    }}
                </RootContext.Consumer>
            </Container>
        );
    }
}