import * as React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

import { getOrderStatusLabel } from '@/business/order';
import { ORDER_DETAIL_URL } from '@/configs';
import { Order } from '@/restful';
import { formatCurrency, formatDate, replaceRoutePath } from '@/utilities';

interface OrderTableProps {
    readonly orders: Order[];
}

export class OrderTable extends React.PureComponent<OrderTableProps> {
    public render() {
        const { orders } = this.props;

        return (
            <Table>
                <thead>
                    <tr>
                        <th className="border-top-0">#</th>
                        <th className="border-top-0">Mã đơn</th>
                        <th className="border-top-0 text-right">Ngày tạo</th>
                        <th className="border-top-0 text-right">Tình trạng</th>
                        <th className="border-top-0 text-right">
                            <span>Tổng tiền</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, index) => {
                            return (
                                <tr key={order.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Link to={replaceRoutePath(ORDER_DETAIL_URL, { orderId: order.id })}>
                                            {order.code}
                                        </Link>
                                    </td>
                                    <td className="text-right">{formatDate(order.createdAt)}</td>
                                    <td className="text-right">{getOrderStatusLabel(order)}</td>
                                    <td className="text-right">
                                        {formatCurrency(order.totalOfPayment)}
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
