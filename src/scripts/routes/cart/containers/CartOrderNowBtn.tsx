import * as React from 'react';
import { Button } from 'reactstrap';

import { BusinessController } from '@/business';
import { upsertOrder } from '@/business/order';
import { ORDER_DETAIL_URL } from '@/configs';
import { BaseComponent } from '@/domain';
import { Order } from '@/restful';
import { replaceRoutePath } from '@/utilities';

interface CartOrderNowBtnProps {
}

export class CartOrderNowBtn extends BaseComponent<CartOrderNowBtnProps> {
    public render() {
        const { cartOrderDetails, history, setContext } = this.context;

        return (
            <BusinessController
                action={upsertOrder}
                params={{
                    orderDetails: cartOrderDetails
                }}
                onSuccess={(newOrder: Order) => {
                    history.push(
                        replaceRoutePath(ORDER_DETAIL_URL, { orderId: newOrder.id })
                    );
                    
                    setContext({
                        cartOrderDetails: []
                    });
                }}
            >
                {({ doBusiness }) => {
                    const onClick = () => {
                        setContext({
                            globalModal: {
                                onOk: () => doBusiness(),
                                size: 'sm',
                                okLabel: 'OK',
                                children: <p className="h5 text-center mt-4">Xác nhận đặt hàng?</p>
                            },
                            globalModalVisibled: true
                        });
                    };

                    return (
                        <Button
                            onClick={onClick}
                            color="danger"
                            className="btn-round"
                            disabled={!cartOrderDetails.length}
                        >
                            Đặt hàng ngay <i className="fa fa-chevron-right" />
                        </Button>
                    );
                }}
            </BusinessController>
        );
    }
}
