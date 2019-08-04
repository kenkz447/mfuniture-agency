import { getIn } from 'formik';
import * as React from 'react';
import { Table } from 'reactstrap';

import { getOrderDetailProductName } from '@/business/order-detail';
import { Img } from '@/domain/components';
import { Order } from '@/restful';
import { formatCurrency, formatDate } from '@/utilities';

interface OrderDetailsProps {
    readonly order: Order;
}

export class OrderDetails extends React.PureComponent<OrderDetailsProps> {
    public render() {
        const { order } = this.props;

        return (
            <div>
                <h1 className="h3 mb-4">Đơn hàng  <strong>#{order.code}</strong></h1>
                <p>Ngày tạo: {formatDate(order.createdAt)}</p>
                <p>Tổng tiền: {formatCurrency(order.totalOfPayment)}</p>
            </div>
        );
    }
}
