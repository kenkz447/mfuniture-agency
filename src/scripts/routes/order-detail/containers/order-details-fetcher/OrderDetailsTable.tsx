import { getIn } from 'formik';
import * as React from 'react';
import { Table } from 'reactstrap';

import { getOrderDetailProductName } from '@/business/order-detail';
import { Img } from '@/domain/components';
import { OrderDetail } from '@/restful';
import { formatCurrency } from '@/utilities';

interface OrderDetailsTableProps {
    readonly orderDetails: OrderDetail[];
}

export class OrderDetailsTable extends React.PureComponent<OrderDetailsTableProps> {
    public render() {
        const { orderDetails } = this.props;

        return (
            <Table className="table-shopping" responsive={true}>
                <thead>
                    <tr>
                        <th className="text-center border-top-0" />
                        <th className="text-center border-top-0" />
                        <th className="text-right border-top-0">Đơn giá</th>
                        <th className="text-right border-top-0">Số lượng</th>
                        <th className="text-right border-top-0">Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.map(orderDetail => {
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
                                    </td>
                                    <td className="td-price">
                                        <span>{formatCurrency(orderDetail.productPrice)}</span>
                                    </td>
                                    <td className="td-price">
                                        {orderDetail.quantity}
                                    </td>
                                    <td className="td-price">
                                        <span>{formatCurrency(orderDetail.subTotalPrice)}</span>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        );
    }
}
