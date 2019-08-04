import { getIn } from 'formik';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from 'reactstrap';

import { BusinessController } from '@/business';
import {
    deleteOrderDetail,
    getOrderDetailProductName,
    updateOrderDetailQuantity
} from '@/business/order-detail';
import { PRODUCT_URL } from '@/configs';
import { BaseComponent } from '@/domain';
import { Img } from '@/domain/components';
import { OrderDetail } from '@/restful';
import { getObjectId } from '@/restful/base';
import { formatCurrency, replaceRoutePath } from '@/utilities';

interface CartDetailTableItemProps {
    readonly orderDetail: OrderDetail;
}

interface CartDetailTableItemState {
    readonly quantity: number;
}

export class CartDetailTableItem extends BaseComponent<CartDetailTableItemProps, CartDetailTableItemState> {
    constructor(props: CartDetailTableItemProps) {
        super(props);
        this.state = {
            quantity: props.orderDetail.quantity
        };
    }

    private readonly onDeleteOrderDetail = (orderDetail: OrderDetail) => {
        const {
            cartOrderDetails,
            setContext
        } = this.context;

        setContext({
            cartOrderDetails: cartOrderDetails.filter(o => o.id !== orderDetail.id)
        });
    }

    private readonly onUpdateOrderDetail = (updatedOrderDetail: OrderDetail) => {
        const { cartOrderDetails, setContext } = this.context;
        const nextCartOrderDetails = cartOrderDetails.map(o => {
            if (o.id !== updatedOrderDetail.id) {
                return o;
            }

            return updatedOrderDetail;
        });

        setContext({
            cartOrderDetails: nextCartOrderDetails
        });
    }

    public render() {
        const { orderDetail } = this.props;

        return (
            <tr key={orderDetail.id}>
                <td>
                    <div className="img-container">
                        <Img file={orderDetail.previewImg} />
                    </div>
                </td>
                <td className="td-product">
                    <strong>{getOrderDetailProductName(orderDetail)}</strong>
                    <p>{getIn(orderDetail.productDesign, 'name')}</p>
                    <div>
                        <BusinessController
                            action={deleteOrderDetail}
                            onSuccess={this.onDeleteOrderDetail}
                        >
                            {({ doBusiness, loading }) => (
                                <Button
                                    color="danger"
                                    outline={true}
                                    className="btn-just-icon mr-2"
                                    onClick={() => doBusiness(orderDetail)}
                                    disabled={loading}
                                >
                                    <i className="fa fa-trash-o" />
                                </Button>
                            )}
                        </BusinessController>
                        <Button
                            color="info"
                            outline={true}
                            className="btn-just-icon"
                            tag={Link}
                            to={replaceRoutePath(PRODUCT_URL, { catalogId: getObjectId(orderDetail.catalog)})}
                        >
                            <i className="fa fa-info" />
                        </Button>
                    </div>
                </td>
                <td className="td-price">
                    <span>{formatCurrency(orderDetail.productPrice)}</span>
                </td>
                <td className="td-number td-quantity">
                    {this.state.quantity}
                    &nbsp;

                    <BusinessController
                        action={updateOrderDetailQuantity}
                        onSuccess={this.onUpdateOrderDetail}
                        deboucingTime={1000}
                    >
                        {({ doBusiness, loading }) => (
                            <ButtonGroup>
                                <Button
                                    className="btn-border btn-round"
                                    color="default"
                                    size="sm"
                                    disabled={loading}
                                    onClick={() => {
                                        const nextValue = this.state.quantity - 1;

                                        if (!nextValue || Number.isNaN(+nextValue!)) {
                                            return;
                                        }

                                        if (nextValue < 1) {
                                            return;
                                        }

                                        this.setState({
                                            quantity: nextValue
                                        });

                                        doBusiness({
                                            ...orderDetail,
                                            quantity: nextValue
                                        });
                                    }}
                                >
                                    -
                                </Button>
                                <Button
                                    className="btn-border btn-round"
                                    color="default"
                                    size="sm"
                                    disabled={loading}
                                    onClick={() => {
                                        const nextValue = this.state.quantity + 1;

                                        if (!nextValue || Number.isNaN(+nextValue!)) {
                                            return;
                                        }

                                        if (nextValue < 1) {
                                            return;
                                        }

                                        this.setState({
                                            quantity: nextValue
                                        });

                                        doBusiness({
                                            ...orderDetail,
                                            quantity: nextValue
                                        });
                                    }}
                                >
                                    +
                                </Button>
                            </ButtonGroup>
                        )}
                    </BusinessController>
                </td>
                <td className="td-number">
                    <span>{formatCurrency(orderDetail.subTotalPrice)}</span>
                </td>
            </tr>
        );
    }
}
