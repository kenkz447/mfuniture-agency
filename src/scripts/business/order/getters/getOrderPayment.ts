import { getOrderDetailsSubTotal } from '@/business/order-detail';
import { Order } from '@/restful';

import { getOrderDiscount } from './getOrderDiscount';
import { getOrderTransportFee } from './getOrderTransportFee';

export const getOrderTotalPayment = (order: Partial<Order>) => {
    if (!order) {
        return null;
    }

    const discounts = getOrderDiscount(order);
    const transportFee = getOrderTransportFee(order);
    const subTotal = getOrderDetailsSubTotal(order.orderDetails);

    return {
        discounts: discounts,
        transportFee: transportFee,
        subTotal: subTotal,
        totalPayment: subTotal - discounts.total + (transportFee ? transportFee.total : 0)
    };
};