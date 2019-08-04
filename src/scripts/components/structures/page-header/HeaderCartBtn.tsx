import { RootContext } from 'qoobee';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import { getOrderDetailsQuantity } from '@/business/order-detail';
import { CART_URL } from '@/configs';
import { WithDomainContext } from '@/domain';

export const HeaderCartBtn = () => {
    return (
        <RootContext.Consumer>
            {({ cartOrderDetails }: WithDomainContext) => {
                return (
                    <Button
                        tag={Link}
                        to={CART_URL}
                        color="link"
                        className="btn-danger ml-0 mr-0 pl-0 pr-0 text-left"
                    >
                        Giỏ hàng ({getOrderDetailsQuantity(cartOrderDetails)})
                    </Button>
                );
            }}
        </RootContext.Consumer>
    );
};