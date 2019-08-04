import * as React from 'react';
import { Button, Table } from 'reactstrap';

import { getOrderDetailsSubTotal } from '@/business/order-detail';
import { BaseComponent } from '@/domain';
import { OrderDetail } from '@/restful';
import { formatCurrency } from '@/utilities';

import { CartDetailTableItem } from './cart-detail-table';

interface CartOrderDetailTableProps {
    readonly cartOrderDetails: OrderDetail[];
}

export class CartOrderDetailTable extends BaseComponent<CartOrderDetailTableProps> {
    public render() {
        const { cartOrderDetails } = this.props;
        if (!cartOrderDetails.length) {
            return <p>Hiện tại không có sản phẩm nào trong giỏ hàng.</p>;
        }

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
                        cartOrderDetails.map(orderDetail => {
                            return (
                                <CartDetailTableItem
                                    key={orderDetail.id}
                                    orderDetail={orderDetail}
                                />
                            );
                        })
                    }
                    <tr>
                        <td className="td-number" colSpan={4}>Tổng cộng</td>
                        <td className="td-number">
                            {formatCurrency(
                                getOrderDetailsSubTotal(cartOrderDetails)
                            )}
                        </td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}